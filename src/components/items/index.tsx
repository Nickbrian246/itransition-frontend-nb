"use client";
import { Item } from "@/entities/item";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LatestItems from "./components/items";
import Skeletons from "./components/skeleton";
import { getLatestItems } from "./services/item";

export default function Items() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    getLatestItems()
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <Box>
      <Typography mb={1} variant="h5">
        {t("feed:latestItems")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {isLoading || items === null ? (
          <Skeletons />
        ) : (
          <LatestItems items={items} />
        )}
      </Box>
    </Box>
  );
}
