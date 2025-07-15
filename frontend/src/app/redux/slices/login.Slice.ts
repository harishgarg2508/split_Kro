
import { axiosInstance, Credentials, UserState } from "@/app/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: Credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', data, {
        withCredentials: true, 
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
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
  createdAt: '',
  updatedAt: '',
  avatar: '',

  
};

const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = '';
      state.userId = '';
      state.email = '';
      state.token = '';
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.avatar = action.payload.avatar;
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error?.message || 'An unknown error occurred';
      state.isLoading = false;
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
