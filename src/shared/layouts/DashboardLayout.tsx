import Nav from "../../features/nav/Nav";
import type { ReactNode } from "react";
import { DRAWER_WIDTH } from "../constants/componentsSizes";
import { Box } from "@mui/material";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          maxWidth: { md: `calc(1400px + ${DRAWER_WIDTH}px)` },
          mx: { md: "auto" },
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Box>
    </>
  );
}
