"use client";
import { List, ListItem, Typography } from "@mui/material";
import { CustomText } from "./custom-text";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants";
interface Props {
  isDirty: boolean;
  hasMinLength: boolean;
  hasNoWhiteSpace: boolean;
  hasOneEspecialCharacter: boolean;
  atLeastOneUppercase: boolean;
}
export function PasswordRules({
  hasMinLength,
  isDirty,
  atLeastOneUppercase,
  hasNoWhiteSpace,
  hasOneEspecialCharacter,
}: Props) {
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
          style={{ display: "flex", gap: "5px" }}
          variant="caption"
          color={
            isDirty
              ? hasOneEspecialCharacter
                ? `${colors.greenSuccess}`
                : "error"
              : "inherit"
          }
        >
          * {t("password-rules:specialCharacter")}
          {hasOneEspecialCharacter && (
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: "20px" }} />
          )}
        </Typography>
        <Typography
          style={{ display: "flex", gap: "5px" }}
          variant="caption"
          color={
            isDirty
              ? atLeastOneUppercase
                ? `${colors.greenSuccess}`
                : "error"
              : "inherit"
          }
        >
          * {t("password-rules:oneUppercase")}
          {atLeastOneUppercase && (
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: "20px" }} />
          )}
        </Typography>
        <Typography
          style={{ display: "flex", gap: "5px" }}
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
          {hasMinLength && (
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: "20px" }} />
          )}
        </Typography>
      </ListItem>
    </List>
  );
}
