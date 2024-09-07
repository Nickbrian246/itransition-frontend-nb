import { colors } from "@/constants";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button, Typography } from "@mui/material";
export default function GithubAuthBtn() {
  const signinBtn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/github-signin`;
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
      <GitHubIcon sx={{ color: "black" }} />
      <Typography
        variant="caption"
        sx={{ color: "#212121", textTransform: "none", fontWeight: "bold" }}
      >
        {" "}
        GitHub
      </Typography>
    </Button>
  );
}
