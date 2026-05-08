import { Box, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { DRAWER_WIDTH } from "../constants/componentsSizes";

type PageHeaderProps = {
  title: string;
  description: string;
  children?: ReactElement;
};

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        mx: {
          xs: -2,
          sm: -3,
          md: `calc(50% - (100vw - ${DRAWER_WIDTH}px) / 2)`,
        },
        width: {
          xs: "calc(100% + 32px)",
          sm: "calc(100% + 48px)",
          md: `calc(100vw - ${DRAWER_WIDTH}px)`,
        },
        py: { xs: 2.5, sm: 3, md: 3.5 },
        minHeight: 200,
        mb: 6,
        mt: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h1" sx={{ color: "primary.main", fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 1200 }}>
          {description}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}
