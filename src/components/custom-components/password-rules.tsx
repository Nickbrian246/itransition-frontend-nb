"use client";
import { List, ListItem, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";
import { colors } from "@/constants";
interface Props {
  isDirty: boolean;
  hasMinLength: boolean;
  hasNoWhiteSpace: boolean;
  hasOneEspecialCharacter: boolean;
  atLeastOneUppercase: boolean;
  atLeastOneNumber: boolean;
}
export function PasswordRules({
  hasMinLength,
  isDirty,
  atLeastOneUppercase,
  hasOneEspecialCharacter,
  atLeastOneNumber,
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
            <CheckCircleOutlineIcon sx={{ fontSize: "20px", color: "green" }} />
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
            <CheckCircleOutlineIcon sx={{ fontSize: "20px", color: "green" }} />
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
            <CheckCircleOutlineIcon sx={{ fontSize: "20px", color: "green" }} />
          )}
        </Typography>
        <Typography
          style={{ display: "flex", gap: "5px" }}
          variant="caption"
          color={
            isDirty
              ? atLeastOneNumber
                ? `${colors.greenSuccess}`
                : "error"
              : "inherit"
          }
        >
          * {t("password-rules:atLeastOneNumber")}
          {hasMinLength && (
            <CheckCircleOutlineIcon sx={{ fontSize: "20px", color: "green" }} />
          )}
        </Typography>
      </ListItem>
    </List>
  );
}
