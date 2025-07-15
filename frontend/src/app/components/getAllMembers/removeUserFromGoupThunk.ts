import { axiosInstance } from "@/app/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeUserFromGroup = createAsyncThunk(
    "removeFromGroup",
    async (data: { userId: number, groupId: number }) => {
        try {
            const response = await axiosInstance.delete(`/groupmembers/remove/${data.groupId}/${data.userId}`, );
            return response.data;
        } catch (error: any) {
            return (
                error.response?.data?.message ||
                error.message ||
                "Failed to remove user from group"
            );
        }    
    }
);