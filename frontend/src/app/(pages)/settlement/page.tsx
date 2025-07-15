'use client';
import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  Chip,
  CircularProgress,
  Alert,
  Container,
  Divider,
  Avatar,
  Stack,
  Button
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchSettlements, clearError } from '@/app/redux/slices/settlement.slice';
import { useRouter } from 'next/navigation';
export default function Settlement() {
  const dispatch = useAppDispatch();
    const router = useRouter();
  
  const { settlements, loading, error } = useAppSelector(state => state.settlement);
  const userId = useAppSelector(state => state.user.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSettlements(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [error, dispatch]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount ); 
  };

  const getStatusChip = (paid: number, owed: number) => {
    if (paid >= owed) {
      return <Chip label="Settled" color="success" size="small" />;
    } else if (paid > 0) {
      return <Chip label="Partially Paid" color="warning" size="small" />;
    } else {
      return <Chip label="Pending" color="error" size="small" />;
    }
  };

  const handleRetry = () => {
    if (userId) {
      dispatch(fetchSettlements(userId));
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          action={
            <button onClick={handleRetry} style={{ marginLeft: 8 }}>
              Retry
            </button>
          }
        >
          Error loading settlements: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Settlements
      </Typography>
        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={() => router.push('/dashboard')} sx={{ ml: 'auto' }}>
            Back to Dashboard
          </Button>
        </Stack>

      {settlements.length === 0 ? (
        <Alert severity="info">No settlements found</Alert>
      ) : (
        <List sx={{ width: '100%' }}>
          {settlements.map((settlement) => (
            <Card key={settlement.id} sx={{ mb: 2, elevation: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="div" gutterBottom>
                      {settlement.expense.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created: {formatDate(settlement.expense.createdAt)}
                    </Typography>
                  </Box>
                  {getStatusChip(settlement.paid, settlement.owed)}
                </Box>

                <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Expense
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(settlement.expense.amount)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      You Owe
                    </Typography>
                    <Typography variant="h6" color="error">
                      {formatCurrency(settlement.owed)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      You Paid
                    </Typography>
                    <Typography variant="h6" color="success">
                      {formatCurrency(settlement.paid)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Balance
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color={settlement.owed - settlement.paid > 0 ? "error" : "success"}
                    >
                      {formatCurrency(settlement.owed - settlement.paid)}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Participants:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {settlement.expense.expenseParticipant.map((participant) => (
                    <Box 
                      key={participant.id} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        p: 1, 
                        bgcolor: 'grey.50', 
                        borderRadius: 1 
                      }}
                    >
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                        {participant.user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {participant.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Owes: {formatCurrency(participant.owed)} | 
                          Paid: {formatCurrency(participant.paid)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Container>
  );
}