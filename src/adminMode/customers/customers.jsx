/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Customers = ({ products, users }) => {
  // Create customer table
  const createTable = (customers) => {
    if (!customers || customers.length === 0) {
      return <Typography>No customers available</Typography>;
    }

    return (
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          marginBottom: "20px",
          border: "1px solid #1976d2",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "25%",
                  textAlign: "center",
                }}
              >
                <strong>Full Name</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <strong>Joined At</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "55%",
                  textAlign: "center",
                }}
              >
                <strong>Products Bought</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell
                  sx={{ textAlign: "center" }}
                >{`${customer.firstName} ${customer.lastName}`}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {customer.joinDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {ProductsTable(customer.orders)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Create products table
  const ProductsTable = (orders) => {
    if (!orders || orders.length === 0) {
      return <Typography>No products available</Typography>;
    }

    // Group orders by product and date
    const groupedOrders = {};

    // Process and group data
    orders.forEach((order) => {
      const key = `${order.productId}-${order.date}`;
      if (!groupedOrders[key]) {
        groupedOrders[key] = { ...order, qty: 0 };
      }
      groupedOrders[key].qty += order.qty || 1; // Sum quantities with default 1
    });

    const groupedOrdersArray = Object.keys(groupedOrders).map(
      (key) => groupedOrders[key]
    );

    return (
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #1976d2",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "45%",
                  textAlign: "center",
                }}
              >
                <strong>Product</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "10%",
                  textAlign: "center",
                }}
              >
                <strong>Quantity</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "45%",
                  textAlign: "center",
                }}
              >
                <strong>Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedOrdersArray.map((order) => {
              const prod = products.find(
                (product) => product.id === order.productId
              );
              return (
                <TableRow key={`${order.productId}-${order.date}`}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {prod ? prod.title : "Unknown product"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.qty > 0 ? order.qty : "0"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.date || "Unknown date"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Render customers section
  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 3.5, marginTop: 1.5 }}
      >
        Customers
      </Typography>

      {/* Customer table */}
      {createTable(users.filter((user) => user.mode === "customer"))}
    </Box>
  );
}

export default Customers;
