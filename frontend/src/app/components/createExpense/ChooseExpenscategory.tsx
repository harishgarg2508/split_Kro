import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { UseFormRegister, FieldError } from "react-hook-form";



type ExpenseFormType = {
  amount: number;
  description: string;
  createdBy: number;
  groupId: number;
  categoryId: number;
  
};

type ChooseCategoryProps = {
  register: UseFormRegister< ExpenseFormType>;
  error?: FieldError;
};


const categories = [
  { value: 1, label: "Party" },
  { value: 2, label: "Birthday" },
  { value: 3, label: "Travel" },
  { value: 4, label: "Food" },
];

const ChooseExpenseCategory: React.FC<ChooseCategoryProps> = ({ register, error }) => {
  return (
    <TextField
      select
      label="Category"
      fullWidth
      margin="dense"
      variant="standard"
      defaultValue=""
      {...register("categoryId")}
      error={!!error}
      helperText={error ? error.message : "Please select group category"}
      required
    >
      {categories.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default ChooseExpenseCategory