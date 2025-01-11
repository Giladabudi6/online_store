/* eslint-disable react/prop-types */

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography, Select, MenuItem, Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getProductById } from "../../utils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarGraph = ({ users, products }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to group orders into chart-ready data
  const getGroupedOrders = (orders) => {
    return orders.reduce((acc, order) => {
      const product = getProductById(order.productId, products);
      if (!product) return acc;

      const existingOrder = acc.find(
        (item) => item.productId === order.productId
      );

      if (existingOrder) {
        existingOrder.qty += 1;
      } else {
        acc.push({
          productId: order.productId,
          title: product.title,
          qty: 1,
        });
      }

      return acc;
    }, []);
  };

  const defaultGroupedOrders = [{ title: "No Data", qty: 0 }];

  const groupedOrders = selectedUser
    ? getGroupedOrders(selectedUser.orders).sort((a, b) => a.qty - b.qty)
    : defaultGroupedOrders;

  const chartData = {
    labels: groupedOrders.map((order) => order.title),
    datasets: [
      {
        label: "",
        data: groupedOrders.map((order) => order.qty),
        backgroundColor: groupedOrders.map(
          (_, index) => `hsl(${index * 50}, 70%, 50%)`
        ),
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        font: {
          size: 17,
          weight: "bold",
        },
        align: "center",
        anchor: "center",
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        ticks: {
          color: "black",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  // Render bar chart
  return (
    <Grid
      container
      spacing={3}
      sx={{ justifyContent: "flex-start", alignItems: "center" }}
    >
      <Grid item>
        <Box
          sx={{
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: 3,
            width: "470px",
            height: "470px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #1976d2",
          }}
        >
          {/* Title */}
          <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
            Products Quantity Per Customer
          </Typography>

          {/* Select customer dropdown */}
          <Select
            value={
              selectedUser
                ? `${selectedUser.firstName}${selectedUser.lastName}`
                : "default"
            }
            onChange={(e) => {
              const selectedValue = e.target.value;
              const selected =
                selectedValue === "default"
                  ? null
                  : users.find(
                      (user) =>
                        `${user.firstName}${user.lastName}` === selectedValue
                    );
              setSelectedUser(selected);
            }}
            sx={{ width: "200px", marginBottom: 13.5 }}
          >
            <MenuItem value="default">Select Customer</MenuItem>
            {users
              .filter((u) => u.mode !== "admin")
              .map((user) => (
                <MenuItem
                  key={user.id}
                  value={`${user.firstName}${user.lastName}`}
                >
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
          </Select>

          {/* Bar chart */}
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BarGraph;
