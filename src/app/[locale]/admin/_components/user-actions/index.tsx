import { Box, Button } from "@mui/material";
import React from "react";
import BlockBtn from "./components/block-btn";
import UnLockBtn from "./components/unlock-btn";
import DeleteBtn from "./components/delete-btn";
import ChangeRoles from "./components/change-role";
import VisitUserBtn from "./components/visit-user-btn";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function UserActions({ usersSelected, updateUsers }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", gap: "10px", height: "50px" }}>
        <BlockBtn usersSelected={usersSelected} updateUsers={updateUsers} />
        <UnLockBtn usersSelected={usersSelected} updateUsers={updateUsers} />
        <DeleteBtn usersSelected={usersSelected} updateUsers={updateUsers} />
      </Box>
      <Box
        sx={{ display: "flex", width: "50%", justifyContent: "space-between" }}
      >
        <ChangeRoles usersSelected={usersSelected} updateUsers={updateUsers} />
        <VisitUserBtn usersSelected={usersSelected} />
      </Box>
    </Box>
  );
}
