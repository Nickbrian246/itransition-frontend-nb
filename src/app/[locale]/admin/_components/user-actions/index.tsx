import { User } from "@/entities/user";
import { Box } from "@mui/material";
import BlockBtn from "./components/block-btn";
import ChangeRoles from "./components/change-role";
import CsvButton from "./components/csv-btn";
import DeleteBtn from "./components/delete-btn";
import UnLockBtn from "./components/unlock-btn";
import VisitUserBtn from "./components/visit-user-btn";

interface Props {
  usersSelected: any[];
  updateUsers: () => void;
  users: User[];
}
export default function UserActions({
  usersSelected,
  updateUsers,
  users,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px", height: "50px" }}>
        <BlockBtn usersSelected={usersSelected} updateUsers={updateUsers} />
        <UnLockBtn usersSelected={usersSelected} updateUsers={updateUsers} />
        <DeleteBtn usersSelected={usersSelected} updateUsers={updateUsers} />
        <CsvButton users={users} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
      >
        <ChangeRoles usersSelected={usersSelected} updateUsers={updateUsers} />
        <VisitUserBtn usersSelected={usersSelected} />
      </Box>
    </Box>
  );
}
