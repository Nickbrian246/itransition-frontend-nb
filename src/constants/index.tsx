import { createTheme } from "@mui/material";

export const colors = {
  black: "#0D141C",
  main: "#f9fbfc",
  blue: "#1A80E5",
  textBlue: "#4F7396",
  textBlack: "#0e141b",
  textBlueBolder: "#4e7397",
  border: "#D1DBE8",
  redAlert: "#d50000",
  greenSuccess: "#43a047",
  white: "#FFFFFF",
  mainDarkMode: "#242424",
  backGroundDarkModeGrayBox: "#242424",
  textGrayDarkMode: "#999999",
  textWhiteDarkMode: "#FFFFFF",
  backGroundGray: "#e8edf4",
  textErrorDarkMode: "#ef6c00",
};

export const text = {
  titleLg: "32px",
  titleMd: "28px",
  titleSm: "24px",

  textLg: "18px",
  textMd: "16px",
  textSm: "14px",

  bodyLg: "16px",
  bodyMd: "14px",
  bodySm: "12px",

  captionLg: "14px",
  captionMd: "12px",
  captionSm: "10px",
};
export const iconSizes = {
  iconLg: "24px",
  iconMd: "20px",
  iconSm: "16px",
};
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: colors.black,
    },
    secondary: {
      main: colors.black,
    },
    error: {
      main: colors.redAlert,
    },
    success: {
      main: colors.greenSuccess,
    },
    background: {
      default: colors.main,
      paper: colors.white,
    },
    text: {
      primary: colors.textBlack,
      secondary: colors.textBlue,
    },
    divider: colors.border,
  },
  typography: {
    allVariants: {
      color: colors.textBlue,
    },
    h1: {
      fontSize: text.titleLg,
      color: colors.black,
      "@media (max-width: 960px)": {
        fontSize: text.titleMd,
        color: colors.black,
      },
      "@media (max-width: 600px)": {
        fontSize: text.titleSm,
        color: colors.black,
      },
    },
    h5: {
      color: colors.black,
      fontWeight: "600",
    },
    body1: {
      fontSize: text.textLg,
      color: colors.black,
      "@media (max-width: 960px)": {
        fontSize: text.bodyMd,
        color: colors.black,
      },
      "@media (max-width: 600px)": {
        fontSize: text.bodySm,
        color: colors.black,
      },
    },
    body2: {
      fontSize: text.textMd,
      color: colors.black,
      "@media (max-width: 960px)": {
        fontSize: text.textMd,
      },
      "@media (max-width: 600px)": {
        fontSize: text.textSm,
      },
    },
    subtitle1: {
      fontSize: text.captionLg,
      color: colors.black,
      fontWeight: "500",
      "@media (max-width: 960px)": {
        fontSize: text.captionMd,
        color: colors.black,
        fontWeight: "500",
      },
      "@media (max-width: 600px)": {
        fontSize: text.captionSm,
        color: colors.black,
        fontWeight: "500",
      },
    },
    subtitle2: {
      fontSize: text.bodyLg,
      color: colors.textBlue,
      fontWeight: "500",
      "@media (max-width: 960px)": {
        fontSize: text.bodyMd,
        color: colors.textBlue,
        fontWeight: "500",
      },
      "@media (max-width: 600px)": {
        fontSize: text.bodyMd,
        color: colors.textBlue,
        fontWeight: "500",
      },
    },
    caption: {
      fontSize: text.captionLg,
      "@media (max-width: 960px)": {
        fontSize: text.captionMd,
      },
      "@media (max-width: 600px)": {
        fontSize: text.captionSm,
      },
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: text.textMd,
            "@media (max-width: 960px)": {
              fontSize: text.textMd,
            },
            "@media (max-width: 600px)": {
              fontSize: text.textSm,
            },
          },
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
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.black,
          fontSize: iconSizes.iconLg,
          "@media (max-width: 960px)": {
            fontSize: iconSizes.iconMd,
            color: colors.black,
          },
          "@media (max-width: 600px)": {
            fontSize: iconSizes.iconSm,
            color: colors.black,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: colors.redAlert,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#191919",
    },
  },
  typography: {
    h1: {
      fontSize: text.titleLg,
      color: colors.white,
      "@media (max-width: 960px)": {
        fontSize: text.titleMd,
      },
      "@media (max-width: 600px)": {
        fontSize: text.titleSm,
      },
    },
    h5: {
      color: colors.white,
      fontWeight: "600",
    },
    subtitle1: {
      fontSize: text.captionLg,
      color: colors.black,
      fontWeight: "500",
      "@media (max-width: 960px)": {
        fontSize: text.captionMd,
        color: colors.black,
        fontWeight: "500",
      },
      "@media (max-width: 600px)": {
        fontSize: text.captionSm,
        color: colors.black,
        fontWeight: "500",
      },
    },
    subtitle2: {
      fontSize: text.bodyLg,
      color: colors.white,
      fontWeight: "500",
      "@media (max-width: 960px)": {
        fontSize: text.bodyMd,
        color: colors.white,
        fontWeight: "500",
      },
      "@media (max-width: 600px)": {
        fontSize: text.bodyMd,
        color: colors.white,
        fontWeight: "500",
      },
    },
    body1: {
      fontSize: text.textLg,
      color: colors.white,
      "@media (max-width: 960px)": {
        fontSize: text.bodyMd,
      },
      "@media (max-width: 600px)": {
        fontSize: text.bodySm,
      },
    },
    body2: {
      fontSize: text.textMd,
      color: colors.textGrayDarkMode,
    },
    caption: {
      fontSize: text.textSm,
      color: colors.textGrayDarkMode,
      "@media (max-width: 960px)": {
        fontSize: text.captionMd,
      },
      "@media (max-width: 600px)": {
        fontSize: text.captionSm,
      },
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: text.textMd,
          },
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
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.white,
          fontSize: iconSizes.iconLg,
          "@media (max-width: 960px)": {
            fontSize: iconSizes.iconMd,
          },
          "@media (max-width: 600px)": {
            fontSize: iconSizes.iconSm,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: colors.textErrorDarkMode,
        },
      },
    },
  },
});
