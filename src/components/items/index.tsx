"use client";
import { Item } from "@/entities/item";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LatestItems from "./components/items";
import Skeletons from "./components/skeleton";
import { getLatestItems } from "./services/item";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { useRouter } from "next/navigation";

export default function Items() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { locale } = useAppSelector((state) => state.locale);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    getLatestItems()
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err: ErrorResponse<string>) => {
        dispatch(
          setGlobalWarning({
            message: t(`errors:${err.message}`),
            severity: "error",
          })
        );
        if (
          errorsRedirectToHome[err.message as keyof typeof errorsRedirectToHome]
        ) {
          router.replace("/");
        }
      })
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
          <LatestItems locale={locale} items={items} />
        )}
      </Box>
    </Box>
  );
}
