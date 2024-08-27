"use client";
import EmptyContent from "@/components/empty-content";
import { TagWithItems } from "@/entities/tags";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { Locale } from "@/types/types";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getItemsByTagId } from "../_services";
import ItemsCards from "./items";
import Skeleton from "./skeleton";
interface Props {
  slug: string;
  locale: Locale;
}
export default function Items({ slug, locale }: Props) {
  const [tag, setTag] = useState<TagWithItems | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  //TODO SOLUTION MANY TO MANY PROBLEMS
  useEffect(() => {
    getItemsByTagId(slug)
      .then((res) => setTag(res.data))
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
      {isLoading || tag === null ? (
        <Skeleton />
      ) : (
        <ItemsCards locale={locale} tag={tag} />
      )}
      {!isLoading && tag !== null && tag.items.length === 0 && (
        <EmptyContent text={t("commons:noItems")} />
      )}
    </Box>
  );
}
