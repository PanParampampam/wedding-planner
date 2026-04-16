import { useContext } from "react";
import { GuestsContext } from "../context/GuestsContext";
import { Box, Typography } from "@mui/material";

export default function GuestAlert() {
  const guestContext = useContext(GuestsContext);

  if (guestContext?.guestAction?.actionType === "created") {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            bgcolor: "success.main",
            color: "common.white",
            px: 3,
            py: 2,
            borderRadius: 2,
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          A new guest "{guestContext.guestAction.guestName}" has been added.
        </Typography>
      </Box>
    );
  }

  if (guestContext?.guestAction?.actionType === "deleted") {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            bgcolor: "warning.main",
            color: "common.white",
            px: 3,
            py: 2,
            borderRadius: 2,
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Guest "{guestContext.guestAction.guestName}" has been deleted.
        </Typography>
      </Box>
    );
  }

  if (guestContext?.guestAction?.actionType === "updated") {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            bgcolor: "success.main",
            color: "common.white",
            px: 3,
            py: 2,
            borderRadius: 2,
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Guest "{guestContext.guestAction.guestName}" has been updated.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          color: "common.white",
          px: 3,
          py: 2,
          borderRadius: 2,
          textAlign: "center",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      ></Typography>
    </Box>
  );
}
