import { colors } from "@/constants";
import Button from "@mui/material/Button";
import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { CustomIconButton } from "@/components/custom-components";
export default function ChangeLanguageButton() {
  return (
    <CustomIconButton
      sx={{
        borderRadius: "30%",
      }}
      title="change language"
    >
      <LanguageOutlinedIcon />
    </CustomIconButton>
  );
}
