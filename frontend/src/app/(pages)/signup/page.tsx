"use client";
import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInterface, userSchema } from "@/app/utils";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";



export default function SignupPage() {
  const [userData, setUserData] = useState<any>(null);

  const {register,handleSubmit,formState: { errors },reset,} = useForm<FormInterface>({
    resolver: zodResolver(userSchema),
  });
const router = useRouter();
 const submitData = async (data: FormInterface) => {
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    // Server responded with error
    if (!response.ok) {
      const err = await response.json();
      toast.error(err.message || "Signup failed");
      return;
    }

    const responseData = await response.json();
    toast.success("Signup successful!");
    setUserData(responseData);
    reset();
          router.push("/login");

  } catch (error) {
    // Only log network/unknown error to console
    console.error("Signup error:", error);
    // Optional: You could check if error is TypeError (like network failure) then show a toast
    if (error instanceof TypeError) {
      toast.error("Network error. Please try again.");
    }
  }
};


  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitData)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link href="/login" passHref>
            <Typography variant="body2" color="text.secondary" align="center">
              Already have an account? Login
            </Typography>
          </Link>
          
        </Box>

      </Box>
      <Toaster richColors position="top-right" />
    </Container>
  );
}