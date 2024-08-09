import { colors } from "@/constants";
import { TextField } from "@mui/material";
import React from "react";

export type CustomTextFieldProps = React.ComponentProps<typeof TextField>;

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      sx={{
        ...props.sx,
      }}
    />
  );
};

export { CustomTextField };
