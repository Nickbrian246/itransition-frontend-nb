import { Button, Typography } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { colors } from "@/constants";
export default function GoogleAuthBtn() {
  const signinBtn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google-signin`;
  };
  return (
    <Button
      variant="contained"
      onClick={signinBtn}
      sx={{
        display: "flex",
        gap: "10px",
        bgcolor: "white",
        "&:hover": {
          bgcolor: colors.backGroundGray,
        },
      }}
    >
      {" "}
      <GoogleIcon sx={{ color: "black" }} />
      <Typography
        variant="caption"
        sx={{ color: "#ff9100", textTransform: "none", fontWeight: "bold" }}
      >
        {" "}
        Google
      </Typography>
    </Button>
  );
}
