import { colors } from "@/constants";
import { TextField } from "@mui/material";
import React from "react";

export type CustomTextFieldProps = React.ComponentProps<typeof TextField>;

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: colors.border,
          },
          "&:hover fieldset": {
            borderColor: colors.border,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.border,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
          },
        },
        ...props.sx,
      }}
    />
  );
};

export { CustomTextField };
