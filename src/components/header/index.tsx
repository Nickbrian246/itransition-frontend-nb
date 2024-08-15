"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { getUser } from "@/store/slices/auth/auth-thunk";
import { getAccessToken } from "@/utils/localstorage/localstorage";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MenuButton from "./components/menu-button";

export default function Header() {
  const { isAuth } = useAppSelector((state) => state.user.user);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = getAccessToken();

    if (token && !isAuth) {
      console.log("entrando");

      dispatch(getUser());
    }
  }, [dispatch, isAuth]);
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
        <Link style={{ textDecoration: "none" }} href={"/"}>
          <Typography variant="h1" sx={{ fontWeight: "800" }}>
            NbDev
          </Typography>
        </Link>
        <ComputerOutlinedIcon sx={{ fontSize: "30px" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: "5px",
            md: "15px",
          },
        }}
      >
        {!isAuth && (
          <>
            <Link style={{ textDecoration: "none" }} href={"/auth/login"}>
              <Typography variant="body1">
                {t("menu-options:signin")}
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} href={"/auth/register"}>
              <Typography variant="body1">
                {t("menu-options:register")}
              </Typography>
            </Link>
          </>
        )}
        <MenuButton />
      </Box>
    </header>
  );
}
