import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export interface ExpenseType {
  id: number;
  amount: number;
  description: string;
  category: {
    id: number;
    categoryName: string;
  };
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
  group: {
    id: number;
    groupName: string;
  };
  expenseParticipant: Array<{
    id: number;
    paid: number;
    owed: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

export const getExpensesForUser = createAsyncThunk(
  "getExpensesForUser",
  async ({ userId, groupId }: { userId: number; groupId: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/expenses/all/${userId}/${groupId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

interface GetExpensesForUserState {
  isLoading: boolean;
  expenses: ExpenseType[] | null;
  error: string | null;
}

const initialState: GetExpensesForUserState = {
  isLoading: false,
  expenses: null,
  error: null,
};

const getExpensesForUserSlice = createSlice({
  name: "getExpensesForUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpensesForUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getExpensesForUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.expenses = action.payload;
    });
    builder.addCase(getExpensesForUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || action.error.message || "Unknown error";
    });
  },
});

export default getExpensesForUserSlice.reducer;