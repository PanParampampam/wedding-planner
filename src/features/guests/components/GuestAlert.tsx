import { useContext, useEffect, useMemo, useState } from "react";
import { GuestsContext } from "../context/GuestsContext";
import { Alert, Box, Fade } from "@mui/material";
import { EMPTY_ALERT_HEIGHT } from "../../../shared/constants/componentsSizes";

export default function GuestAlert() {
  const guestContext = useContext(GuestsContext);
  const guestAction = guestContext?.guestAction;
  const [open, setOpen] = useState(true);

  const alertConfig = useMemo(() => {
    if (!guestAction) return null;

    if (guestAction.actionType === "created") {
      return {
        severity: "success" as const,
        message: `A new guest "${guestAction.guestName}" has been added.`,
      };
    }

    if (guestAction.actionType === "deleted") {
      return {
        severity: "warning" as const,
        message: `Guest "${guestAction.guestName}" has been deleted.`,
      };
    }

    if (guestAction.actionType === "updated") {
      return {
        severity: "success" as const,
        message: `Guest "${guestAction.guestName}" has been updated.`,
      };
    }

    return null;
  }, [guestAction]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [alertConfig]);

  return (
    <Box sx={{ mb: 2, minHeight: EMPTY_ALERT_HEIGHT }}>
      <Fade
        in={Boolean(alertConfig && open)}
        timeout={{ enter: 200, exit: 400 }}
      >
        <Box>
          <Alert
            severity={alertConfig?.severity ?? "info"}
            sx={{
              borderRadius: 0,
              fontWeight: 600,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              "& .MuiAlert-message": {
                width: "100%",
                textAlign: "center",
              },
            }}
          >
            {alertConfig?.message ?? " "}
          </Alert>
        </Box>
      </Fade>
    </Box>
  );
}
