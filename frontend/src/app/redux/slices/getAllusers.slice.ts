import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const getAllUsers = createAsyncThunk(
    "getAllUsers",
    async (search?:string) => {
        const response = await axiosInstance.get(`/user/all`);
        return response.data;
    }
);



interface User{
  id:number
  name:string
  email:string
  avatar:string
}


interface GetAllUsers {
  isLoading: boolean;
  users: User[];
  error: string | null;
}

const initialState: GetAllUsers = {
  isLoading: false,
  users: [],
  error: null,
};

const GetAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string || action.error.message || "Unknown error";
    });
  },
});

export default GetAllUsersSlice.reducer;
