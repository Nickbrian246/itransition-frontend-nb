"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import CollectionCard from "./components/collection-card";
export default function Collections() {
  return (
    <Box
      sx={{
        mt: "20px",
        width: {
          sx: "300px",
          md: "800px",
        },
      }}
    >
      <Typography variant="h5">Latest collections</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <CollectionCard />
        <CollectionCard />
      </Box>
    </Box>
  );
}
