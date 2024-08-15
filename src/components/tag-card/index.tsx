import { colors } from "@/constants";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
interface Props {
  title: string;
  id: string;
}
export default function TagCard({ id, title }: Props) {
  return (
    <Link
      style={{
        padding: "5px 10px",
        background: `${colors.backGroundGray}`,
        textDecoration: "none",
        display: "flex",
        width: "fit-content",
        borderRadius: "30px",
      }}
      href={"/"}
    >
      <Typography variant="subtitle1">{title}</Typography>
    </Link>
  );
}
