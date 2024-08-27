"use client";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { unLockUsersByIds } from "./services";
import { useTranslation } from "react-i18next";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/use-redux/redux";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function UnLockBtn({ usersSelected, updateUsers }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleUnlock = () => {
    unLockUsersByIds({ usersIds: usersSelected })
      .then((res) => {
        updateUsers();
        dispatch(
          setGlobalWarning({
            message: `users ${t(`commons:unLock`)}`,
            severity: "success",
          })
        );
      })
      .catch((err: ErrorResponse<string>) => {
        dispatch(
          setGlobalWarning({
            message: t(`errors:${err.message}`),
            severity: "error",
          })
        );
        if (
          errorsRedirectToHome[err.message as keyof typeof errorsRedirectToHome]
        ) {
          router.replace("/");
        }
      });
  };
  return (
    <Button
      disabled={usersSelected.length === 0}
      onClick={handleUnlock}
      sx={{ bgcolor: "#43a047" }}
      variant="contained"
    >
      {t("commons:unLock")}
    </Button>
  );
}
