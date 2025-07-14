import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const listAllGroups = createAsyncThunk(
  "listAllGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/groups");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export interface GroupInterface {
  id: number;
  groupName: string;
}

interface ListAllGroupsState {
  isLoading: boolean;
  groups: GroupInterface[];
  error: string | null;
  selectedGroupId: number | null; // <--- add this
}

const initialState: ListAllGroupsState = {
  isLoading: false,
  groups: [],
  error: null,
  selectedGroupId: null, // <--- add this
};

const listAllGroupsSlice = createSlice({
  name: "listAllGroups",
  initialState,
  reducers: {
    setSelectedGroupId(state, action: PayloadAction<number>) {
      state.selectedGroupId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listAllGroups.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(listAllGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groups = action.payload;
    });
    builder.addCase(listAllGroups.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) || action.error.message || "Unknown error";
    });
  },
});

export const { setSelectedGroupId } = listAllGroupsSlice.actions;
export default listAllGroupsSlice.reducer;
