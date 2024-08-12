"use client";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import foodImage from "../../../../../public/assets/food.jpg";
export default function CollectionCard() {
  return (
    <Card
      sx={{
        padding: "10px",
        display: "flex",
        gap: "10px",
        flexWrap: {
          xs: "wrap",
          md: "nowrap",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "300px",
        }}
      >
        <Image
          style={{ borderRadius: "10px" }}
          width={300}
          alt="collection image"
          src={foodImage}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <Typography variant="subtitle2">Organize your life 2022</Typography>
          <Typography variant="body2">
            Get ready for the year with our planners, journals and more
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <Typography variant="caption"> 6 items</Typography>
          <Typography variant="caption"> 1hour ago</Typography>
        </Box>
      </Box>
    </Card>
  );
}
