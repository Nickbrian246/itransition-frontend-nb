"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LatestCollections from "./components/collections/latest-collections";
import Skeletons from "./components/skeleton";
import { getLatestCollections } from "./services";
import { Collections as collectionInterface } from "@/entities/collections";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { useRouter } from "next/navigation";

export default function Collections() {
  const [collections, setCollections] = useState<collectionInterface[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    getLatestCollections()
      .then((res) => setCollections(res.data))
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
    <Box
      sx={{
        mt: "20px",
        width: {
          sx: "300px",
          md: "800px",
        },
      }}
    >
      <Typography mb={1} variant="h5">
        {t("feed:latestCollections")}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {isLoading || collections === null ? (
          <Skeletons />
        ) : (
          <LatestCollections collections={collections} />
        )}
      </Box>
    </Box>
  );
}
