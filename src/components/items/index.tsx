import React from "react";
import ItemCard from "./item-card";
import { Box, Typography } from "@mui/material";
export default function Items() {
  return (
    <Box>
      <Typography mb={1} variant="h5">
        Latest Items
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Box>
    </Box>
  );
}
