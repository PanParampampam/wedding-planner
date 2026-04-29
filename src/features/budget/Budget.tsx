import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import ComponentHeader from "../../shared/ui/ComponentHeader";
import type { BudgetEntry, BudgetAction } from "./types/budget.types";
import { BudgetContext } from "./context/BudgetContext";
import BudgetEntryList from "./components/BudgetEntryList";
import BudgetEntryForm from "./components/BudgetEntryForm";

export default function Budget() {
  const [budgetFormOpen, setBudgetFormOpen] = useState(false);
  const [budgetAction, setBudgetAction] = useState<BudgetAction>();
  const [editBudgetEntry, setEditBudgetEntry] = useState<
    BudgetEntry | undefined
  >();

  const openNewBudgetForm = () => {
    setEditBudgetEntry(undefined);
    setBudgetFormOpen(true);
  };

  const openEditBudgetForm = (budgetEntry: BudgetEntry) => {
    setEditBudgetEntry(budgetEntry);
    setBudgetFormOpen(true);
  };

  const closeBudgetForm = () => setBudgetFormOpen(false);

  return (
    <BudgetContext value={{ budgetAction, setBudgetAction }}>
      <main>
        <ComponentHeader
          title="Budget"
          description="Build your spending plan, compare estimates with real costs, and keep every decision visible in one place."
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={openNewBudgetForm}
              sx={{ width: "fit-content" }}
            >
              Add new expense
            </Button>
          </Stack>
        </ComponentHeader>

        <BudgetEntryList openEditBudgetForm={openEditBudgetForm} />

        <BudgetEntryForm
          open={budgetFormOpen}
          onClose={closeBudgetForm}
          editBudgetEntry={editBudgetEntry}
          key={editBudgetEntry?.id}
        />
      </main>
    </BudgetContext>
  );
}
