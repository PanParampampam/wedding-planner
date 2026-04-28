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
      primary: "#3d3242",
      secondary: "#6b6375",
    },
    divider: "#eadfe3",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ["Inter", "Segoe UI", "Roboto", "Arial", "sans-serif"].join(
      ",",
    ),
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
        body: {
          backgroundColor: "#faf7f7",
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
