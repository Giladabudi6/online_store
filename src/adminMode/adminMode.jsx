import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./categories/categories";
import Customers from "./customers/customers";
import Statistics from "./statistics/statistics";
import AdminProduts from "./adminProducts/adminProducts";
import { useSelector } from "react-redux";
import { Tab, Tabs, Box, Typography, Container, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// AdminMode component
const AdminMode = () => {
  // State variables and theme
  const users = useSelector((state) => state.users || []);
  const products = useSelector((state) => state.products || []);
  const categories = useSelector((state) => state.categories || []);
  const [value, setValue] = useState(0); // Selected tab
  const navigate = useNavigate();
  const theme = useTheme();

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update selected tab
  };

  // Render admin mode interface
  return (
    <Container
      maxWidth="false"
      sx={{
        width: "1200px", // Fixed width
        margin: "0 auto", // Center container
        position: "relative", // Position for inner elements
      }}
    >
      <Box
        sx={{
          border: `3px solid ${theme.palette.primary.main}`,
          padding: 2,
          marginTop: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        {/* Log Out button - Top right */}
        <Button
          variant="outlined"
          sx={{
            position: "absolute",
            top: 16,
            right: 40,
            fontSize: "15px",
            borderRadius: 2,
            padding: "6px 12px",
            textTransform: "none",
            borderWidth: "1px",
            borderColor: "primary.main",
            "&:hover": {
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            },
          }}
          onClick={() => navigate("/")}
        >
          Log Out
        </Button>

        {/* Title Hello Admin */}
        <Typography
          variant="h4"
          align="left"
          sx={{ marginLeft: "35px", marginBottom: 1, marginTop: 3 }}
        >
          Hello Admin
        </Typography>

        {/* Tabs - Center */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="admin tabs"
          centered
          sx={{ marginBottom: -2 }}
        >
          <Tab label="Categories" />
          <Tab label="Products" />
          <Tab label="Customers" />
          <Tab label="Statistics" />
        </Tabs>

        {/* Tab content */}
        {value === 0 && (
          <Categories products={products} categories={categories} />
        )}
        {value === 1 && (
          <AdminProduts
            products={products}
            users={users}
            categories={categories}
          />
        )}
        {value === 2 && <Customers products={products} users={users} />}
        {value === 3 && <Statistics products={products} users={users} />}
      </Box>
    </Container>
  );
};

export default AdminMode;
