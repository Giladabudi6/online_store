import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserProducts from "./userProducts/userProducts";
import MyOrders from "./myOrders/myOrders";
import MyAccount from "./myAccount/myAccount";
import { Tab, Tabs, Box, Typography, Container, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const UserMode = () => {
  const users = useSelector((state) => state.users || []);
  const products = useSelector((state) => state.products || []);
  const categories = useSelector((state) => state.categories || []);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const theme = useTheme(); 
  const [value, setValue] = useState(0); 

  // Load user data
  useEffect(() => {
    const fetchUser = async () => {
      const foundUser = users.find((u) => u.id === userId);
      setUser(foundUser);
      setIsLoading(false);
    };

    fetchUser();
  }, [userId, users]);

  const handleChange = (newValue) => {
    setValue(newValue); 
  };

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>Error: User not found!</div>;
  }

  return (
    <Container
      maxWidth="false"
      sx={{
        width: "1200px", 
        margin: "0 auto", 
        position: "relative", 
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
        {/* Log Out button - Top right corner */}
        <Button
          variant="outlined"
          sx={{
            position: "absolute",
            top: 16,
            right: 40,
            fontSize: "14px",
            borderRadius: 2,
            padding: "6px 12px",
            textTransform: "none",
          }}
          onClick={() => navigate("/")}
        >
          Log Out
        </Button>

        {/* Greeting title */}
        <Typography
          variant="h4"
          align="left"
          sx={{ marginLeft: "35px", marginBottom: 1, marginTop: 3 }}        >
                    

          Hello {user.firstName}
        </Typography>

        {/* Tabs - Centered */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="user tabs"
          centered
        >
          <Tab label="Products" />
          <Tab label="My Orders" />
          <Tab label="My Account" />
        </Tabs>

        {/* Tab content */}
        {value === 0 && (
          <UserProducts
            products={products}
            categories={categories}
            user={user}
            setUser={setUser}
            users={users}
          />
        )}
        {value === 1 && <MyOrders products={products} user={user} />}
        {value === 2 && <MyAccount user={user} users={users} />}
      </Box>
    </Container>
  );
};

export default UserMode;
