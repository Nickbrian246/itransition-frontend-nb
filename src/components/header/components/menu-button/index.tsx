"use client";
import { colors } from "@/constants";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux/redux";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { cleanAuth } from "@/store/slices/auth/auth-slice";
import { clearAccessToken } from "@/utils/localstorage/localstorage";
import ThemeButton from "../theme-button";
import { StyledMenu } from "./components/styled-menu";
import ChangeLanguage from "../language-button";
import { useTranslation } from "react-i18next";

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);
  const { isAuth } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const languageMenuOpen = Boolean(languageMenuAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(cleanAuth());
    clearAccessToken();
  };

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };

  const bg =
    theme === "DARK" ? colors.backGroundDarkModeGrayBox : colors.backGroundGray;

  return (
    <div>
      <Button
        sx={{ bgcolor: `${bg}`, borderRadius: "30%" }}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        title={t("menu-options:menu")}
      >
        <MenuOutlinedIcon />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isAuth && (
          <>
            <MenuItem onClick={handleClose} disableRipple>
              <PersonOutlineOutlinedIcon />
              {t("menu-options:myProfile")}
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <ImportContactsOutlinedIcon />
              {t("menu-options:myCollections")}
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </>
        )}
        <MenuItem onClick={handleLanguageClick} disableRipple>
          <LanguageOutlinedIcon />
          {t("menu-options:changeLanguage")}
        </MenuItem>
        <ThemeButton handleClose={handleClose} />
        {isAuth && (
          <>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogOut();
              }}
              disableRipple
            >
              <LoginOutlinedIcon />
              {t("menu-options:logout")}
            </MenuItem>
          </>
        )}
      </StyledMenu>

      <ChangeLanguage
        languageMenuAnchorEl={languageMenuAnchorEl}
        languageMenuOpen={languageMenuOpen}
        handleLanguageMenuClose={handleLanguageMenuClose}
      />
    </div>
  );
}
