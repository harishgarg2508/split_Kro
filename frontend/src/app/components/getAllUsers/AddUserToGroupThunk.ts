import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

interface AddUser{
    userId: number,
    groupId: number
}
export const addUserToGroup = createAsyncThunk(
    "addToGroup",
    async (data:AddUser) => {
        const response = await axiosInstance.post("/groupmembers/add", data);
        return response.data;
    }
);


export const removeUserToGroup = createAsyncThunk(
    "removeFromGroup",
    async (data:AddUser) => {
        const response = await axiosInstance.post("/groupmembers/remove", data);
        return response.data;
    }
);