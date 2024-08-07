import Link from "next/link";
import { LinkProps } from "next/link";
import { Typography } from "@mui/material";
import { colors, text } from "@/constants";
interface Props extends LinkProps {
  children: string;
}
export function CustomLink({ href, children, ...props }: Props) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        alignSelf: "center",
        marginTop: "10px",
      }}
      {...props}
    >
      <Typography
        style={{
          fontSize: text.textSm,
          color: colors.textBlue,
        }}
        variant="caption"
      >
        {children}
      </Typography>
    </Link>
  );
}
