"use client";
import { CustomInputLabel } from "@/components/custom-components";
import { Box, TextField, Button } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { createTag } from "./services";
import { Tag } from "@/entities/tags";
import { useTranslation } from "react-i18next";

interface Props {
  AddNewTag: (tag: Tag) => void;
}
export default function AddNewTag({ AddNewTag }: Props) {
  const [newTag, setNewTag] = useState<string>("");
  const { t } = useTranslation();

  const handleAddNewTag = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleCreateTag = () => {
    createTag(newTag)
      .then((res) => AddNewTag(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box>
        <CustomInputLabel htmlFor="addNewTag" variant="standard">
          {t("commons:addTags")}
        </CustomInputLabel>
        <TextField
          id="addNewTag"
          onChange={handleAddNewTag}
          placeholder={t("commons:addNewTag")}
        />
      </Box>
      <Button
        disabled={newTag.length < 1}
        onClick={handleCreateTag}
        variant="contained"
      >
        {t("commons:addTag")}
      </Button>
    </Box>
  );
}
