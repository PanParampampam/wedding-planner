import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Chip, CircularProgress, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { useCreateBudgetCategory } from "../../hooks/categories/useCreateBudgetCategory";

export default function AddBudgetCategoryChip() {
  const { loading, error, handler } = useCreateBudgetCategory();
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const sharedWidth = { xs: "100%", sm: 220 };

  const openEditor = () => {
    setIsEditing(true);
  };

  const cancelEditor = () => {
    setCategoryName("");
    setIsEditing(false);
  };

  const confirmCategory = async () => {
    const trimmedCategoryName = categoryName.trim();

    if (!trimmedCategoryName || loading) {
      return;
    }

    const success = await handler(trimmedCategoryName);

    if (success) {
      setCategoryName("");
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Stack spacing={0.5} sx={{ width: sharedWidth }}>
        <Chip
          icon={<AddRoundedIcon fontSize="small" />}
          label="Add a new category"
          variant="outlined"
          onClick={openEditor}
          disabled={loading}
          sx={{
            borderColor: "divider",
            color: "text.primary",
            width: "100%",
          }}
        />
        {!!error && (
          <Typography variant="caption" sx={{ color: "error.main" }}>
            {error}
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Stack spacing={0.5} sx={{ width: sharedWidth }}>
      <Chip
        variant="outlined"
        sx={{
          borderColor: "divider",
          color: "text.primary",
          backgroundColor: "background.paper",
          width: "100%",
          height: 32,
          alignItems: "stretch",
          "& .MuiChip-label": {
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
            px: 0.75,
            py: 0,
          },
        }}
        label={
          <Stack direction="row" spacing={0.25} sx={{ alignItems: "center", width: "100%" }}>
            <InputBase
              autoFocus
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              disabled={loading}
              sx={{
                flexGrow: 1,
                minWidth: 120,
                fontSize: 14,
                "& .MuiInputBase-input": {
                  py: 0,
                },
              }}
            />
            <IconButton
              size="small"
              color="success"
              aria-label="confirm new category"
              onClick={confirmCategory}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                <CheckRoundedIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              size="small"
              color="error"
              aria-label="cancel new category"
              onClick={cancelEditor}
              disabled={loading}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        }
      />
      {!!error && (
        <Typography variant="caption" sx={{ color: "error.main" }}>
          {error}
        </Typography>
      )}
    </Stack>
  );
}
