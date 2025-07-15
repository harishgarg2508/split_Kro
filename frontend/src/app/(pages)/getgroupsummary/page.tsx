'use client'
import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import { getGroupSummary } from '@/app/redux/slices/getGroupSummary.slice';

export default function GroupSummary() {

  const dispatch = useAppDispatch();
  const { groupSummary, isLoading, error } = useAppSelector(state => state.groupSummary);
  const groupId = useAppSelector(state => state.listAllGroups.selectedGroupId);

  useEffect(() => {
    if (groupId) {
      dispatch(getGroupSummary(groupId));
    }
  }, [groupId, dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ padding: 2 }}>
        <CircularProgress />
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!groupSummary) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1">No data available</Typography>
      </Box>
    );
  }

  const { groupName, createdAt, category, groupMembers, expenses } = groupSummary;
  const totalGroupExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {groupName} Summary
      </Typography>
      <Typography variant="body1">Created at: {createdAt}</Typography>
      <Typography variant="body1" gutterBottom>
        Category: {category.categoryName}
      </Typography>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Group Members:</Typography>
        {groupMembers && groupMembers.map((member, index) => (
          <ListItem key={index}>
            <ListItemText primary={member.user.name} />
          </ListItem>
        ))}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">Total Group Expense:</Typography>
        <Typography variant="body1" gutterBottom>
          ${totalGroupExpense}
        </Typography>

        <Typography variant="h6">Expenses:</Typography>
        {expenses && expenses.map((expense, index) => (
          <ListItem key={index}>
            <ListItemText primary={expense.description} secondary={`$${expense.amount}`} />
          </ListItem>
        ))}
      </Box>
    </Box>
  );
}