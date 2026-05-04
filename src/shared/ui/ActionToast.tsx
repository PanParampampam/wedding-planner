import { useEffect, useMemo, useState } from "react";
import { Alert as MuiAlert, Box, Fade } from "@mui/material";
import type { StoreActionTypes } from "../types/common.types";
import { DRAWER_WIDTH } from "../constants/componentsSizes";

type ActionAlertProps = {
  actionType: StoreActionTypes;
  category: string | null;
  name: string;
};

export default function ActionToast({ actionType, category, name }: ActionAlertProps) {
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);

  const alertConfig = useMemo(() => {
    if (!actionType || !name.trim()) return null;

    if (actionType === "created") {
      return {
        severity: "success" as const,
        message: `${category} "${name}" has been created.`,
      };
    }

    if (actionType === "updated") {
      return {
        severity: "success" as const,
        message: `${category} "${name}" has been updated.`,
      };
    }

    if (actionType === "deleted") {
      return {
        severity: "warning" as const,
        message: `${category} "${name}" has been deleted.`,
      };
    }

    return null;
  }, [actionType, category, name]);

  const alertKey = alertConfig ? `${actionType}-${name}` : null;
  const open = Boolean(alertConfig && alertKey !== dismissedKey);

  useEffect(() => {
    if (!alertKey) return;

    const timer = window.setTimeout(() => {
      setDismissedKey(alertKey);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [alertKey]);

  if (!alertConfig) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 90, md: 0 },
        left: { md: `${DRAWER_WIDTH}px` },
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        zIndex: (theme) => theme.zIndex.modal - 1,
      }}
    >
      <Fade in={open} timeout={{ enter: 250, exit: 500 }}>
        <MuiAlert
          severity={alertConfig.severity}
          variant="standard"
          sx={{
            "& .MuiAlert-message": {
              width: "100%",
              textAlign: "center",
              fontWeight: 700,
              color: alertConfig.severity === "warning" ? "warning.dark" : "success.dark",
            },
          }}
        >
          {alertConfig.message}
        </MuiAlert>
      </Fade>
    </Box>
  );
}
