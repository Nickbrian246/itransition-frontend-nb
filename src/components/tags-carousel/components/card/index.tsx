"use client";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { colors } from "@/constants";
import { id } from "date-fns/locale";

interface Props {
  tagName: string;
  id: string;
}
export default function CarouselCard({ id, tagName }: Props) {
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
      href={`/tag/${id}`}
    >
      <Typography variant="subtitle1">{tagName}</Typography>
    </Link>
  );
}
