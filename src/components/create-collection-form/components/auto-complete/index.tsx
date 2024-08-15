import { Categories } from "@/entities/categories";
import React, { useEffect, useState } from "react";
import { GetCategories } from "../services";
import { Autocomplete, TextField } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { categoriesAdapter } from "@/utils/localstorage/auto-complete-adapter";
import { useTranslation } from "react-i18next";

export default function AutoComplete() {
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    GetCategories()
      .then((res) => {
        const a = categoriesAdapter(res.data);
        setCategories(a);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      {isLoading || categories === null ? (
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      ) : (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          defaultValue={categories[0]}
          sx={{ width: { xs: "200px", md: "300px" } }}
          renderInput={(params) => (
            <TextField {...params} label={t("commons:categories")} />
          )}
        />
      )}
    </>
  );
}
