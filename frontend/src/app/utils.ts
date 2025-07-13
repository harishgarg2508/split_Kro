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
  categoryId: z
    .string()
    .refine(val => ["1", "2", "3", "4"].includes(val), { message: "Invalid category" })
    .transform(val => Number(val)), // transform to number for backend
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

