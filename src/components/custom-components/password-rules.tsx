"use client";
import { List, ListItem } from "@mui/material";
import { CustomText } from "./custom-text";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";
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
        <CustomText
          style={{ display: "flex", gap: "10px" }}
          textSize="textSm"
          textColor={
            isDirty ? (hasMinLength ? "greenSuccess" : "redAlert") : "textBlue"
          }
        >
          * {t("password-rules:lengthMin")}
          {hasMinLength && <CheckCircleOutlineIcon color="success" />}
        </CustomText>
        <CustomText
          style={{ display: "flex", gap: "10px" }}
          textSize="textSm"
          textColor={
            isDirty ? (hasMinLength ? "greenSuccess" : "redAlert") : "textBlue"
          }
        >
          * {t("password-rules:oneUppercase")}
          {hasMinLength && <CheckCircleOutlineIcon color="success" />}
        </CustomText>
        <CustomText
          style={{ display: "flex", gap: "10px" }}
          textSize="textSm"
          textColor={
            isDirty ? (hasMinLength ? "greenSuccess" : "redAlert") : "textBlue"
          }
        >
          * {t("password-rules:specialCharacter")}
          {hasMinLength && <CheckCircleOutlineIcon color="success" />}
        </CustomText>
      </ListItem>
    </List>
  );
}
