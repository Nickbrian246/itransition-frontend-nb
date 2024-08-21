"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  text: string;
}
export default function MarkDownDescription({ text }: Props) {
  return (
    <Box>
      <Typography variant="caption">Markdown preview</Typography>
      <ReactMarkdown>{text}</ReactMarkdown>
    </Box>
  );
}
