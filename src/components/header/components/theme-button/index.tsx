"use client";
import { CustomIconButton } from "@/components/custom-components";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { saveUserPreference } from "@/store/slices/auth/auth-thunk";
import { setTheme } from "@/store/slices/theme/theme-slice";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

interface Props {
  handleClose: () => void;
}
export default function ThemeButton({ handleClose }: Props) {
  const { t } = useTranslation();
  const theme = useAppSelector((state) => state.theme.theme);
  const { locale } = useAppSelector((state) => state.locale);
  const {
    user: { isAuth },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setTheme(theme === "DARK" ? "LIGHT" : "DARK"));
    if (isAuth) {
      dispatch(
        saveUserPreference({
          language: locale,
          theme: theme === "DARK" ? "LIGHT" : "DARK",
        })
      );
    }
  };

  return (
    <MenuItem
      onClick={() => {
        handleClick();
        handleClose();
      }}
      title="change theme "
    >
      {theme === "DARK" ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
      {theme === "DARK"
        ? t("menu-options:lightMode")
        : t("menu-options:darkMode")}
    </MenuItem>
  );
}
