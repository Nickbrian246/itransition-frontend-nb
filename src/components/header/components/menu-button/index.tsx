"use client";
import { colors } from "@/constants";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux/redux";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { StyledMenu } from "./components/styled-menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { cleanAuth } from "@/store/slices/auth/auth-slice";
import { clearAccessToken } from "@/utils/localstorage/localstorage";

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(cleanAuth());
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
        <MenuItem onClick={handleClose} disableRipple>
          <PersonOutlineOutlinedIcon />
          My profile
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ImportContactsOutlinedIcon />
          My collections
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogOut();
            clearAccessToken();
          }}
          disableRipple
        >
          <LoginOutlinedIcon />
          Log out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
