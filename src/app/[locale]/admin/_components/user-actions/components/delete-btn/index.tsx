"use client";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { deleteUsersByIds } from "./services";
import { useTranslation } from "react-i18next";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function DeleteBtn({ usersSelected, updateUsers }: Props) {
  const { t } = useTranslation();

  // const handleBlockBtn = () => {
  //   deleteUsersByIds()
  //     .then((res) => {})
  //     .catch((err) => console.log(err));
  // };
  return (
    <Button
      disabled={usersSelected.length === 0}
      sx={{ bgcolor: "#d50000" }}
      variant="contained"
    >
      {t("commons:delete")}
    </Button>
  );
}
