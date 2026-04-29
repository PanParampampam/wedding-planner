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
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useBudgetCategories } from "../hooks/useBudgetCategories";
import { useCreateBudgetEntry } from "../hooks/useCreateBudgetEntry";
import { useUpdateBudgetEntry } from "../hooks/useUpdateBudgetEntry";
import type { BudgetEntry, CreateBudgetEntry } from "../types/budget.types";

type BudgetEntryFormProps = {
  open: boolean;
  onClose: () => void;
  editBudgetEntry?: BudgetEntry;
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

export default function BudgetEntryForm({
  open,
  onClose,
  editBudgetEntry,
}: BudgetEntryFormProps) {
  const [budgetEntryData, setBudgetEntryData] = useState<
    CreateBudgetEntry | BudgetEntry
  >(emptyBudgetEntry);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const { categories } = useBudgetCategories();
  const createBudgetEntryHook = useCreateBudgetEntry();
  const updateBudgetEntryHook = useUpdateBudgetEntry();

  const activeHook = editBudgetEntry
    ? updateBudgetEntryHook
    : createBudgetEntryHook;

  useEffect(() => {
    if (!open) return;

    if (editBudgetEntry) {
      setBudgetEntryData({ ...editBudgetEntry });
      setDueDate(
        editBudgetEntry.dueDate ? dayjs(editBudgetEntry.dueDate) : null,
      );
      return;
    }

    setBudgetEntryData({
      ...emptyBudgetEntry,
      categoryId: categories[0]?.id ?? "",
    });
    setDueDate(null);
  }, [categories, editBudgetEntry, open]);

  const updateField = (
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
      dueDate: dueDate ? dueDate.toISOString() : null,
      note: budgetEntryData.note || null,
    };

    const response = editBudgetEntry
      ? await updateBudgetEntryHook.handler(payload as BudgetEntry)
      : await createBudgetEntryHook.handler(payload as CreateBudgetEntry);

    if (response) {
      onClose();
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        {editBudgetEntry ? "Edit budget entry" : "Add budget entry"}
      </DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          spacing={2}
          onSubmit={handleFormSubmit}
          sx={{ pt: 1 }}
        >
          <Typography sx={{ color: "text.secondary" }}>
            Keep the list practical: one line per expense you actually want to
            track.
          </Typography>

          <TextField
            required
            label="Entry name"
            value={budgetEntryData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <FormControl required>
            <InputLabel id="budget-category-label">Category</InputLabel>
            <Select
              labelId="budget-category-label"
              label="Category"
              value={budgetEntryData.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
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
                updateField(
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
                updateField(
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
            value={dueDate}
            onChange={(date: Dayjs | null) => setDueDate(date)}
            slotProps={{ textField: { fullWidth: true } }}
          />

          <TextField
            label="Notes"
            multiline
            minRows={3}
            value={budgetEntryData.note ?? ""}
            onChange={(e) => updateField("note", e.target.value || null)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={budgetEntryData.paid}
                onChange={(e) => updateField("paid", e.target.checked)}
              />
            }
            label="Mark as paid"
          />

          {activeHook.error && (
            <Alert severity="error">{activeHook.error}</Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            loading={activeHook.loading}
            loadingPosition="end"
            endIcon={editBudgetEntry ? <SaveRoundedIcon /> : <AddRoundedIcon />}
          >
            {editBudgetEntry ? "Save changes" : "Add entry"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
