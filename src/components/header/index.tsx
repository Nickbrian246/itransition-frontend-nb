"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { getUser } from "@/store/slices/auth/auth-thunk";
import {
  getAccessToken,
  setAccessToken,
} from "@/utils/localstorage/localstorage";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MenuButton from "./components/menu-button";
import { Locale } from "@/types/types";
import { setLocale } from "@/store/slices/current-locale";
import TextSearch from "../text-search";
import GlobalWarning from "../global-warning";
import { disableGlobalWarning } from "@/store/slices/global-warning/slice";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  locale: Locale;
}
export default function Header({ locale }: Props) {
  const { isAuth } = useAppSelector((state) => state.user.user);
  const params = useSearchParams();
  const router = useRouter();
  const accessToken = params.get("access_token");
  const { isActive, message, severity } = useAppSelector(
    (state) => state.globalWarning
  );

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      dispatch(getUser(token));
    }
  }, [isAuth]);

  useEffect(() => {
    if (locale) {
      dispatch(setLocale(locale));
    }
  }, [locale, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(disableGlobalWarning());
    }, 3000);

    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
      router.replace("/");
    }
  }, [accessToken]);

  return (
    <header
      style={{
        display: "flex",
        width: "100%",
        padding: "10px",
        gap: "5px",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {isActive && (
        <GlobalWarning
          sx={{
            bottom: "-100px",
          }}
          message={message}
          severity={severity}
        />
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link style={{ textDecoration: "none" }} href={"/"}>
          <Typography variant="h1" sx={{ fontWeight: "800" }}>
            NbDev
          </Typography>
        </Link>
        <ComputerOutlinedIcon sx={{ fontSize: "30px" }} />
      </Box>
      <TextSearch />
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
