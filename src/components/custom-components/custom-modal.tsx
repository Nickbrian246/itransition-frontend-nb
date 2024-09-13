import { Box, Modal, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  childrenContainerCustomStyles?: SxProps;
}
export default function CustomModal({
  children,
  handleClose,
  open,
  childrenContainerCustomStyles,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px",
          width: "100%",
          maxWidth: "900px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
          ...childrenContainerCustomStyles,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
