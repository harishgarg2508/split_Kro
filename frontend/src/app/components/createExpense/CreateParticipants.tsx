'use client';
import React, { useEffect, useState, useCallback } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getAllUsers } from "@/app/redux/slices/getAllusers.slice";
import {
  useWatch,
  useFormContext,
} from "react-hook-form";

interface Props {
  name: string;
  control: any;
  error?: string;
}

const CreateParticipants: React.FC<Props> = ({ name, control, error }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.getAllMembers.groupmembers);

  const { setValue, register, watch } = useFormContext();
  const selectedUserId = useWatch({ control, name: "createdBy" });
  const selectedAmount = useWatch({ control, name: "amount" });

  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [splitType, setSplitType] = useState<"equal" | "unequal">("equal");

  const participantsPaid = watch(name) || [];

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Memoize the calculation to prevent unnecessary re-renders
  const calculateEqualSplit = useCallback(() => {
    if (selectedParticipants.length === 0 || !selectedAmount) {
      return [];
    }

    const owedPerPerson = Number((selectedAmount / selectedParticipants.length).toFixed(2));

    return selectedParticipants.map((id) => ({
      userId: id,
      paid: id === selectedUserId ? Number(selectedAmount) : 0,
      owed: owedPerPerson,
    }));
  }, [selectedParticipants, selectedAmount, selectedUserId]);

  useEffect(() => {
    if (splitType === "equal") {
      const participantData = calculateEqualSplit();
      setValue(name, participantData);
    }
  }, [splitType, calculateEqualSplit, name, setValue]);

  useEffect(() => {
    if (splitType === "unequal" && selectedParticipants.length > 0 && selectedAmount) {
      const equalShare = Number((selectedAmount / selectedParticipants.length).toFixed(2));

      const participantData = selectedParticipants.map((id) => {
        const currentParticipant = participantsPaid.find((p: any) => p?.userId === id);
        const paidAmount = Number(currentParticipant?.paid || 0);
        const owedAmount = Math.max(0, Number((equalShare - paidAmount).toFixed(2)));
        
        return {
          userId: id,
          paid: paidAmount,
          owed: owedAmount,
        };
      });

      const currentData = watch(name) || [];
      const hasChanged = JSON.stringify(currentData) !== JSON.stringify(participantData);
      
      if (hasChanged) {
        setValue(name, participantData);
      }
    }
  }, [selectedParticipants, selectedAmount, splitType, participantsPaid, name, setValue, watch]);

  const handleToggle = (userId: number) => {
    setSelectedParticipants((prev) => {
      const newSelection = prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];

      if (splitType === "unequal") {
        setValue(name, []);
      }

      return newSelection;
    });
  };

  const handleSplitTypeChange = (newSplitType: "equal" | "unequal") => {
    setSplitType(newSplitType);
    setValue(name, []);
  };

  const handlePaidAmountChange = (participantIndex: number, paidValue: string) => {
    const paidAmount = Number(parseFloat(paidValue || "0").toFixed(2));
    const equalShare = Number((selectedAmount / selectedParticipants.length).toFixed(2));
    const owedAmount = Math.max(0, Number((equalShare - paidAmount).toFixed(2)));
    
    // Update the specific participant's paid and owed values
    const currentData = watch(name) || [];
    const updatedData = [...currentData];
    
    if (updatedData[participantIndex]) {
      updatedData[participantIndex] = {
        ...updatedData[participantIndex],
        paid: paidAmount,
        owed: owedAmount,
      };
      
      setValue(name, updatedData);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <FormLabel component="legend">Select Participants</FormLabel>

      <RadioGroup
        row
        value={splitType}
        onChange={(e) => handleSplitTypeChange(e.target.value as "equal" | "unequal")}
        style={{ marginBottom: 8 }}
      >
        <FormControlLabel value="equal" control={<Radio />} label="Split Equally" />
        <FormControlLabel value="unequal" control={<Radio />} label="Split Unequally" />
      </RadioGroup>

      <FormGroup>
        {users.map((user) => {
          const isSelected = selectedParticipants.includes(user.id);
          const participantIndex = selectedParticipants.indexOf(user.id);
          const participantData = participantsPaid.find((p: any) => p?.userId === user.id);

          return (
            <div key={user.id} style={{ marginBottom: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleToggle(user.id)}
                  />
                }
                label={user?.user?.name  || `User ${user.id}`}
              />

              {isSelected && splitType === "unequal" && participantIndex >= 0 && (
                <div style={{ display: 'flex', gap: '12px', marginLeft: 32, marginTop: 4 }}>
                  <TextField
                    label="Paid"
                    type="number"
                    size="small"
                    placeholder="0"
                    inputProps={{ step: "0.01" }}
                    {...register(`${name}.${participantIndex}.paid`, { 
                      valueAsNumber: true,
                      setValueAs: (value) => Number(parseFloat(value || 0).toFixed(2))
                    })}
                    onChange={(e) => handlePaidAmountChange(participantIndex, e.target.value)}
                  />
                  <TextField
                    label="Still Owes"
                    type="number"
                    size="small"
                    value={participantData?.owed || 0}
                    disabled
                    inputProps={{ step: "0.01" }}
                  />
                <TextField
                  type="hidden"
                  value={user.id}
                  {...register(`${name}.${participantIndex}.userId`, {
                    valueAsNumber: true
                  })}
                    />
                </div>
              )}
            </div>
          );
        })}
      </FormGroup>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
};

export default CreateParticipants;