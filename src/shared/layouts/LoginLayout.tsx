import type { ReactNode } from "react";
import { Box } from "@mui/material";
import logo from "../../assets/logo-transparent.png";

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
          justifyContent: "center",
          width: "100%",
          height: 200,
          backgroundColor: "background.paper",
          mb: 6,
          mt: 4,
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
