"use client";
import { CustomInputLabel } from "@/components/custom-components";
import CustomTextArea from "@/components/custom-components/custom-text-area";
import { Box, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import MarkDownDescription from "../mark-down-description";
import { useTranslation } from "react-i18next";
import { CollectionDataFrom } from "../../interfaces";
interface Props {
  errors: Record<string, string>;
  collectionData: CollectionDataFrom;
  handleDescription: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function Description({
  collectionData,
  errors,
  handleDescription,
}: Props) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomInputLabel htmlFor="collectionName">
        {t("commons:description")}
      </CustomInputLabel>
      <CustomTextArea
        name="description"
        onChange={handleDescription}
        id="collectionName"
        placeholder={t("commons:description")}
        value={collectionData["description"]}
      />
      {errors["description"] && (
        <Typography sx={{ color: "#ff9800" }} variant="caption">
          {errors["description"]}
        </Typography>
      )}
      <MarkDownDescription text={collectionData["description"]} />
    </Box>
  );
}
