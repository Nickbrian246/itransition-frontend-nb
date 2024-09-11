"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { saveUserPreference } from "@/store/slices/auth/auth-thunk";
import { setLocale } from "@/store/slices/current-locale";
import { setTheme } from "@/store/slices/theme/theme-slice";
import { Locale } from "@/types/types";
import { getUserPreferencesInLocalStorage } from "@/utils/localstorage/localstorage";
import { MenuItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../../../../i18nConfig";
import { StyledMenu } from "../menu-button/components/styled-menu";

interface Props {
  languageMenuAnchorEl: null | HTMLElement;
  languageMenuOpen: boolean;
  handleLanguageMenuClose: (event: Event | React.SyntheticEvent) => void;
}

export default function ChangeLanguage({
  handleLanguageMenuClose,
  languageMenuAnchorEl,
  languageMenuOpen,
}: Props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);
  const { locale } = useAppSelector((state) => state.locale);

  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  useEffect(() => {
    const userPref = getUserPreferencesInLocalStorage();

    if (userPref) {
      dispatch(setTheme(userPref.theme));
      dispatch(setLocale(userPref.language));
    }
    // if (isAuth && userPref) {
    //   dispatch(setLocale(userPref.language));
    //   handleSelectLanguage(userPref.language);
    // }
  }, [locale]);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleSelectLanguage = (value: Locale) => {
    const newLocale = value as Locale;
    dispatch(saveUserPreference({ language: newLocale, theme: theme }));
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <StyledMenu
      id="language-menu"
      anchorEl={languageMenuAnchorEl}
      open={languageMenuOpen}
      onClose={handleLanguageMenuClose}
      MenuListProps={{
        "aria-labelledby": "language-button",
      }}
    >
      <MenuItem
        onClick={() => {
          handleClose;
          handleSelectLanguage("en");
        }}
      >
        {t("menu-options:english")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose;
          handleSelectLanguage("es");
        }}
      >
        {t("menu-options:spanish")}
      </MenuItem>
    </StyledMenu>
  );
}
