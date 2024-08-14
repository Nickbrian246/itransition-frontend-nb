"use client";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale"; // Para español
import Link from "next/link";
interface Props {
  title: string;
  authorName: string;
  collectionName: string;
  date: string;
  id: string;
}

export default function ItemCard({
  authorName,
  collectionName,
  date,
  title,
  id,
}: Props) {
  const { t } = useTranslation();

  const fechaPublicacion = new Date(date);
  const tiempoTranscurrido = formatDistanceToNowStrict(fechaPublicacion, {
    addSuffix: true,
    locale: es,
  });
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
            <Typography variant="caption">
              {t("commons:author")}: {authorName}
            </Typography>
          </Box>
          <Typography variant="body2">
            {" "}
            {t("commons:collection")}: {collectionName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Typography variant="caption">{tiempoTranscurrido}</Typography>
        </Box>
      </Card>
    </Link>
  );
}
