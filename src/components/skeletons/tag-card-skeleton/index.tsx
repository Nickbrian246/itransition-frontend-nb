import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function TagCardSkeleton() {
  return (
    <Box>
      <Skeleton
        sx={{ bgcolor: "grey.900", borderRadius: "20px" }}
        variant="rectangular"
        width={100}
        height={30}
      />
    </Box>
  );
}
