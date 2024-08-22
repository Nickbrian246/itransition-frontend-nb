import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { blockUsersByIds } from "./services";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function BlockBtn({ usersSelected, updateUsers }: Props) {
  const handleBlockBtn = () => {
    blockUsersByIds({ usersIds: usersSelected })
      .then((res) => {
        updateUsers();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button
      disabled={usersSelected.length === 0}
      onClick={handleBlockBtn}
      sx={{ bgcolor: "#fb8c00" }}
      variant="contained"
    >
      Block
    </Button>
  );
}
