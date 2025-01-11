/* eslint-disable react/prop-types */
import UpdateCategory from "./updateCategory";
import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

const Category = ({ category, updateCategory, deleteCategory, disableActions  }) => {
  const [displayUpdate, setDisplayUpdate] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        border: "1px solid rgb(83, 152, 222)",
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 2,
        maxWidth: "780px",
        marginRight: "150px",
        marginLeft: "150px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", flex: 1 }}>
        {category.title}
      </Typography>

      {/* Display update form */}
      {displayUpdate && (
        <Box sx={{ marginRight: 2 }}>
          <UpdateCategory
            category={category}
            updateCategory={updateCategory}
            setDisplayUpdate={setDisplayUpdate}
          />
        </Box>
      )}

      {/* Update and Delete buttons */}
      {!disableActions && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDisplayUpdate(true)}
            sx={{
              fontSize: "14px",
              textTransform: "none",
              borderColor: "#1976d2",
              color: "#1976d2",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteCategory(category)}
            sx={{
              fontSize: "14px",
              textTransform: "none",
              borderColor: "#d32f2f",
              color: "#d32f2f",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Category;
