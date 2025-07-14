import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { UseFormRegister, FieldError } from "react-hook-form";
import { getAllUsers } from '@/app/redux/slices/getAllusers.slice';

interface SelectUserProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

const SelectUser: React.FC<SelectUserProps> = ({ register, error }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.getAllUsers.users);

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <TextField
      select
      label="Created By"
      fullWidth
      margin="dense"
      variant="standard"
      defaultValue=""
      {...register("createdBy", { valueAsNumber: true })}
      error={!!error}
      helperText={error ? error.message : "Please select a user"}
      required
    >
      {users.map((user: { id: number; name: string }) => (
        <MenuItem key={user.id} value={user.id}>
          {user.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectUser;
