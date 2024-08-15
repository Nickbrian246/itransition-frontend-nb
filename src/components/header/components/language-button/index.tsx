"use client";
import { colors } from "@/constants";
import React, { useEffect, useRef, useState } from "react";

import { useAppSelector } from "@/hooks/use-redux/redux";
import { MenuItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
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
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleSelectLanguage = (value: string) => {
    const newLocale = value;

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

  const bg =
    theme === "DARK" ? colors.backGroundDarkModeGrayBox : colors.backGroundGray;
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
        English
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose;
          handleSelectLanguage("es");
        }}
      >
        Spanish
      </MenuItem>
    </StyledMenu>
  );
}
