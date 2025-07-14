import CreateGroupButton from "@/app/components/createGroup/CreateGroupButton";
import GroupDetail from "@/app/components/groupDetailPage/GroupDetail";
import ListGroups from "@/app/components/listGroups/ListGroups";
import Navbar from "@/app/components/Navbar";
import { Box, Stack } from "@mui/material";
import SummaryPage from "../expenses/page";

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
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}


