import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const getAllMembers = createAsyncThunk(
    "getAllMembers",
    async (id: number) => {
        const response = await axiosInstance.get(`/groupmembers/all/${id}`);
        return response.data;
    }
);



interface User{
  id:number
  name:string
  email:string
  avatar:string
}
export interface GroupMembers {
  id:number
 user:User
}

interface ListAllMembersState {
  isLoading: boolean;
  groupmembers: GroupMembers[];
  error: string | null;
}

const initialState: ListAllMembersState = {
  isLoading: false,
  groupmembers: [],
  error: null,
};

const getAllMembersSlice = createSlice({
  name: "getAllMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMembers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groupmembers = action.payload;
    });
    builder.addCase(getAllMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string || action.error.message || "Unknown error";
    });
  },
});

export default getAllMembersSlice.reducer;
