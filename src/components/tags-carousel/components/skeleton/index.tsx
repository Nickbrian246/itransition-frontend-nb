import React from "react";
import TagCardSkeleton from "@/components/skeletons/tag-card-skeleton";
import { Box } from "@mui/material";
export default function TagCardsSkeleton() {
  const arr = new Array(5).fill("*");
  return (
    <Box
      sx={{
        display: "flex",
        gap: {
          xs: "5px",
          md: "35px",
        },
        width: "100%",
      }}
    >
      {arr.map((_, index) => (
        <TagCardSkeleton key={index} />
      ))}
    </Box>
  );
}
