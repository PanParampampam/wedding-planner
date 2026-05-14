import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Box } from "@mui/material";
import PageHeader from "../../shared/ui/PageHeader";
import BudgetEntryForm from "./components/BudgetEntryForm";
import BudgetDashboard from "./components/BudgetDashboard";
import { useBudgetCategories } from "./hooks/categories/useBudgetCategories";
import { useBudgetStore } from "./store/budget.store";
import ActionToast from "src/shared/ui/ActionToast";
import { useAuthProvider } from "../authProvider/hooks/useAuthProvider";

export default function Budget() {
  const { categories } = useBudgetCategories();
  const { entry, setEntry, form, setForm } = useBudgetStore();
  const { user } = useAuthProvider();
  const isReadOnly = Boolean(user?.readOnly);

  return (
    <Box>
      <ActionToast
        actionType={entry.actionType}
        category={entry.entryType}
        name={entry.entryName}
        onDismiss={() =>
          setEntry({
            entryType: null,
            actionType: null,
            entryId: "",
            entryName: "",
          })
        }
      />
      <PageHeader
        title="Budget"
        description="Build your spending plan, compare estimates with real costs, and keep every decision visible in one place."
      >
        {!isReadOnly ? (
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
        ) : undefined}
      </PageHeader>
      <BudgetDashboard categories={categories} />
      {!isReadOnly && <BudgetEntryForm key={form.entry?.id} categories={categories} />}
    </Box>
  );
}
