"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import CollectionCard from "./components/collection-card";
import { useTranslation } from "react-i18next";
export default function Collections() {
  const { t } = useTranslation();
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
      <Typography mb={1} variant="h5">
        {t("feed:latestCollections")}
      </Typography>
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
