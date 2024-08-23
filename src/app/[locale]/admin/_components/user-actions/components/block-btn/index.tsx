"use client";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { blockUsersByIds } from "./services";
import { useTranslation } from "react-i18next";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function BlockBtn({ usersSelected, updateUsers }: Props) {
  const { t } = useTranslation();
  const handleBlockBtn = () => {
    blockUsersByIds({ usersIds: usersSelected })
      .then((res) => {
        updateUsers();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button
      disabled={usersSelected.length === 0}
      onClick={handleBlockBtn}
      sx={{ bgcolor: "#fb8c00" }}
      variant="contained"
    >
      {t("commons:block")}
    </Button>
  );
}
