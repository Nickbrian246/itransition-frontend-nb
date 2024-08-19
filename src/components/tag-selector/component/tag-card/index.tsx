import { Box, IconButton, Typography } from "@mui/material";
import { colors } from "@/constants";
import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
interface Props {
  title: string;
  id: string;
  handleDelete: (id: string) => void;
}
export default function TagCardEditable({ title, id, handleDelete }: Props) {
  return (
    <Box
      sx={{
        padding: "0px 8px",
        background: `${colors.backGroundGray}`,
        textDecoration: "none",
        display: "flex",
        width: "fit-content",
        borderRadius: "30px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
      <IconButton
        onClick={() => {
          handleDelete(id);
        }}
      >
        <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
      </IconButton>
    </Box>
  );
}
