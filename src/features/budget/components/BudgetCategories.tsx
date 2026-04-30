import ComponentHeader from "src/shared/ui/ComponentHeader";
import type { BudgetCategory } from "../types/budget.types";
import { Stack, Chip } from "@mui/material";

type BudgetCategoriesProps = {
  categories: BudgetCategory[];
};

export default function BudgetCategories({ categories }: BudgetCategoriesProps) {
  const addNewCategoryHandler = () => {};

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <ComponentHeader
        title="Categories"
        text="List of the expenses's categories. You can filter expenses by category by clicking it,
        delete a category or add a new one."
      />

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            variant="outlined"
            onDelete={() => {
              console.log("delete");
            }}
            onClick={() => {
              console.log("click");
            }}
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
          onClick={addNewCategoryHandler}
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
