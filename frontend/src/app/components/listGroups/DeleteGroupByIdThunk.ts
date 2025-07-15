import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const deleteGroupById = createAsyncThunk(
    "deleteGroupById",
    async (groupId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/groups/${groupId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete group"
            );
        }
    }
);