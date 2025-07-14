'use client';
import React, { useEffect, useState } from "react";
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
  Controller,
} from "react-hook-form";

interface Props {
  name: string;
  control: any;
  error?: string;
}

const CreateParticipants: React.FC<Props> = ({ name, control, error }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.getAllMembers.groupmembers);

  const { setValue, register } = useFormContext();
  const selectedUserId = useWatch({ control, name: "createdBy" });
  const selectedAmount = useWatch({ control, name: "amount" });

  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [splitType, setSplitType] = useState<"equal" | "unequal">("equal");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (splitType === "equal") {
      if (selectedParticipants.length === 0 || !selectedAmount) {
        setValue(name, []);
        return;
      }

      const owedPerPerson = selectedAmount / selectedParticipants.length;

      const participantData = selectedParticipants.map((id) => ({
        userId: id,
        paid: id === selectedUserId ? selectedAmount : 0,
        owed: owedPerPerson,
      }));

      setValue(name, participantData);
    }
  }, [selectedParticipants, selectedAmount, selectedUserId, name, setValue, splitType]);

  const handleToggle = (userId: number) => {
    setSelectedParticipants((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div style={{ marginTop: 16 }}>
      <FormLabel component="legend">Select Participants</FormLabel>

      <RadioGroup
        row
        value={splitType}
        onChange={(e) => setSplitType(e.target.value as "equal" | "unequal")}
        style={{ marginBottom: 8 }}
      >
        <FormControlLabel value="equal" control={<Radio />} label="Split Equally" />
        <FormControlLabel value="unequal" control={<Radio />} label="Split Unequally" />
      </RadioGroup>

      <FormGroup>
        {users.map((user) => {
          const isSelected = selectedParticipants.includes(user.id);
          const index = selectedParticipants.indexOf(user.id);

          return (
            <div key={user.id} style={{ marginBottom: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleToggle(user.id)}
                  />
                }
                label={user.user.name}
              />

              {isSelected && splitType === "unequal" && (
                <div style={{ display: 'flex', gap: '12px', marginLeft: 32, marginTop: 4 }}>
                  <TextField
                    label="Paid"
                    type="number"
                    size="small"
                    {...register(`${name}.${index}.paid`, { valueAsNumber: true })}
                  />
                  <TextField
                    label="Owed"
                    type="number"
                    size="small"
                    {...register(`${name}.${index}.owed`, { valueAsNumber: true })}
                  />
                  {/* hidden userId input */}
                  <input
                    type="hidden"
                    value={user.id}
                    {...register(`${name}.${index}.userId`)}
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
