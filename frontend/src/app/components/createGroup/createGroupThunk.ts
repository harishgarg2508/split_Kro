import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";
interface GroupFormFields {
    groupName: string;
    categoryId: number;
}
export const createGroup = createAsyncThunk("createGroup", async (data: GroupFormFields, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/groups/create", data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});