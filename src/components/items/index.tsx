"use client";
import React from "react";
import ItemCard from "./item-card";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function Items() {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography mb={1} variant="h5">
        {t("feed:latestItems")}
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
