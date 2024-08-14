"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import "swiper/swiper-bundle.css";

import { useTranslation } from "react-i18next";

import { Tag } from "@/entities/tags";
import TagCardsSkeleton from "./components/skeleton";
import { getTags } from "./services";
import Carousel from "./components/carousel";

export default function TagsCarousel() {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { t } = useTranslation();
  // const tags = [
  //   "Engineering",
  //   "Design",
  //   "Marketing",
  //   "Sales",
  //   "HR",
  //   "Finance",
  //   "Engineering",
  // ];

  useEffect(() => {
    getTags()
      .then((res) => {
        setTags(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography sx={{ mb: "10px" }} variant="h5">
        {t("feed:discover")}
      </Typography>

      {isLoading || tags === null ? (
        <TagCardsSkeleton />
      ) : (
        <Carousel tags={tags} />
      )}
    </Box>
  );
}
