import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CustomModal from "../custom-components/custom-modal";
import { useTranslation } from "react-i18next";

interface Props {
  handleIsEditable: () => void;
  handleDelete: () => void;
}
export default function UserOptions({ handleDelete, handleIsEditable }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const { t } = useTranslation();
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
          {t("commons:edit")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmModal(true);
            handleClose();
          }}
        >
          {t("commons:delete")}
        </MenuItem>
      </Menu>
      <CustomModal
        open={openConfirmModal}
        handleClose={() => {
          setOpenConfirmModal(false);
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography variant="h5">{t("commons:confirmDeletion")}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                handleDelete();
                setOpenConfirmModal(false);
              }}
              sx={{ maxWidth: "300px" }}
              variant="contained"
            >
              {t("commons:confirm")}
            </Button>
            <Button
              onClick={() => setOpenConfirmModal(false)}
              sx={{ bgcolor: "red", maxWidth: "300px" }}
              variant="contained"
            >
              {t("commons:cancel")}
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </div>
  );
}
