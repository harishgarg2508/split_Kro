'use client'

import { useAppSelector } from "@/app/redux/hooks";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  return (
    <Box>

      <Button variant="contained" onClick={() => router.push("/dashboard")}>Back to dashboard</Button>
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 4, boxShadow: 3 }}>
      <CardHeader
  avatar={
    user.avatar ? (
      <Avatar
      alt={user.name}
      src={user.avatar}
      sx={{ width: 164, height: 164 }} 
      />
    ) : (
      <Avatar
      sx={{ bgcolor: 'primary.main', width: 164, height: 164 }} 
      >
        {user.name?.charAt(0).toUpperCase() || "U"}
      </Avatar>
    )
  }
  title={<Typography variant="h6">{user.name}</Typography>}
  subheader={user.email}
/>

      <Divider />
      <CardContent>
        <Stack spacing={1}>
          <InfoRow label="User ID" value={user.userId} />
          <InfoRow label="Token" value={user.token?.slice(0, 20) + "..."} />
          <InfoRow
            label="Joined"
            value={dayjs(user.createdAt).format("DD MMM YYYY")}
            />
          <InfoRow
            label="Last Updated"
            value={dayjs(user.updatedAt).format("DD MMM YYYY")}
            />
          <InfoRow
            label="Logged In"
            value={user.isLoggedIn ? "Yes" : "No"}
            />
        </Stack>
      </CardContent>
    </Card>
</Box>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography>{value || "N/A"}</Typography>
    </Box>
  );
}
