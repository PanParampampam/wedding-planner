import ComponentHeader from "src/shared/ui/ComponentHeader";
import type { BudgetCategory } from "../types/budget.types";
import { Stack, Chip } from "@mui/material";

type BudgetCategoriesProps = {
  categories: BudgetCategory[];
  categoryFilter: string[];
  setCategoryFilter: React.Dispatch<React.SetStateAction<string[] | []>>;
};

export default function BudgetCategories({
  categories,
  categoryFilter,
  setCategoryFilter,
}: BudgetCategoriesProps) {
  const filterCategoryHandler = (categoryId?: string) => {
    if (!categoryId) {
      setCategoryFilter([]);
    } else if (!categoryFilter.includes(categoryId)) {
      setCategoryFilter([...categoryFilter, categoryId]);
    } else {
      setCategoryFilter(categoryFilter.filter((id) => id !== categoryId));
    }
  };

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <ComponentHeader
        title="Categories"
        text="List of the expenses's categories. You can filter expenses by category by clicking it,
        delete a category or add a new one."
      />

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        <Chip
          label="All categories"
          onClick={() => filterCategoryHandler()}
          variant={categoryFilter.length === 0 ? "filled" : "outlined"}
          sx={{
            borderColor: "divider",
            color: "text.primary",
          }}
        />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            variant={categoryFilter.includes(category.id) ? "filled" : "outlined"}
            onDelete={() => {
              console.log("delete");
            }}
            onClick={() => filterCategoryHandler(category.id)}
            sx={{
              borderColor: "divider",
              color: "text.primary",
              "& .MuiChip-deleteIcon": {
                color: "text.disabled",
                "&:hover": { color: "error.main" },
              },
            }}
          />
        ))}
        <Chip
          label="Add a new category"
          variant="outlined"
          sx={{
            borderColor: "divider",
            color: "text.primary",
          }}
        />
      </Stack>
    </Stack>
  );
}
