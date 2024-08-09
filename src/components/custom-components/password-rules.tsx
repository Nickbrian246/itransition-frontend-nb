"use client";
import { List, ListItem, Typography } from "@mui/material";
import { CustomText } from "./custom-text";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants";
interface Props {
  isDirty: boolean;
  hasMinLength: boolean;
}
export function PasswordRules({ hasMinLength, isDirty }: Props) {
  const { t } = useTranslation();
  return (
    <List component="div" sx={{ display: "flex " }}>
      <ListItem
        sx={{
          padding: "0px",
          gap: "3px",
          display: "flex",
          flexDirection: "column",
          alignItems: "self-start",
        }}
      >
        <Typography
          style={{ display: "flex", gap: "10px" }}
          variant="caption"
          color={
            isDirty
              ? hasMinLength
                ? `${colors.greenSuccess}`
                : "error"
              : "inherit"
          }
        >
          * {t("password-rules:lengthMin")}
          {hasMinLength && <CheckCircleOutlineIcon color="success" />}
        </Typography>
        <Typography
          style={{ display: "flex", gap: "10px" }}
          variant="caption"
          color={
            isDirty
              ? hasMinLength
                ? `${colors.greenSuccess}`
                : "error"
              : "inherit"
          }
        >
          * {t("password-rules:oneUppercase")}
          {hasMinLength && <CheckCircleOutlineIcon color="success" />}
        </Typography>
        <Typography
          style={{ display: "flex", gap: "10px" }}
          variant="caption"
          color={
            isDirty
              ? hasMinLength
                ? `${colors.greenSuccess}`
                : "error"
              : "inherit"
          }
        >
          * {t("password-rules:specialCharacter")}
          {hasMinLength && <CheckCircleOutlineIcon color="success" />}
        </Typography>
      </ListItem>
    </List>
  );
}
