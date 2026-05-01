import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import PageHeader from "../../shared/ui/PageHeader";
import type { BudgetEntry, BudgetAction } from "./types/budget.types";
import { BudgetContext } from "./context/BudgetContext";
import BudgetEntryList from "./components/BudgetEntryList";
import BudgetEntryForm from "./components/BudgetEntryForm";
import { useBudgetCategories } from "./hooks/useBudgetCategories";

export default function Budget() {
  const [budgetFormOpen, setBudgetFormOpen] = useState(false);
  const [budgetAction, setBudgetAction] = useState<BudgetAction>();
  const [editBudgetEntry, setEditBudgetEntry] = useState<BudgetEntry | undefined>();
  const { categories } = useBudgetCategories();

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
      <Box component="main">
        <PageHeader
          title="Budget"
          description="Build your spending plan, compare estimates with real costs, and keep every decision visible in one place."
        >
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={openNewBudgetForm}
            sx={{ width: "fit-content" }}
          >
            Add a new expense
          </Button>
        </PageHeader>
        <BudgetEntryList openEditBudgetForm={openEditBudgetForm} categories={categories} />

        <BudgetEntryForm
          open={budgetFormOpen}
          onClose={closeBudgetForm}
          editBudgetEntry={editBudgetEntry}
          key={editBudgetEntry?.id}
          categories={categories}
        />
      </Box>
    </BudgetContext>
  );
}
