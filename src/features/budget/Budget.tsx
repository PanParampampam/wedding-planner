import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Box } from "@mui/material";
import PageHeader from "../../shared/ui/PageHeader";
import BudgetEntryForm from "./components/BudgetEntryForm";
import BudgetDashboard from "./components/BudgetDashboard";
import { useBudgetCategories } from "./hooks/categories/useBudgetCategories";
import { useBudgetStore } from "./store/budget.store";
import ActionToast from "src/shared/ui/ActionToast";

export default function Budget() {
  const { categories } = useBudgetCategories();
  const { entry, form, setForm } = useBudgetStore();

  return (
    <Box component="main">
      <ActionToast
        actionType={entry.actionType}
        category={entry.entryType}
        name={entry.entryName}
      />
      <PageHeader
        title="Budget"
        description="Build your spending plan, compare estimates with real costs, and keep every decision visible in one place."
      >
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            setForm({
              isOpen: true,
              entry: null,
            })
          }
          sx={{ width: "fit-content" }}
        >
          Add a new expense
        </Button>
      </PageHeader>
      <BudgetDashboard categories={categories} />
      <BudgetEntryForm key={form.entry?.id} categories={categories} />
    </Box>
  );
}
