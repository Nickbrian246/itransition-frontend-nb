import { Button, ButtonProps } from "@mui/material";
import { text } from "@/constants";

type TextSize = keyof typeof text;
interface Props extends ButtonProps {
  children: React.ReactNode;
  textSize: TextSize;
}
export function CustomButton({ children, textSize, ...props }: Props) {
  return (
    <Button {...props} style={{ fontSize: text[textSize], fontWeight: "bold" }}>
      {children}
    </Button>
  );
}
