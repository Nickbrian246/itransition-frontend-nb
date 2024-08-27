"use client";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { blockUsersByIds } from "./services";
interface Props {
  usersSelected: any[];
  updateUsers: () => void;
}
export default function BlockBtn({ usersSelected, updateUsers }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleBlockBtn = () => {
    blockUsersByIds({ usersIds: usersSelected })
      .then((res) => {
        updateUsers();
        dispatch(
          setGlobalWarning({
            message: t("commons:usersBlocked"),
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
      onClick={handleBlockBtn}
      sx={{ bgcolor: "#fb8c00" }}
      variant="contained"
    >
      {t("commons:block")}
    </Button>
  );
}
