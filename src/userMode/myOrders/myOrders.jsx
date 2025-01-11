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
import { getProductById } from "../../utils";

const MyOrders = ({ user, products }) => {
  const handleOrdersTable = (orders) => {
    // Group orders by product and date
    const groupedOrders = orders.reduce((acc, order) => {
      const product = getProductById(order.productId, products);

      if (!product) return acc;

      const existingOrder = acc.find(
        (item) => item.productId === order.productId && item.date === order.date
      );

      if (existingOrder) {
        existingOrder.qty += 1;
        existingOrder.total += product.price;
      } else {
        acc.push({
          productId: order.productId,
          title: product.title,
          qty: 1,
          total: product.price,
          date: order.date,
        });
      }

      return acc;
    }, []);

    if (!groupedOrders || groupedOrders.length === 0) {
      return <Typography>No orders available</Typography>;
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
                <strong>Title</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <strong>Quantity</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "25%",
                  textAlign: "center",
                }}
              >
                <strong>Total</strong>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  width: "30%",
                  textAlign: "center",
                }}
              >
                <strong>Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedOrders.map((order) => (
              <TableRow key={`${order.productId}-${order.date}`}>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.title}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{order.qty}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.total}$
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        My Orders
      </Typography>

      {/* Orders Table */}
      <Box
        sx={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "auto",
          marginTop: -1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {handleOrdersTable(user.orders)}
      </Box>
    </>
  );
}

export default MyOrders;
