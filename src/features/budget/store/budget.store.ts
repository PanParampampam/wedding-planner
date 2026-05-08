import { create } from "zustand";
import type { BudgetState } from "../types/budget.types";

export const useBudgetStore = create<BudgetState>((set) => ({
  entry: {
    entryType: null,
    actionType: null,
    entryId: "",
    entryName: "",
  },
  form: {
    isOpen: false,
    entry: null,
  },
  setEntry: (newEntry) => set(() => ({ entry: newEntry })),
  setForm: (newForm) => set(() => ({ form: newForm })),
}));
