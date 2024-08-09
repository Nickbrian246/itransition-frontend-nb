import { createTheme } from "@mui/material";

export const colors = {
  black: "#0D141C",
  main: "#F7FAFC",
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
};
export const text = {
  titleLg: "32px",
  textLg: "18px",
  textMd: "16px",
  textSm: "14px",
};

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: colors.blue,
//     },
//     secondary: {
//       main: colors.textBlue,
//     },
//     error: {
//       main: colors.redAlert,
//     },
//     success: {
//       main: colors.greenSuccess,
//     },
//     background: {
//       default: colors.main,
//       paper: colors.white,
//     },
//     text: {
//       primary: colors.textBlack,
//       secondary: colors.textBlue,
//     },
//     divider: colors.border,
//   },
//   typography: {
//     allVariants: {
//       color: colors.textBlue,
//     },
//     h1: {
//       fontSize: text.titleLg,
//     },
//     body1: {
//       fontSize: text.textLg,
//     },
//     body2: {
//       fontSize: text.textMd,
//     },
//     caption: {
//       fontSize: text.textSm,
//     },
//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiInputBase-input": {
//             fontSize: text.textMd,
//           },
//           "& .MuiOutlinedInput-root": {
//             "& fieldset": {
//               borderColor: colors.border,
//             },
//             "&:hover fieldset": {
//               borderColor: colors.border,
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: colors.border,
//             },
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderRadius: "10px",
//             },
//           },
//         },
//       },
//     },
//   },
// });

const theme = createTheme({
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
    },
    body1: {
      fontSize: text.textLg,
      color: colors.white,
    },
    body2: {
      fontSize: text.textMd,
      color: colors.textGrayDarkMode,
    },
    caption: {
      fontSize: text.textSm,
      color: colors.textGrayDarkMode,
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
  },
});

export default theme;
