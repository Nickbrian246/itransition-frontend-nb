"use client";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { unLockUsersByIds } from "./services";
import { useTranslation } from "react-i18next";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function UnLockBtn({ usersSelected, updateUsers }: Props) {
  const { t } = useTranslation();

  const handleBlockBtn = () => {
    unLockUsersByIds({ usersIds: usersSelected })
      .then((res) => {
        updateUsers();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button
      disabled={usersSelected.length === 0}
      onClick={handleBlockBtn}
      sx={{ bgcolor: "#43a047" }}
      variant="contained"
    >
      {t("commons:unLock")}
    </Button>
  );
}
