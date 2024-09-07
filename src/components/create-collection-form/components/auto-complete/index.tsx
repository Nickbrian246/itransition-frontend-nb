import { Categories } from "@/entities/categories";
import React, { useEffect, useState } from "react";
import { GetCategories } from "../services";
import { Autocomplete, TextField } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { categoriesAdapter } from "@/utils/localstorage/auto-complete-adapter";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";

interface Props {
  handleSelectCategory: (
    event: React.SyntheticEvent,
    value: Categories | null
  ) => void;
  categoryId: string | null;
}

export default function AutoComplete({
  handleSelectCategory,
  categoryId,
}: Props) {
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    GetCategories()
      .then((res) => {
        const a = categoriesAdapter(res.data).concat({
          label: t("commons:other"),
          name: "other",
          id: "other11",
        });
        setCategories(a);
      })
      .catch((err) => {
        dispatch(
          setGlobalWarning({
            message: `${err}`,
            severity: "error",
          })
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading || categories === null ? (
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      ) : (
        <Autocomplete
          onChange={handleSelectCategory}
          disablePortal
          id="combo-box-demo"
          options={categories}
          defaultValue={
            categoryId
              ? categories.find((c) => c.id === categoryId)
              : categories[0]
          }
          sx={{ width: { xs: "200px", md: "300px" } }}
          renderInput={(params) => (
            <TextField {...params} label={t("commons:categories")} />
          )}
        />
      )}
    </>
  );
}
