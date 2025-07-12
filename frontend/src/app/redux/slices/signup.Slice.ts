import { axiosInstance, FormInterface } from "@/app/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  'signupUser',
  async (data: FormInterface, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/signup', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data); // important!
    }
  }
);


const initialState = {
  isRegistered: false,
  isLoading: false,
  userData: null,
  error: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isRegistered = true;
      state.isLoading = false;
      state.userData = action.payload;
      state.error = null;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
    //   state.error = action.error?.message;
    });
  },
});

export default signupSlice.reducer;