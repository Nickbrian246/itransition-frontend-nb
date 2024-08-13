import { colors } from "@/constants";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function TagCard() {
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
      <Typography variant="subtitle1">tagName</Typography>
    </Link>
  );
}
