import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import CustomContainer from "../custom-components/custom-container";
export default function EmptyContent({ text }: { text: string }) {
  return (
    <CustomContainer
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 0px",
        gap: "10px",
        mt: "50px",
      }}
    >
      <SentimentDissatisfiedOutlinedIcon />
      <Typography variant="h6">{text}</Typography>
    </CustomContainer>
  );
}
