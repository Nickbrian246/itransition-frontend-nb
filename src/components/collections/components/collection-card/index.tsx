"use client";
import { timeFromNow } from "@/utils/date/date-distance";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import foodImage from "../../../../../public/assets/food.jpg";
import { useAppSelector } from "@/hooks/use-redux/redux";
interface Props {
  title: string;
  description: string;
  itemsCount: number;
  date: string;
  imgId: string;
  id: string;
}
export default function CollectionCard({
  date,
  description,
  imgId,
  itemsCount,
  title,
  id,
}: Props) {
  const { locale } = useAppSelector((state) => state.locale);
  const time = timeFromNow(new Date(date), locale);
  return (
    <Link style={{ textDecoration: "none" }} href={`/collection/${id}`}>
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
            <Typography variant="subtitle2">{title}</Typography>
            <ReactMarkdown>{description}</ReactMarkdown>
          </Box>
          <Box
            sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <Typography variant="caption"> {itemsCount} items</Typography>
            <Typography variant="caption"> {time} </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}
