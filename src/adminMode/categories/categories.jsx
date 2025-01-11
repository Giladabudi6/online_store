/* eslint-disable react/prop-types */
import { useState } from "react";
import Category from "./category";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebaseConfig";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";

const Categories = ({ categories, products }) => {
  const [newCategory, setNewCategory] = useState("Add new category...");
  const theme = useTheme();

  // Add new category
  const addCategory = async () => {
    const trimmedCategory = newCategory.trim();
    if (!trimmedCategory || trimmedCategory === "Add new category...") {
      alert("Please enter a valid category title");
      return;
    }
    const isExists = categories.some(
      (category) =>
        category.title.toLowerCase() === trimmedCategory.toLowerCase()
    );
    if (isExists) {
      alert("This category already exists!");
      return;
    }

    const newCategoryData = { title: trimmedCategory };
    try {
      await addDoc(collection(db, "categories"), newCategoryData);
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add the category. Please try again.");
    }
    setNewCategory("Add new category...");
  };

  // Update existing category
  const updateCategory = async (categoryToUpdate, oldCategory) => {
    const categoryRef = doc(db, "categories", categoryToUpdate.id);
    try {
      await updateDoc(categoryRef, { title: categoryToUpdate.title });

      const updatePromises = products.map(async (product) => {
        if (product.category === oldCategory.title) {
          try {
            const productRef = doc(db, "products", product.id);
            await updateDoc(productRef, { category: categoryToUpdate.title });
          } catch (error) {
            console.error(`Error updating product ${product.id}:`, error);
          }
        }
      });
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category. Please try again.");
    }
  };

  // Delete category
  const deleteCategory = async (categoryToDelete) => {
    try {
      await deleteDoc(doc(db, "categories", categoryToDelete.id));
      const updatePromises = products.map(async (product) => {
        if (product.category === categoryToDelete.title) {
          try {
            const productRef = doc(db, "products", product.id);
            await updateDoc(productRef, { category: "general" });
          } catch (error) {
            console.error(`Error updating product ${product.id}:`, error);
          }
        }
      });
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  // Render category management interface
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        margin: "auto",
        padding: 2,
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 3, marginTop: 2 }}
      >
        Categories
      </Typography>

      {/* Add new category section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 3,
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onClick={() => setNewCategory("")}
          sx={{
            backgroundColor: "white",
          }}
          inputProps={{ maxLength: 20 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addCategory}
          sx={{
            fontSize: "14px",
            padding: "8px 16px",
            textTransform: "none",
          }}
        >
          Add
        </Button>
      </Box>

      {/* Display categories */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            disableActions={category.title.toLowerCase() === "general"}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Categories;
