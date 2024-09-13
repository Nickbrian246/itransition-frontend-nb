"use client";
import { CustomInputLabel } from "@/components/custom-components";
import { Box, TextField, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { CollectionDataFrom } from "../../interfaces";

interface Props {
  errors: Record<string, string>;
  collectionData: CollectionDataFrom;
  handleName: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function NameField({
  collectionData,
  errors,
  handleName,
}: Props) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomInputLabel htmlFor="collectionName">
        {t("commons:name")}
      </CustomInputLabel>
      <TextField
        onChange={handleName}
        id="collectionName"
        name="name"
        placeholder={t("commons:collectionName")}
        value={collectionData["name"]}
        fullWidth
      />
      {errors["name"] && (
        <Typography sx={{ color: "#ff9800" }} variant="caption">
          {errors["name"]}
        </Typography>
      )}
    </Box>
  );
}
