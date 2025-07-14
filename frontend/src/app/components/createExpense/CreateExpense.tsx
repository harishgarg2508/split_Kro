'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { expenseSchema } from '@/app/utils';
import { createExpense } from '@/app/redux/slices/createExpense.slice';
import { z } from 'zod';

import SelectUser from './SelectUser';
import ChooseExpenseCategory from './ChooseExpenscategory';
import CreateParticipants from './CreateParticipants';

type ExpenseFormType = z.infer<typeof expenseSchema>;

export default function CreateExpenseButton() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const groupId = useAppSelector((state) => state.listAllGroups.selectedGroupId);

  const methods = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: 0,
      description: "",
      createdBy: undefined,
      groupId: undefined,
      categoryId: undefined,
      participants: [],
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = methods;

  React.useEffect(() => {
    if (groupId) setValue('groupId', groupId);
  }, [groupId, setValue]);

  const submitData: SubmitHandler<ExpenseFormType> = (data) => {
    if (!groupId) {
      alert("Please select a group first!");
      return;
    }

    // ✅ Ensure participants is always an array
    dispatch(createExpense({ 
      ...data, 
      groupId,
      participants: data.participants || [] 
    }));
    handleClose();
    reset();
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} disabled={!groupId}>
        + Create Expense
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Expense</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>Enter expense details</DialogContentText>

          {/* ✅ Wrap once around the whole form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitData)} noValidate>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                label="Description"
                fullWidth
                variant="standard"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <TextField
                required
                margin="dense"
                id="amount"
                label="Amount"
                fullWidth
                variant="standard"
                type="number"
                {...register("amount", { valueAsNumber: true })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
              <SelectUser register={register} error={errors.createdBy} />
              <ChooseExpenseCategory register={register} error={errors.categoryId} />
              <CreateParticipants
                name="participants"
                control={control}
                error={errors.participants?.message}
               
              />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}