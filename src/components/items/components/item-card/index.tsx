"use client";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Locale } from "@/types/types";
import { timeFromNow } from "@/utils/date/date-distance";
import { User } from "@/entities/user";
interface Props {
  title: string;
  authorName: string;
  collectionName: string;
  date: string;
  id: string;
  locale: Locale;
  isEdited: boolean;
  editedBy: User;
}

export default function ItemCard({
  authorName,
  collectionName,
  date,
  title,
  locale,
  id,
  editedBy,
  isEdited,
}: Props) {
  const { t } = useTranslation();
  const timeFrom = timeFromNow(new Date(date), locale);
  return (
    <Link style={{ textDecoration: "none" }} href={`/item/${id}`}>
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
            <Typography variant="subtitle2">{title}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="caption">
                {t("commons:author")}: {authorName}
              </Typography>

              {isEdited && (
                <Typography variant="caption">
                  {t("commons:editedBy")}: {editedBy.firstName}
                </Typography>
              )}
            </Box>
          </Box>
          <Typography variant="body2">
            {" "}
            {t("commons:collection")}: {collectionName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Typography variant="caption">{timeFrom}</Typography>
        </Box>
      </Card>
    </Link>
  );
}
