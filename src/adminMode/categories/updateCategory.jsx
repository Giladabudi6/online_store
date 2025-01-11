/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";

const UpdateCategory = ({ category, updateCategory, setDisplayUpdate }) => {
  const [categoryToupdate, setCategoryToupdate] = useState(category);
  const theme = useTheme();

  // Handle update click
  const handleUpdateClick = () => {
    updateCategory(categoryToupdate, category);
    setDisplayUpdate(false);
  };

  // Render update category form
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        border: `0.5px solid ${theme.palette.primary.main}`,
      }}
    >
      {/* Text field for editing category */}
      <TextField
        fullWidth
        variant="outlined"
        label="Edit Category"
        value={categoryToupdate.title}
        onChange={(e) =>
          setCategoryToupdate({ ...categoryToupdate, title: e.target.value })
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        inputProps={{ maxLength: 20 }} 
      />

      {/* Buttons for update and cancel actions */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateClick}
          size="small"
          sx={{
            fontSize: "14px",
            textTransform: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setDisplayUpdate(false)}
          size="small"
          sx={{
            fontSize: "14px",
            textTransform: "none",
            borderColor: "#d32f2f",
            color: "#d32f2f",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateCategory;
