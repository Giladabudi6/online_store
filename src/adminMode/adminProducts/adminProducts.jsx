/* eslint-disable react/prop-types */
import { useState } from "react";
import AdminProduct from "./adminProduct";
import AddProduct from "./addProduct";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebaseConfig";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AdminProducts = ({ categories, products, users }) => {
  const [displayAddProduct, setDisplayAddProduct] = useState(false);

  // Add new product
  const addProduct = async (newProduct) => {
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      await updateDoc(docRef, { id: docRef.id });
      console.log("Product added successfully:", docRef.id);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add the product. Please try again.");
    }
  };

  // Update product
  const updateProduct = async (updateProductData) => {
    const productRef = doc(db, "products", updateProductData.id);

    try {
      await updateDoc(productRef, { ...updateProductData });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  // Delete product
  const deleteProduct = (product) => {
    deleteDoc(doc(db, "products", product.id));
  };

  const [searchByCategory, setSearchByCategory] = useState("all");
  const [searchByPriceMax, setSearchByPriceMax] = useState(1000);
  const [searchByPriceMin, setSearchByPriceMin] = useState(0);
  const [searchByTitle, setSearchByTitle] = useState("all");

  // Filter products by category
  const filterByCategory = (productCategory) =>
    searchByCategory === productCategory || searchByCategory === "all";

  // Filter products by price
  const filterByPrice = (productPrice) =>
    productPrice <= searchByPriceMax && productPrice >= searchByPriceMin;

  // Filter products by title
  const filterByTitle = (productTitle) =>
    productTitle.toLowerCase().includes(searchByTitle.toLowerCase()) ||
    searchByTitle === "all";

  // Clear filters
  const clearFilters = () => {
    setSearchByCategory("all");
    setSearchByPriceMax(1000);
    setSearchByPriceMin(0);
    setSearchByTitle("all");
  };

  return (
    <Box sx={{ padding: 2, margin: "auto" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 3, marginTop: 2 }}
      >
        Products
      </Typography>

      {/* Filters Section */}
      <Card
        sx={{
          padding: 2,
          marginBottom: 2,
          border: "1px solid #1976d2",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            color: "#1976d2",
            fontWeight: "bold",
            marginBottom: -1,
          }}
        >
          Filters
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Select
              fullWidth
              size="small"
              value={searchByCategory}
              onChange={(e) => setSearchByCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.title}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" gutterBottom>
              Price Range: {searchByPriceMin}$ - {searchByPriceMax}$
            </Typography>
            <Slider
              value={[searchByPriceMin, searchByPriceMax]}
              onChange={(e, newValue) => {
                setSearchByPriceMin(newValue[0]);
                setSearchByPriceMax(newValue[1]);
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}$`}
              min={1}
              max={1000}
              sx={{
                color: "#1976d2",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#1976d2",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#1976d2",
                },
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              label="Title"
              value={searchByTitle}
              onChange={(e) => setSearchByTitle(e.target.value)}
              onClick={() => setSearchByTitle("")}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={clearFilters}
              size="small"
              variant="outlined"
              sx={{
                textTransform: "none",
                padding: "2px 6px",
                minWidth: "auto",
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Add Product Button */}
      <Box sx={{ textAlign: "center", marginTop: 4, marginBottom: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDisplayAddProduct(true)}
          size="large"
        >
          Add Product
        </Button>
      </Box>

      {/* Add Product Form */}
      {displayAddProduct && (
        <AddProduct
          addProduct={addProduct}
          categories={categories}
          products={products}
          setDisplayAddProduct={setDisplayAddProduct}
        />
      )}

      {/* Display filtered products */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginLeft: "28px",
          padding: 2,
        }}
      >
        {products.filter(
          (product) =>
            filterByCategory(product.category) &&
            filterByPrice(product.price) &&
            filterByTitle(product.title)
        ).length === 0 ? (
          <Typography variant="h6" align="center" sx={{ marginTop: 3 }}>
            No products available
          </Typography>
        ) : (
          products
            .filter(
              (product) =>
                filterByCategory(product.category) &&
                filterByPrice(product.price) &&
                filterByTitle(product.title)
            )
            .map((product) => (
              <AdminProduct
                key={product.id}
                users={users}
                product={product}
                products={products}
                categories={categories}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            ))
        )}
      </Box>
    </Box>
  );
};

export default AdminProducts;
