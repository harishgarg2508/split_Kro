import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { UseFormRegister, FieldError } from "react-hook-form";

export type GroupFormFields = {
  groupName: string;
  categoryId: string;
};

type ChooseCategoryProps = {
  register: UseFormRegister<GroupFormFields>;
  error?: FieldError;
};


const categories = [
  { value: "1", label: "Party" },
  { value: "2", label: "Birthday" },
  { value: "3", label: "Travel" },
  { value: "4", label: "Food" },
];

const ChooseCategory: React.FC<ChooseCategoryProps> = ({ register, error }) => {
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

export default ChooseCategory