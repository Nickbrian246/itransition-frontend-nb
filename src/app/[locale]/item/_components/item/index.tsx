"use client";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import TagCard from "@/components/tag-card";
import CustomFields from "../custom-field";

export default function Item() {
  return (
    <Card sx={{ padding: "10px" }}>
      <Typography variant="h5">Name</Typography>
      <Box sx={{ display: "flex", gap: "10px", mt: "10px" }}>
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
        <TagCard />
      </Box>
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", mt: "20px" }}>
        <CustomFields />
      </Box>
    </Card>
  );
}
