import { axiosInstance, Credentials, UserState } from "@/app/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: Credentials) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  }
);

const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  token: '',
  userId: '',
  name: '',
  email: '',
  error: '',
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      state.userId = '';
      state.name = '';
      state.email = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error?.message || 'An unknown error occurred';
      state.isLoading = false;
    });
  },
});

export default loginSlice.reducer;