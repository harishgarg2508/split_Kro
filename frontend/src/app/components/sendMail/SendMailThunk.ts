import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const sendMailToUser = createAsyncThunk(
  "sendMailToUser",
  async (data: string[]) => {
    console.log(data)
    const response = await axiosInstance.post("/mail/send", [...data] );
    return response.data;
  }
);