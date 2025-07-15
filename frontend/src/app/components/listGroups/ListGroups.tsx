'use client';
import * as React from 'react';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect } from 'react';
import { GroupInterface, listAllGroups, setSelectedGroupId } from '@/app/redux/slices/listAllGroups.slice';
import { getAllMembers } from '@/app/redux/slices/groupAllMembers.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteGroupById } from './DeleteGroupByIdThunk';
import { toast } from 'sonner';

export default function ListGroups() {  
  const dispatch = useAppDispatch();
  const { groups, isLoading, error, selectedGroupId } = useAppSelector(state => state.listAllGroups);

  useEffect(() => {
    dispatch(listAllGroups());
  }, [dispatch]);

  const handleSubmit = (groupId: number) => {
    dispatch(setSelectedGroupId(groupId));
    dispatch(getAllMembers(groupId));
  };

  const handleDeleteGroupById = (groupId: number) => {
    dispatch(deleteGroupById(groupId))
      .unwrap()
      .then(() => {
        toast.success("Group deleted successfully");
        dispatch(listAllGroups());
      })
      .catch(() => {
        toast.error("Failed to delete group");
      });
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        borderRight: '1px solid #ccc',
        padding: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        All Groups
      </Typography>

      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {groups.map((group: GroupInterface) => (
          <ListItem key={group.id} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'left',
                border: '1px solid #ccc',
                borderRadius: 2,
                mb: 1,
                backgroundColor: selectedGroupId === group.id ? '#e0e0e0' : undefined,
              }}
              onClick={() => handleSubmit(group.id)}
              selected={selectedGroupId === group.id}
            >
              <ListItemText primary={group.groupName || "Default"} />
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGroupById(group.id);
                }}
                startIcon={<DeleteIcon />}
              >
                Del
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

