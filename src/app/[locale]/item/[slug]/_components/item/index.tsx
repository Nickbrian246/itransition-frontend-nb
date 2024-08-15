"use client";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import TagCard from "@/components/tag-card";
import CustomFields from "../custom-fields";
import { Item as ItemInterface } from "@/entities/item";

interface Props {
  item: ItemInterface;
}
export default function Item({ item: { name, tag } }: Props) {
  return (
    <Card sx={{ padding: "10px" }}>
      <Typography variant="h5">{name}</Typography>
      <Box sx={{ display: "flex", gap: "10px", mt: "10px" }}>
        <TagCard id="hola" title={tag.name} />
      </Box>
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", mt: "20px" }}>
        <CustomFields />
      </Box>
    </Card>
  );
}
