import { Typography, TypographyProps } from "@mui/material";
import { text, colors } from "@/constants";

export type TextKey = keyof typeof text;
export type TextColor = keyof typeof colors;

interface Props extends TypographyProps {
  textSize: TextKey;
  children: React.ReactNode;
  textColor: TextColor;
  style?: React.CSSProperties;
}

export function CustomText({
  textSize,
  children,
  textColor,
  style,
  ...props
}: Props) {
  const textFont = text[textSize];

  return (
    <Typography
      {...props}
      style={{ fontSize: textFont, color: colors[textColor], ...style }}
    >
      {children}
    </Typography>
  );
}
