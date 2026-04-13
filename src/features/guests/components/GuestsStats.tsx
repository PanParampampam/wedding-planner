import { Container, Stack, Typography } from "@mui/material";

export default function GuestsStats({ total, confirmed, attending }: { total: number; confirmed: number; attending: number }) {
  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        mb: 3,
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" spacing={3}>
        <Typography variant="body1" color="text.secondary">
          Total: <strong>{total}</strong>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Confirmed: <strong>{confirmed}</strong>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Attending: <strong>{attending}</strong>
        </Typography>
      </Stack>
    </Container>
  );
}
