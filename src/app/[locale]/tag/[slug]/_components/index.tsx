"use client";
import EmptyContent from "@/components/empty-content";
import { Item } from "@/entities/item";
import { Tag } from "@/entities/tags";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { Locale } from "@/types/types";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getItemsByTagId, getTagById } from "../_services";
import ItemsCards from "./items";
import Skeleton from "./skeleton";
interface Props {
  slug: string;
  locale: Locale;
}
export default function Items({ slug, locale }: Props) {
  const [tag, setTag] = useState<Tag>();
  const [items, setItems] = useState<Item[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getItemsByTagId(slug)
      .then((res) => setItems(res.data.map((i) => i.item)))
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

    getTagById(slug)
      .then((res) => setTag(res.data))
      .catch((err) =>
        dispatch(
          setGlobalWarning({
            message: `${err}`,
            severity: "error",
          })
        )
      );
  }, [slug]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {isLoading || tag === null || items === undefined ? (
        <Skeleton />
      ) : (
        <ItemsCards locale={locale} items={items} tagName={tag?.name ?? ""} />
      )}
      {!isLoading && tag !== null && items?.length === 0 && (
        <EmptyContent text={t("commons:noItems")} />
      )}
    </Box>
  );
}
