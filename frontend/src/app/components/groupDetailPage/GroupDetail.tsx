'use client'
import { Box, Button, Stack } from "@mui/material";
import GroupAllMembers from "../getAllMembers/GroupAllMembers";
import GetAllUsers from "../getAllUsers/AddUserToGroup";
import CreateExpenseButton from "../createExpense/CreateExpense";

export default function GroupDetail() {

    return (
        <Box sx={{ width: '70%', height: '100vh', borderRight: '1px solid #ccc', padding: 2 }}>

            <GroupAllMembers />
            <Stack direction={'row'} gap={3}>
                <GetAllUsers />
                <CreateExpenseButton />
            </Stack>

        </Box>
    )
}