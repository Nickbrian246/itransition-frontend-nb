import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";

interface Props {
  handleIsEditable: () => void;
  handleDelete: () => void;
}
export default function UserOptions({ handleDelete, handleIsEditable }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleIsEditable();
            handleClose();
          }}
        >
          editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          eliminar
        </MenuItem>
      </Menu>
    </div>
  );
}
