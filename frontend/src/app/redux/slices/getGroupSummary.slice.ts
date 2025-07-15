import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const getGroupSummary = createAsyncThunk(
    "getGroupSummary",
    async (groupId: number) => {
        const response = await axiosInstance.get(`/groups/summary/${groupId}`);
        return response.data;
    }
);

interface GroupSummaryData{
    groupName:string
    createdAt:string
    category:object
    groupMembers:Array<object>
    expenses:Array<object>

}

interface GroupSummaryState {
    isLoading: boolean;
    groupSummary: GroupSummaryData | null;
    error: string | null;
  }
  
  const initialState: GroupSummaryState = {
    isLoading: false,
    groupSummary: null,
    error: null,
  };
  
  export const groupSummarySlice = createSlice({
    name: "groupSummary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getGroupSummary.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getGroupSummary.fulfilled, (state, action) => {
          state.isLoading = false;
          state.groupSummary = action.payload;
        })
        .addCase(getGroupSummary.rejected, (state, action) => {
          state.isLoading = false;
          state.error = (action.payload as string) || action.error.message || "Unknown error";
        });
    },
  });
  
  export default groupSummarySlice.reducer;

