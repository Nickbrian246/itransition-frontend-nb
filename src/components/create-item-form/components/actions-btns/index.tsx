"use client";
import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  handleCreateItem: () => void;
  handleClose: () => void;
}
export default function ActionsButtons({
  handleClose,
  handleCreateItem,
}: Props) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={handleCreateItem}
      >
        {" "}
        {t("commons:createItem")}
      </Button>
      <Button
        sx={{ bgcolor: "red" }}
        onClick={() => {
          handleClose();
        }}
        variant="contained"
      >
        {" "}
        {t("commons:cancel")}
      </Button>
    </Box>
  );
}
