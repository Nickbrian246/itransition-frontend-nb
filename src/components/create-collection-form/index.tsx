import { Box, TextField, Autocomplete, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { CustomInputLabel } from "../custom-components";
import { CreateCollection } from "./interfaces";
import AutoComplete from "./components/auto-complete";
import CustomFields from "./components/custom-fields";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px",
  width: "100%",
  maxWidth: "900px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function CreateCollectionForm() {
  const [collectionData, setCreateCollectionData] = useState<
    Omit<CreateCollection, "categories">
  >({
    description: "",
    name: "",
  });
  const [categories, setCategories] = useState<string[]>([""]);
  const { t } = useTranslation();

  const handleNameAndDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setCreateCollectionData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Box
      sx={{ ...style, display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Typography align="center" variant="h6">
        {t("commons:createCollection")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CustomInputLabel htmlFor="collectionName">
          {t("commons:name")}
        </CustomInputLabel>
        <TextField
          onChange={handleNameAndDescription}
          id="collectionName"
          placeholder={t("commons:collectionName")}
          value={collectionData["name"]}
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CustomInputLabel htmlFor="collectionName">
          {t("commons:description")}
        </CustomInputLabel>
        <TextField
          fullWidth
          onChange={handleNameAndDescription}
          id="collectionName"
          placeholder={t("commons:description")}
          value={collectionData["description"]}
        />
      </Box>
      <AutoComplete />
      <CustomFields />
    </Box>
  );
}
