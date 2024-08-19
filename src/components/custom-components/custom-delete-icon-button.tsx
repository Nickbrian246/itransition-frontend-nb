import { IconButton } from "@mui/material";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
interface Props {
  handleClick: () => void;
}
export default function CustomDeleteIconButton({ handleClick }: Props) {
  return (
    <IconButton onClick={handleClick}>
      <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
    </IconButton>
  );
}
