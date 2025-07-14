import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export interface UserSummaryType {
  userId: number;
  totalPaid: number;
  totalOwed: number;
  balance: number;
}

export const getUserSummary = createAsyncThunk(
  "getUserSummary",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/summary`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  });

interface UserSummaryState {
  isLoading: boolean;   
  userSummary: UserSummaryType | null;
  error: string | null;
}

const initialState: UserSummaryState = {
  isLoading: false,
  userSummary: null,
  error: null,
};  

const getUserSummarySlice = createSlice({
    name: "getUserSummary",
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder.addCase(getUserSummary.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserSummary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userSummary = action.payload;
    });
    builder.addCase(getUserSummary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string || action.error.message || "Unknown error";
    });
  },        
})

export default getUserSummarySlice.reducer