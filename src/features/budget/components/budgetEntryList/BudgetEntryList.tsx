import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { Paper, Stack, Typography } from "@mui/material";
import BudgetEntryItem from "./BudgetEntryItem";
import ComponentHeader from "src/shared/ui/ComponentHeader";
import type { BudgetCategory, BudgetEntry } from "../../types/budget.types";
import type { CurrencyCode } from "src/shared/types/common.types";

type BudgetEntryListProps = {
  entries: BudgetEntry[];
  categories: BudgetCategory[];
  currencyCode: CurrencyCode;
  openEditBudgetForm: (budgetEntry: BudgetEntry) => void;
};

export default function BudgetEntryList({
  entries,
  categories,
  currencyCode,
  openEditBudgetForm,
}: BudgetEntryListProps) {
  return (
    <Stack spacing={2}>
      <ComponentHeader
        title="Expenses"
        text="Unpaid entries appear first, ordered by due date. You can edit or delete every expense."
      />
      {entries.length > 0 ? (
        entries.map((entry) => {
          return (
            <BudgetEntryItem
              key={entry.id}
              entry={entry}
              categories={categories}
              currencyCode={currencyCode}
              openEditBudgetForm={openEditBudgetForm}
            />
          );
        })
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: "1px dashed",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Stack spacing={1.5} sx={{ alignItems: "flex-start" }}>
            <ReceiptLongRoundedIcon color="primary" />
            <Typography variant="h6">No budget entries yet</Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 800 }}>
              Start with the biggest costs first, then add the smaller details as they come in.
            </Typography>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
