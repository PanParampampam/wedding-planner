import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#8e6b2f",
      light: "#b08a4d",
      dark: "#6f5322",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f8eef3",
      light: "#fdf7fa",
      dark: "#eadfe3",
      contrastText: "#6b6375",
    },
    background: {
      default: "#faf7f7",
      paper: "#ffffff",
    },
    success: {
      main: "#7B8D48",
      light: "#a2b26e",
      dark: "#5f6f36",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#c68a2f",
      light: "#ead6b4",
      dark: "#9a671d",
      contrastText: "#ffffff",
    },
    error: {
      main: "#c96b86",
      light: "#f8dce5",
      dark: "#9c4760",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#6f5863",
      secondary: "#8c6a78",
    },
    divider: "#eadfe3",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ["Inter", "Segoe UI", "Roboto", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.125rem",
      fontWeight: 700,
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h2: {
      fontSize: "28px",
      [`@media (min-width: 600px)`]: {
        fontSize: "36px",
      },
      [`@media (min-width: 960px)`]: {
        fontSize: "40px",
      },
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--wedding-countdown-gradient":
            "linear-gradient(145deg, rgba(246, 221, 228, 0.9) 0%, rgba(255, 251, 246, 0.96) 52%, rgba(232, 217, 181, 0.72) 100%)",
          "--wedding-heart-main": "#c96b86",
          "--wedding-heart-soft": "rgba(248, 220, 229, 0.88)",
          "--wedding-heart-border": "rgba(201, 107, 134, 0.32)",
        },
        html: {
          maxWidth: "100%",
          overflowX: "hidden",
        },
        body: {
          backgroundColor: "#faf7f7",
          maxWidth: "100%",
          overflowX: "hidden",
        },
        "#root": {
          maxWidth: "100%",
          overflowX: "hidden",
        },
        "input[type=number]": {
          MozAppearance: "textfield",
        },
        "input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button":
          {
            WebkitAppearance: "none",
            margin: 0,
          },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAlert: {
      variants: [
        {
          props: { severity: "error", variant: "standard" },
          style: {
            backgroundColor: "#f8dce5",
            color: "#9c4760",
            border: "1px solid #efc3d0",
            "& .MuiAlert-icon": {
              color: "#c96b86",
            },
          },
        },
        {
          props: { severity: "error", variant: "filled" },
          style: {
            backgroundColor: "#c96b86",
            color: "#ffffff",
          },
        },
      ],
    },
  },
});

export default appTheme;
