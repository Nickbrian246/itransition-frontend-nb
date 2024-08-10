"use client";
import { colors } from "@/constants";
import { useAppSelector } from "@/hooks/use-redux/redux";
import { Box, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sx: SxProps;
}
export default function CustomContainer({ children, sx }: Props) {
  const theme = useAppSelector((state) => state.theme.theme);

  const bgGround = theme === "DARK" ? colors.backGroundDarkModeGrayBox : null;
  const border = theme === "LIGHT" ? `1px solid ${colors.border}` : null;
  return (
    <Box sx={{ background: `${bgGround}`, border: `${border}`, ...sx }}>
      {children}
    </Box>
  );
}
