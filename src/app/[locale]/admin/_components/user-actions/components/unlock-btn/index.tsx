import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { unLockUsersByIds } from "./services";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function UnLockBtn({ usersSelected, updateUsers }: Props) {
  const handleBlockBtn = () => {
    unLockUsersByIds({ usersIds: usersSelected })
      .then((res) => {
        updateUsers();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button
      disabled={usersSelected.length === 0}
      onClick={handleBlockBtn}
      sx={{ bgcolor: "#43a047" }}
      variant="contained"
    >
      Un lock
    </Button>
  );
}
