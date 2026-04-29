import { Typography } from "@mui/material";
import ComponentHeader from "../../shared/ui/ComponentHeader";

export default function Budget() {
  return (
    <main>
      <ComponentHeader
        title="Budget"
        description="Plan expenses, track spending, and keep your wedding budget under control."
      />
      <Typography sx={{ color: "text.secondary" }}>
        Budget tools coming soon.
      </Typography>
    </main>
  );
}
