"use client";
import { CustomIconButton } from "@/components/custom-components";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { setTheme } from "@/store/slices/theme/theme-slice";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

export default function ThemeButton() {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setTheme(theme === "DARK" ? "LIGHT" : "DARK"));
  };

  return (
    <CustomIconButton
      onClick={handleClick}
      sx={{
        borderRadius: "30%",
      }}
      title="change theme "
    >
      {theme === "DARK" ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </CustomIconButton>
  );
}
