import { Button, ButtonProps, SxProps } from "@mui/material";
import { colors, text } from "@/constants";
import { useAppSelector } from "@/hooks/use-redux/redux";

interface Props extends ButtonProps {
  children: React.ReactNode;
  sx?: SxProps;
}
export function CustomIconButton({ children, sx, ...rest }: Props) {
  const theme = useAppSelector((state) => state.theme.theme);

  const bg =
    theme === "DARK" ? colors.backGroundDarkModeGrayBox : colors.backGroundGray;
  return (
    <Button {...rest} sx={{ background: `${bg}`, ...sx }}>
      {children}
    </Button>
  );
}
