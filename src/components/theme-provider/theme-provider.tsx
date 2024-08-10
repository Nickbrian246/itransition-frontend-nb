"use client";
import React, { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "../../constants";
import { useAppSelector } from "@/hooks/use-redux/redux";
export default function ThemeProvider({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const currentTheme = useAppSelector((state) => state.theme.theme);

  const theme = currentTheme === "DARK" ? darkTheme : lightTheme;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
