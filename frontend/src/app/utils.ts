import axios from "axios";
import { z } from "zod";
export interface FormInterface {
  name?:string;
  email: string;
  password: string;
}

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


export const groupSchema = z.object({
  groupName: z.string().min(3, { message: "Group name must be at least 3 characters long" }),
  categoryId: z.number().int().positive("Please select a category"),
});

export const expenseSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  description: z.string().min(1, "Description is required"),
  createdBy: z.number().int().positive("Please select a user"),
  groupId: z.number().int().positive("Please select a group"),
  categoryId: z.number().int().positive("Please select a category"),
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export  interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string;
  userId: string;
  name: string;
  email: string;
  error: string;
}

export interface Credentials {
  email: string;
  password: string;
}

