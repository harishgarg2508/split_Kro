'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, ListItemAvatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect } from 'react';
import { GroupInterface, listAllGroups } from '@/app/redux/slices/listAllGroups.slice';

export default function ListGroups() {
  const dispatch = useAppDispatch();
  const { groups, isLoading, error } = useAppSelector(state => state.listAllGroups);
    console.log(groups)
  useEffect(() => {
    dispatch(listAllGroups());
  }, [dispatch]);

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
           
            <ListItemButton sx={{ textAlign: 'left', border: '1px solid #ccc', borderRadius: 2, mb: 1 }} onClick={() => console.log(group)}>
              <ListItemText primary={group.groupName || "Default"} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
