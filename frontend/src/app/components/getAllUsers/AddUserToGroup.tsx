'use client'
import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { getAllUsers } from '@/app/redux/slices/getAllusers.slice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { addUserToGroup, removeUserToGroup } from './AddUserToGroupThunk';
import { toast, Toaster } from 'sonner';

interface User {
  id: string | number;
  name: string;
  avatar?: string;
}

const GetAllUsers: React.FC = () => {
  const users = useAppSelector((state) => state.getAllUsers.users as User[]);
  const groupId = useAppSelector((state) => state.listAllGroups.selectedGroupId);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dispatch = useAppDispatch();
  const [timer, setTimer] = React.useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (timer) {
      clearTimeout(timer);
    }
    const timerId = window.setTimeout(() => {
      dispatch(getAllUsers(searchValue));
    }, 300);
    setTimer(timerId);
  };

  const handleClickOpen = () => {
    if (!groupId) {
      toast.error("Please select a group first!");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToGroup = (id: number) => {
    if (!groupId) {
      toast.error("No group selected!");
      return;
    }
    dispatch(addUserToGroup({ userId: id, groupId }));
    toast.success("User added to group successfully!");
    setOpen(false);
  };

  
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>+ Add User</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search for user
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="search"
            label="Search"
            type="text"
            fullWidth
            variant="standard"
            value={search}
            onChange={handleSearch}
          />
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflowX: 'auto' }}>
            {users.map((user) => (
              <Button key={user.id} onClick={() => handleAddToGroup(Number(user.id))} fullWidth sx={{ justifyContent: "flex-start", mb: 1 }}>
                <ListItemAvatar>
                  <Avatar src={user.avatar as string | undefined}>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </Button>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default GetAllUsers;

