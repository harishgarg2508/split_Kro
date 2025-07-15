import CreateGroupButton from "@/app/components/createGroup/CreateGroupButton";
import GroupDetail from "@/app/components/groupDetailPage/GroupDetail";
import ListGroups from "@/app/components/listGroups/ListGroups";
import Navbar from "@/app/components/Navbar";
import { Box, Button, Stack } from "@mui/material";
import SummaryPage from "../expenses/page";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Box sx={{width: '100%'}}>
      <Navbar />
      <Stack direction="row" sx={{ width: '100%' }}>
        <ListGroups />
        <GroupDetail />


        <Box sx={{ flex: 1, padding: 2 }}>
          <Stack direction="column" justifyContent="flex-end" sx={{ mb: 2 }}>
            <CreateGroupButton  />
            <Button variant="contained" sx={{ mt: 2 }}><Link href="/settlement" style={{textDecoration: 'none'}}>View Settlements</Link></Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}


