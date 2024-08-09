import { Button, ButtonProps } from "@mui/material";
import { text } from "@/constants";

type TextSize = keyof typeof text;
interface Props extends ButtonProps {
  children: React.ReactNode;
}
export function CustomButton({ children, ...props }: Props) {
  return <Button {...props}>{children}</Button>;
}
