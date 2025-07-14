import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export interface ExpenseType {
  amount: number;
  description: string;
  createdBy: number;
  categoryId: number;
  groupId: number;
  participants: {
    userId: number;
    paid: number;
    owed: number;
  }[];
}

export const createExpense = createAsyncThunk(
  "createExpense",
  async (data: ExpenseType) => {
    const response = await axiosInstance.post("/expenses", data);
    console.log("createExpense response:", response.data);
    return response.data;
  }
);

interface ExpenseState {
  isLoading: boolean;
  expenseData: ExpenseType | null;
  error: string | null;
}

const initialState: ExpenseState = {
  isLoading: false,
  expenseData: null,
  error: null,
};

const createExpenseSlice = createSlice({
  name: "createExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createExpense.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createExpense.fulfilled, (state, action) => {
      state.isLoading = false;
      state.expenseData = action.payload;
    });
    builder.addCase(createExpense.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || action.error.message || "Unknown error";
    });
  },
});

export default createExpenseSlice.reducer;
