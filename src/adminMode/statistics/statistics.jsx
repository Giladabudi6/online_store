/* eslint-disable react/prop-types */
import { Typography, Grid } from "@mui/material";
import PieGraph from "./pieGraph";
import BarGraph from "./barGraph";

const Statistics = ({ users, products }) => {
  return (
    <>
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 3.5, marginTop: 4 }}
      >
        Statistics
      </Typography>

      {/* Graphs Section */}
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Pie Graph */}
        <Grid item>
          <PieGraph products={products} users={users} />
        </Grid>
        {/* Bar Graph */}
        <Grid item>
          <BarGraph products={products} users={users} />
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
