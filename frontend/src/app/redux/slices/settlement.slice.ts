import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

interface User {
  id: string;
  name: string;
  email: string;
}

interface ExpenseParticipant {
  id: string;
  user: User;
  owed: number;
  paid: number;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  createdAt: string;
  expenseParticipant: ExpenseParticipant[];
}

interface Settlement {
  id: string;
  owed: number;
  paid: number;
  expense: Expense;
}

interface SettlementState {
  settlements: Settlement[];
  loading: boolean;
  error: string | null;
}

export const fetchSettlements = createAsyncThunk(
  'settlement/fetchSettlements',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/settlement/all/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Failed to fetch settlements"
      );
    }
  }
);

const initialState: SettlementState = {
  settlements: [],
  loading: false,
  error: null,
};

const settlementSlice = createSlice({
  name: 'settlement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSettlements: (state) => {
      state.settlements = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettlements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettlements.fulfilled, (state, action: PayloadAction<Settlement[]>) => {
        state.settlements = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSettlements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSettlements } = settlementSlice.actions;
export default settlementSlice.reducer;