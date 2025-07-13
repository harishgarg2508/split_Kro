import { Box } from "@mui/material";
import GroupAllMembers from "../getAllMembers/GroupAllMembers";
import CreateExpenseDialog from "../createExpense/CreateExpense";

export default function GroupDetail() {
    return (
        <Box sx={{width: '70%', height: '100vh', borderRight: '1px solid #ccc', padding: 2}}>
            <GroupAllMembers/>
            <CreateExpenseDialog/>
        </Box>
    )
}