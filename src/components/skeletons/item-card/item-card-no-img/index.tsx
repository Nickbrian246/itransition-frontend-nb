import { Card, Box, Skeleton } from "@mui/material";
import React from "react";

export default function ItemCardNoImgSkeleton() {
  return (
    <Card
      sx={{
        display: "flex",
        padding: "10px",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Skeleton animation="pulse" />
          <Skeleton animation="pulse" />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Skeleton sx={{ width: "40px" }} animation="pulse" />
          <Skeleton sx={{ width: "40px" }} animation="pulse" />
        </Box>
      </Box>
    </Card>
  );
}
