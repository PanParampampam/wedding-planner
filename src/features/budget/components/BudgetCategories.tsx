import type { BudgetCategory } from "../types/budget.types";
import { Stack, Chip, Typography } from "@mui/material";

type BudgetCategoriesProps = {
  categories: BudgetCategory[];
};

export default function BudgetCategories({ categories }: BudgetCategoriesProps) {
  const addNewCategoryHandler = () => {};

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Typography variant="h2" sx={{ color: "primary.main", fontWeight: 700 }}>
        Categories
      </Typography>
      <Typography sx={{ mt: 1, color: "text.secondary", maxWidth: 800 }}>
        List of the expenses's categories. You can filter expenses by category by clicking it,
        delete a category or add a new one.
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            variant="outlined"
            sx={{
              borderColor: "divider",
              color: "text.primary",
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
