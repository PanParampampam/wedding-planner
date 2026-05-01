import { Box, Typography } from "@mui/material";

type ComponentHeaderProps = {
  title: string;
  text: string;
};

export default function ComponentHeader({ title, text }: ComponentHeaderProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h2" sx={{ color: "primary.main", fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 800 }}>{text}</Typography>
    </Box>
  );
}
