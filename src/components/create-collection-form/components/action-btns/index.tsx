"use client";
import { Box, Button } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { CollectionDataFrom } from "../../interfaces";
import { useTranslation } from "react-i18next";

interface Props {
  isEditable: boolean;
  handleEditCollection: () => void;
  collectionData: CollectionDataFrom;
  handleCrateCollection: () => void;
  handleCLoseModal: () => void;
}
export default function ActionsButtons({
  collectionData,
  handleCLoseModal,
  handleCrateCollection,
  handleEditCollection,
  isEditable,
}: Props) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {isEditable ? (
        <Button onClick={handleEditCollection} variant="contained">
          {" "}
          {t("commons:saveChanges")}
        </Button>
      ) : (
        <Button onClick={handleCrateCollection} variant="contained">
          {" "}
          {t("commons:createCollection")}
        </Button>
      )}
      <Button
        sx={{ bgcolor: "red" }}
        onClick={() => {
          handleCLoseModal();
        }}
        variant="contained"
      >
        {" "}
        {t("commons:cancel")}
      </Button>
    </Box>
  );
}
