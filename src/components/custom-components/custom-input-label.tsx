import { InputLabel, InputLabelProps } from "@mui/material";
import { colors, text } from "@/constants";
import { TextColor, TextKey } from "./custom-text";
interface Props extends InputLabelProps {
  children: string;
  textColor?: TextColor;
  textSize?: TextKey;
}
export function CustomInputLabel({
  children,
  textColor,
  textSize,
  ...props
}: Props) {
  return (
    <InputLabel
      {...props}
      style={{
        fontSize: textSize ? textSize : text.textSm,
        color: textColor ? textColor : colors.textBlue,
      }}
    >
      {children}
    </InputLabel>
  );
}
