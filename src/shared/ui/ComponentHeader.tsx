import { Box, Typography } from "@mui/material";
import type { ReactElement } from "react";

type ComponentHeaderProps = {
  title: string;
  description: string;
  children?: ReactElement;
};

export default function ComponentHeader({
  title,
  description,
  children,
}: ComponentHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        backgroundColor: "background.paper",
        mx: { xs: -2, sm: -3, md: -4 },
        width: {
          xs: "calc(100% + 32px)",
          sm: "calc(100% + 48px)",
          md: "calc(100% + 64px)",
        },
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2.5, sm: 3, md: 3.5 },
        minHeight: 200,
        mb: 6,
        mt: 4,
      }}
    >
      <Typography variant="h1" sx={{ color: "primary.main", fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 700 }}>
        {description}
      </Typography>
      {children}
    </Box>
  );
}
