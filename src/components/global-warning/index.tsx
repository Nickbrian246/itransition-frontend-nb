import { Box, colors, SxProps } from "@mui/material";
import React from "react";
import { Severity } from "@/types/types";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import CustomContainer from "../custom-components/custom-container";
import { GlobalWarningState } from "@/store/slices/global-warning/slice";
interface Props extends Omit<GlobalWarningState, "isActive"> {
  sx?: SxProps;
}
export default function GlobalWarning({ message, severity, sx }: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "98%",
        margin: "auto",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "100",
        ...sx,
      }}
    >
      <CustomContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          border: `2px solid`,
          padding: "30px",
          borderRadius: "10px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {severity === "success" ? (
          <CheckCircleOutlinedIcon
            sx={{ fontSize: "30px", color: "#4caf50" }}
          />
        ) : (
          <WarningOutlinedIcon sx={{ fontSize: "30px", color: "#ffc107" }} />
        )}
        {message}
      </CustomContainer>
    </Box>
  );
}
