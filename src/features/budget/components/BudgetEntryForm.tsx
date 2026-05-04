import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useState } from "react";
import dayjs from "dayjs";

import { useCreateBudgetEntry } from "../hooks/entries/useCreateBudgetEntry";
import { useUpdateBudgetEntry } from "../hooks/entries/useUpdateBudgetEntry";
import type { BudgetCategory, BudgetEntry, CreateBudgetEntry } from "../types/budget.types";
import { useBudgetStore } from "../store/budget.store";

type BudgetEntryFormProps = {
  categories: BudgetCategory[];
};

const emptyBudgetEntry: CreateBudgetEntry = {
  name: "",
  plannedAmount: 0,
  actualAmount: 0,
  dueDate: null,
  paid: false,
  categoryId: "",
  note: null,
};

export default function BudgetEntryForm({ categories }: BudgetEntryFormProps) {
  const { form, setForm } = useBudgetStore();
  const initialBudgetEntryData: CreateBudgetEntry | BudgetEntry = form.entry
    ? ({
        id: form.entry.id,
        name: form.entry.name,
        plannedAmount: form.entry.plannedAmount,
        actualAmount: form.entry.actualAmount,
        dueDate: form.entry.dueDate,
        paid: form.entry.paid,
        categoryId: form.entry.categoryId,
        userId: form.entry.userId,
        note: form.entry.note,
      } as BudgetEntry)
    : ({ ...emptyBudgetEntry } as CreateBudgetEntry);

  const [budgetEntryData, setBudgetEntryData] =
    useState<typeof initialBudgetEntryData>(initialBudgetEntryData);
  const createBudgetEntryHook = useCreateBudgetEntry();
  const updateBudgetEntryHook = useUpdateBudgetEntry();

  const { loading, error } = form.entry ? updateBudgetEntryHook : createBudgetEntryHook;

  const formFieldHandler = (
    key: keyof (CreateBudgetEntry | BudgetEntry),
    value: string | boolean | number | null,
  ) => {
    setBudgetEntryData((current) => ({ ...current, [key]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...budgetEntryData,
      plannedAmount: budgetEntryData.plannedAmount || null,
      actualAmount: budgetEntryData.actualAmount || null,
      dueDate: budgetEntryData.dueDate,
      note: budgetEntryData.note || null,
    };

    let response = false;

    if ("id" in payload) {
      response = await updateBudgetEntryHook.handler(payload as BudgetEntry);
    } else {
      response = await createBudgetEntryHook.handler(payload as CreateBudgetEntry);
    }

    if (response) {
      setForm({
        isOpen: false,
        entry: null,
      });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={form.isOpen}
      onClose={() =>
        setForm({
          isOpen: false,
          entry: null,
        })
      }
    >
      <DialogTitle color="textPrimary" align="center">
        {form.entry ? "Edit an expense" : "Add a new expense"}
      </DialogTitle>
      <DialogContent>
        <Stack component="form" spacing={2} onSubmit={handleFormSubmit} sx={{ pt: 1 }}>
          <Typography sx={{ color: "text.secondary" }}>
            Keep the list practical: one line per expense you actually want to track.
          </Typography>

          <TextField
            required
            label="What's it for?"
            value={budgetEntryData.name}
            onChange={(e) => formFieldHandler("name", e.target.value)}
          />

          <FormControl required>
            <InputLabel id="budget-category-label">Category</InputLabel>
            <Select
              labelId="budget-category-label"
              label="Category"
              value={budgetEntryData.categoryId}
              onChange={(e) => formFieldHandler("categoryId", e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Planned amount"
              type="number"
              value={budgetEntryData.plannedAmount}
              onChange={(e) =>
                formFieldHandler(
                  "plannedAmount",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              slotProps={{ htmlInput: { min: 0 } }}
              fullWidth
            />
            <TextField
              label="Actual amount"
              type="number"
              value={budgetEntryData.actualAmount}
              onChange={(e) =>
                formFieldHandler(
                  "actualAmount",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              slotProps={{ htmlInput: { min: 0 } }}
              fullWidth
            />
          </Stack>

          <DatePicker
            label="Due date"
            format="DD/MM/YYYY"
            value={budgetEntryData.dueDate ? dayjs(budgetEntryData.dueDate) : null}
            onChange={(date) => formFieldHandler("dueDate", date ? date.toISOString() : null)}
            slotProps={{ textField: { fullWidth: true } }}
          />

          <TextField
            label="Notes"
            multiline
            minRows={3}
            value={budgetEntryData.note ?? ""}
            onChange={(e) => formFieldHandler("note", e.target.value || null)}
          />

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={budgetEntryData.paid}
                  onChange={(e) => formFieldHandler("paid", e.target.checked)}
                />
              }
              label="Mark as paid"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={loading}
              loadingPosition="end"
              endIcon={form.entry ? <SaveRoundedIcon /> : <AddRoundedIcon />}
              sx={{ width: "fit-content" }}
            >
              {form.entry ? "Save changes" : "Create"}
            </Button>
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
