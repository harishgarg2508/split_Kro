'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChooseCategory, { GroupFormFields } from './ChooseCategory';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema } from '../../utils';

import { useAppDispatch } from '@/app/redux/hooks';
import { createGroup } from './createGroupThunk';

export default function CreateGroupButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      groupName: "",
      categoryId: ""
    }
  });

  const submitData = (data:any) => {
    console.log(data);
    dispatch(createGroup(data));
    handleClose();
    reset();
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        + Create Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Enter group Name
          </DialogContentText>
          <form onSubmit={handleSubmit(submitData)} noValidate>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Group Name"
              fullWidth
              variant="standard"
              {...register("groupName")}
              error={!!errors.groupName}
              helperText={errors.groupName?.message}
            />
            <ChooseCategory register={register} error={errors.categoryId} />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant='contained' type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
