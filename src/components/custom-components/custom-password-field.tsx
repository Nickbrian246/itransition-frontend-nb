import { colors } from "@/constants";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { CustomTextFieldProps } from "./custom-text-field";
import { VisibilityOff, Visibility } from "@mui/icons-material";
interface Props extends CustomTextFieldProps {
  hidePassword: boolean;
  handleShowPassword: () => void;
  handleOnMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const CustomPasswordField: React.FC<Props> = ({
  hidePassword,
  handleOnMouseDown,
  handleShowPassword,
  ...props
}) => {
  return (
    <TextField
      {...props}
      type={hidePassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              onMouseDown={handleOnMouseDown}
              edge="end"
            >
              {hidePassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
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

export { CustomPasswordField };
