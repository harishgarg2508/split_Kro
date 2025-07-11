"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <AppBar position="static" color="primary" sx={{ boxShadow: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Split Kro
          </Typography>
          <Box>
            <Link href="/login" passHref>
              <Button color="inherit" sx={{ mr: 1 }}>
                Sign In
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button variant="outlined" color="inherit">
                Sign Up
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Share Expenses Easily with Split Kro
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Simplify group spending. Split bills with friends, track expenses, and settle up instantly.
          </Typography>
          <Box mt={4}>
            <Link href="/signup" passHref>
              <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                Get Started
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="outlined" color="primary" size="large">
                Already a user?
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
