'use client';

import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getUserSummary } from "@/app/redux/slices/getuserSummary.slice";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

export default function SummaryPage() {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(state => state.user.userId);

  const { userSummary, isLoading, error } = useAppSelector(state => state.getUserSummary);

  const handleGetSummary = () => {
    const numericUserId = Number(userId);
    if (!numericUserId || isNaN(numericUserId)) {
      alert("Invalid user ID");
      return;
    }

    dispatch(getUserSummary(numericUserId));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>User Summary</Typography>

      <Button variant="contained" onClick={handleGetSummary}>
        Get Summary
      </Button>

      <Box mt={3}>
        {isLoading && <CircularProgress />}

        {error && (
          <Typography color="error" mt={2}>
            Error: {error}
          </Typography>
        )}

        {/* {userSummary && (
          <Box mt={2}>
            <Typography><strong>Name:</strong> {userSummary.name}</Typography>
            <Typography><strong>Total Spent:</strong> ₹{userSummary.totalSpent}</Typography>
            <Typography><strong>Total Owed:</strong> ₹{userSummary.totalOwed}</Typography>
            <Typography><strong>Total Balance:</strong> ₹{userSummary.balance}</Typography>
          </Box>
        )} */}
      </Box>
    </Box>
  );
}
