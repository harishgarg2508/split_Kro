'use client';

import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Typography,
  Box,
} from '@mui/material';

export default function CreateExpenseDialog() {
  const [open, setOpen] = useState(false);
 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Expense
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Expense</DialogTitle>
        

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Expense
            </Button>
          </DialogActions>
      </Dialog>
    </>
  );
}
