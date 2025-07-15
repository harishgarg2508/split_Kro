'use client';
import * as React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, ListItemAvatar, Stack, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import PersonIcon from '@mui/icons-material/Person';
import { removeUserFromGroup } from './removeUserFromGoupThunk';
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
                <PersonIcon />
              </ListItemAvatar>
                <ListItemText primary={member.user.name || "Unnamed"} />
                 <Button sx={{ ml: 2 ,width: '20px', height: '30px' , border: '1px solid #ccc', borderRadius: 2}} variant="outlined" color="error" size="small"
                onClick={() => {
                  dispatch(removeUserFromGroup({userId: member.user.id,groupId: member.id}))
                }}
              >
                X
              </Button>
              </ListItemButton>
              <Divider orientation="vertical" flexItem />
             
            </ListItem>
          ))
        ) : (
          <Typography>No members available</Typography>
        )}
      </List>
    </Stack>
  );
}

