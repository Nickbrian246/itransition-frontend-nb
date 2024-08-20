"use client";
import { CustomInputLabel } from "@/components/custom-components";
import { Box, TextField, Button } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { CreateNewCategory } from "../../services";
import { Categories } from "@/entities/categories";
import { useTranslation } from "react-i18next";
interface Props {
  updateCategories?: () => {};
  newCategoryCreated: (category: Categories) => void;
  handleCancel: () => void;
}
export default function CreateCustomCategory({
  newCategoryCreated,
  updateCategories,
  handleCancel,
}: Props) {
  const [newCategory, setNewCategory] = useState<string>("");
  const { t } = useTranslation();

  const handleNewCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleCreateNewCategory = () => {
    CreateNewCategory(newCategory)
      .then((res) => {
        newCategoryCreated(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box>
        <CustomInputLabel htmlFor="addNewTag" variant="standard">
          {t("commons:addNewCategory")}
        </CustomInputLabel>
        <TextField
          id="addNewTag"
          onChange={handleNewCategory}
          placeholder={t("commons:addNewCategory")}
        />
      </Box>
      <Button
        disabled={newCategory.length < 1}
        onClick={handleCreateNewCategory}
        variant="contained"
      >
        {t("commons:addCategory")}
      </Button>
      <Button onClick={handleCancel} variant="contained">
        {t("commons:cancel")}
      </Button>
    </Box>
  );
}
