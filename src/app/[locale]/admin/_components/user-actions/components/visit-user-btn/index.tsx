"use client";
import { getUserById } from "@/app/[locale]/my-collections/_services";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  usersSelected: any[];
}
export default function VisitUserBtn({ usersSelected }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClick = async () => {
    try {
      const {
        data: { firstName },
      } = await getUserById(usersSelected[0]);
      router.push(`/my-collections/${usersSelected[0]}?name=${firstName}`);
    } catch (error) {
      dispatch(
        setGlobalWarning({
          message: `${error}`,
          severity: "error",
        })
      );
    }
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
