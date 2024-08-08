"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/constants";
export default function ClientComponent({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });

  return (
    <section>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </section>
  );
}
