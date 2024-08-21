import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { deleteUsersByIds } from "./services";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function DeleteBtn({ usersSelected, updateUsers }: Props) {
  // const handleBlockBtn = () => {
  //   deleteUsersByIds()
  //     .then((res) => {})
  //     .catch((err) => console.log(err));
  // };
  return (
    <Button
      disabled={usersSelected.length === 0}
      sx={{ bgcolor: "#d50000" }}
      variant="contained"
    >
      delete
    </Button>
  );
}
