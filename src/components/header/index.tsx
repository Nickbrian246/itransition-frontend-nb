"use client";
import { Box, Typography } from "@mui/material";
import ThemeButton from "./components/theme-button";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import ChangeLanguageButton from "./components/language-button";
import MenuButton from "./components/menu-button";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        width: "100%",
        padding: "10px",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography variant="h1" sx={{ fontWeight: "800" }}>
          NbDev
        </Typography>
        <ComputerOutlinedIcon sx={{ fontSize: "30px" }} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <ThemeButton />
        <ChangeLanguageButton />
        <MenuButton />
      </Box>
    </header>
  );
}
