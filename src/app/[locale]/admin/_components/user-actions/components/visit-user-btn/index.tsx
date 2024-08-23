"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  usersSelected: any[];
}
export default function VisitUserBtn({ usersSelected }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    router.push(`/my-collections/${usersSelected[0]}`);
  };
  return (
    <Button
      onClick={handleClick}
      disabled={!(usersSelected.length > 0 && usersSelected.length < 2)}
      sx={{ bgcolor: "#1565c0" }}
      variant="contained"
    >
      {t("commons:visitUserCollections")}
    </Button>
  );
}
