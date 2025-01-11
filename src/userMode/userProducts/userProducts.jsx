/* eslint-disable react/prop-types */
import { useState } from "react";
import Cart from "./cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../redux/actions/cartActions";
import { getCurrentDate } from "../../utils";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebaseConfig";
import { getProductById } from "../../utils";
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
import UserProduct from "./userProduct";

const UserProducts = ({ products, categories, user, setUser, users }) => {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const [searchByCategory, setSearchByCategory] = useState("all");
  const [searchByPriceMax, setSearchByPriceMax] = useState(1000);
  const [searchByPriceMin, setSearchByPriceMin] = useState(1);
  const [searchByTitle, setSearchByTitle] = useState("all");

  // Filter functions
  const filterByCategory = (productCategory) =>
    searchByCategory === productCategory || searchByCategory === "all";

  const filterByPrice = (productPrice) =>
    productPrice <= searchByPriceMax && productPrice >= searchByPriceMin;

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

  // Add product to cart
  const addProductToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    const currentQty =
      cart.find((order) => order.productId === productId)?.qty || 0;

    if (currentQty >= product.inStock) {
      alert("Cannot add more than available stock!");
      return;
    }

    const currentDate = getCurrentDate();
    const existingOrder = cart.find(
      (order) => order.productId === productId && order.date === currentDate
    );

    if (existingOrder) {
      dispatch(updateQuantity(productId, currentDate, existingOrder.qty + 1));
    } else {
      dispatch(addToCart(productId, 1, currentDate));
    }
  };

  // Update user data
  const updateUser = async (cart) => {
    try {
      const currentDate = getCurrentDate();
      const productsToAdd = cart.flatMap((item) => {
        return Array(item.qty).fill({
          productId: item.productId,
          date: currentDate,
        });
      });

      const userRef = doc(db, "users", user.id);
      const existingOrders = user.orders || [];

      await updateDoc(userRef, {
        orders: [...existingOrders, ...productsToAdd],
      });

      for (const item of cart) {
        const product = await getProductById(item.productId, products);
        if (product) {
          const updatedStock = product.inStock - item.qty;
          const productRef = doc(db, "products", item.productId);
          await updateDoc(productRef, { inStock: updatedStock });
        }
      }

      console.log("User updated successfully!");
      setUser((prevUser) => ({
        ...prevUser,
        orders: [...existingOrders, ...productsToAdd],
      }));
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user details. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
        margin: "auto",
        maxWidth: "1200px",
      }}
    >
      {/* Main Content */}
      <Box sx={{ flex: 3 }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
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

        <Box
          sx={{ display: "flex", gap: 1.5, justifyContent: "space-between" }}
        >
          {/* Cart Section */}
          <Box
            sx={{
              flex: "0 0 300px",
              position: "sticky",
              top: 10,
              height: "calc(100vh - 32px)",
              overflowY: "auto",
              padding: 2,
              backgroundColor: "rgba(83, 153, 222, 0.32)",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <Cart key={user.id} updateUser={updateUser} products={products} />
          </Box>

          {/* Product List */}
          <Box
            sx={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1.5,
              alignItems: "start",
              alignContent: "start",
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
                  <UserProduct
                    key={product.id}
                    product={product}
                    users={users}
                    addProductToCart={addProductToCart}
                  />
                ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProducts;
