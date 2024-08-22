"use client";
import { Locale } from "@/types/types";
import { timeFromNow } from "@/utils/date/date-distance";
import { Box, Typography } from "@mui/material";

import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  author: string;
  isEdited: boolean;
  editedBy: string;
  itemsCount: number;
  dateFrom: string;
  locale: Locale;
}
export default function MetaInfo({
  author,
  dateFrom,
  editedBy,
  isEdited,
  itemsCount,
  locale,
}: Props) {
  const timeFrom = timeFromNow(new Date(dateFrom), locale);
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography variant="caption">
          {t("commons:author")}: {author}{" "}
        </Typography>
        {isEdited && (
          <Typography variant="caption">
            {t("commons:editedBy")}: {editedBy}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography variant="caption"> {itemsCount} items</Typography>
        <Typography variant="caption"> {timeFrom} </Typography>
      </Box>
    </Box>
  );
}
