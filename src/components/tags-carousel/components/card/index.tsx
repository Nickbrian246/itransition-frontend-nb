"use client";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { colors } from "@/constants";

interface Props {
  tagName: string;
  itemId: string;
}
export default function CarouselCard({ itemId, tagName }: Props) {
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
      <Typography variant="subtitle1">{tagName}</Typography>
    </Link>
  );
}
