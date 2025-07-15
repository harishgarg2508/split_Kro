'use client';

import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getExpensesForUser } from "@/app/redux/slices/getExpensesForUser.slice";
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Card, 
  CardContent,
  Chip
} from "@mui/material";
import { deleteExpense } from "./deleteExpenseThunk";
import { toast } from "sonner";
import { set } from "zod";

export default function ExpensesPage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.userId);
  const selectedGroupId = useAppSelector(state => state.listAllGroups.selectedGroupId);
  const { expenses, isLoading, error } = useAppSelector(state => state.getExpensesForUser);

  const handleGetExpenses = () => {
    const numericUserId = Number(userId);
    
    if (!userId || userId === null || userId === undefined) {
      alert("User ID is not available. Please login first.");
      return;
    }
    
    if (!selectedGroupId) {
      alert("Please select a group first.");
      return;
    }
    
    if (isNaN(numericUserId) || numericUserId <= 0) {
      alert("Invalid user ID format");
      return;
    }
    
    dispatch(getExpensesForUser({ userId: numericUserId, groupId: selectedGroupId }));
  };

  const handleEdit = (expenseId: number) => {
    console.log("Edit expense:", expenseId);
  };

  const handleDelete = (expenseId: number) => {
    dispatch(deleteExpense(expenseId))
      .then(() => {
      toast.success("Expense deleted successfully");
      setTimeout(()=>{
        window.location.reload();

      },2000)
    })
      .catch((error) => {
        toast.error("Failed to delete expense: " + error.message);
      });

 
  };

  const calculateUserTotal = (expense: any) => {
    const userParticipant = expense.expenseParticipant.find(
      (p: any) => p.user.id === Number(userId)
    );
    return userParticipant ? {
      paid: userParticipant.paid,
      owed: userParticipant.owed,
      balance: userParticipant.paid - userParticipant.owed
    } : null;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Expenses
      </Typography>

      <Button 
        variant="contained" 
        onClick={handleGetExpenses}
        sx={{ mb: 3 }}
      >
        Show Group Expenses
      </Button>

      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {typeof error === 'string' ? error : error || 'Something went wrong'}
        </Typography>
      )}

      {expenses && expenses.length > 0 && (
        <Box display="flex" flexDirection="column" gap={2}>
          {expenses.map((expense: any) => {
            const userTotal = calculateUserTotal(expense);
            return (
              <Card key={expense.id}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                    <Box flex={1} minWidth="200px">
                      <Typography variant="h6" gutterBottom>
                        {expense.description}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total Amount: ₹{expense.amount}
                      </Typography>

                      <Box display="flex" gap={1} mb={2}>
                        <Chip 
                          label={expense.category.categoryName} 
                          size="small" 
                          color="primary"
                        />
                        <Chip 
                          label={expense.group.groupName} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>

                      <Typography variant="body2" gutterBottom>
                        Created by: {expense.createdBy.name}
                      </Typography>

                      {userTotal && (
                        <Box mt={2} p={1} bgcolor="grey.50" borderRadius={1}>
                          <Typography variant="body2">
                            <strong>Your Share:</strong>
                          </Typography>
                          <Typography variant="body2" color="success.main">
                            Paid: ₹{userTotal.paid}
                          </Typography>
                          <Typography variant="body2" color="warning.main">
                            Owed: ₹{userTotal.owed}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={userTotal.balance >= 0 ? "success.main" : "error.main"}
                          >
                            Balance: ₹{userTotal.balance}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box mt={2} display="flex" flexDirection="column" gap={1}>
                      <Button 
                        variant="text" 
                        color="primary" 
                        size="small"
                        onClick={() => handleEdit(expense.id)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="text" 
                        color="error" 
                        size="small"
                        onClick={() => handleDelete(expense.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {expenses && expenses.length === 0 && (
        <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
          No expenses found for this user.
        </Typography>
      )}
    </Box>
  );
}
