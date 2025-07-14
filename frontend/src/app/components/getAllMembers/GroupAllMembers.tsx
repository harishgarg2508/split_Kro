'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, ListItemAvatar, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
// import PersonIcon from '@mui/icons-material/Person';
export default function GroupAllMembers() {
  const dispatch = useAppDispatch();
  const members = useAppSelector(state => state.getAllMembers.groupmembers);
  console.log(members)
  return (
    <Stack direction={'row'}
      sx={{
        width: 'auto',
        height: '50px',
        borderRight: '1px solid #ccc',
        padding: 2,
        backgroundColor: '#f9f9f9',
      }}
    >

     <List sx={{display:'flex', alignContent:'flex-start', overflowX:'auto'}}>
        {members.length ? (
          members.map((member) => (
            <ListItem key={member.id} disablePadding>
              <ListItemButton sx={{ textAlign: 'left', border: '1px solid #ccc', borderRadius: 2, mr: 2 }}>
              <ListItemAvatar>
                {/* <PersonIcon /> */}
              </ListItemAvatar>
                <ListItemText primary={member.user.name || "Unnamed"} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography>No members available</Typography>
        )}
      </List>
    </Stack>
  );
}
