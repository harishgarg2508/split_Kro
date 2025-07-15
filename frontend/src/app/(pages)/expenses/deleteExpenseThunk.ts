import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const deleteExpense = createAsyncThunk(
    "deleteExpense",
    async (expenseId: number) => {
        const response = await axiosInstance.delete(`/expenses/${expenseId}`);
        return response.data;
    }
);