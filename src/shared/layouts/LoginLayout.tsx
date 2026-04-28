import type { ReactNode } from "react";
import { Box } from "@mui/material";
import logo from "../../assets/logo.png";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          backgroundColor: "#FEFEFE",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Wedding Planner logo"
          sx={{ height: 300, width: "auto" }}
        />
      </Box>
      {children}
    </Box>
  );
}
