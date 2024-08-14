import { colors } from "@/constants";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
interface Props {
  title: string;
  id: string;
}
export default function CategoryCard({ id, title }: Props) {
  return (
    <Box
      sx={{
        padding: "5px 10px",
        background: `${colors.backGroundGray}`,
        textDecoration: "none",
        display: "flex",
        width: "fit-content",
        borderRadius: "30px",
        mt: "10px",
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
  );
}
