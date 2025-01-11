/* eslint-disable react/prop-types */

import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Box, Typography, Grid } from "@mui/material";
import { getProductById } from "../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieGraph = ({ users, products }) => {
  // Calculate product sales frequencies
  const productCounts = useMemo(() => {
    if (!users.length || !products.length) return {};
    const counts = {};
    users.forEach((user) => {
      user.orders.forEach((order) => {
        const productId = order.productId;
        counts[productId] = (counts[productId] || 0) + 1;
      });
    });
    return counts;
  }, [users, products]);

  // Prepare data for pie chart
  const chartData = useMemo(() => {
    const labels = [];
    const data = [];
    const backgroundColors = [];

    Object.entries(productCounts).forEach(([productId, count], index) => {
      const product = getProductById(productId, products);
      if (product) {
        labels.push(product.title);
        data.push(count);
        const color = `hsl(${(index * 50) % 360}, 70%, 60%)`;
        backgroundColors.push(color);
      }
    });

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  }, [productCounts, products]);

  // Chart options
  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    layout: {
      padding: 28,
    },
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        font: {
          size: 17,
          weight: "bold",
        },
        formatter: (value) => value,
        align: "center",
        anchor: "center",
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  // Render pie chart
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: "flex-start", alignItems: "center" }}
      >
        {/* Pie Chart */}
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
            <Typography
              variant="h6"
              gutterBottom
              sx={{ marginBottom: -3, marginTop: 3 }}
            >
              Total Sold Products
            </Typography>

            <Pie data={chartData} options={chartOptions} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PieGraph;
