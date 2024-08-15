"use client";
import React, { useEffect, useState } from "react";
import EmptyContent from "@/components/empty-content";
import { getItemsByTagId } from "../_services";
import { Tag, TagWithItems } from "@/entities/tags";
import { Box } from "@mui/material";
import Skeleton from "./skeleton";
import ItemsCards from "./items";
import { useTranslation } from "react-i18next";
export default function Items({ slug }: { slug: string }) {
  const [tag, setTag] = useState<TagWithItems | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    getItemsByTagId(slug)
      .then((res) => setTag(res.data))
      .catch((res) => console.log(res))
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {isLoading || tag === null ? <Skeleton /> : <ItemsCards tag={tag} />}
      {!isLoading && tag !== null && tag.items.length === 0 && (
        <EmptyContent text={t("commons:noItems")} />
      )}
    </Box>
  );
}
