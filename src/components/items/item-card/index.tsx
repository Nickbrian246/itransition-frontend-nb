import { Box, Card, Typography } from "@mui/material";
import React from "react";

export default function ItemCard() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle2">Technology more advanced</Typography>
          <Typography variant="caption">Author: Nick</Typography>
        </Box>
        <Typography variant="body2">Collection: Books</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Typography variant="caption">1 hour ago</Typography>
      </Box>
    </Card>
  );
}
