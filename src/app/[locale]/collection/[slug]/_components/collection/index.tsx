"use client";
import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import foodImage from "../../../../../../../public/assets/food.jpg";
import { Categories } from "@/entities/categories";
import CategoryCard from "@/components/category-card";
interface Props {
  title: string;
  description: string;
  itemsCount: number;
  date: string;
  imgId: string;
  id: string;
  category: Categories;
}
export default function Collection({
  date,
  description,
  imgId,
  itemsCount,
  title,
  category,
  id,
}: Props) {
  const fechaPublicacion = new Date(date);
  const tiempoTranscurrido = formatDistanceToNowStrict(fechaPublicacion, {
    addSuffix: true,
    locale: es,
  });
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
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          <CategoryCard title={category.name} id={category.id} />
        </Box>
        <Box sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <Typography variant="caption"> {itemsCount} items</Typography>
          <Typography variant="caption"> {tiempoTranscurrido} </Typography>
        </Box>
      </Box>
    </Card>
  );
}
