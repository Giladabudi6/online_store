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
  const theme = useTheme(); // שימוש ב-useTheme
  const [value, setValue] = useState(0); // ניהול כרטיסיה נבחרת

  // טעינת נתוני המשתמש
  useEffect(() => {
    const fetchUser = async () => {
      const foundUser = users.find((u) => u.id === userId);
      setUser(foundUser);
      setIsLoading(false);
    };

    fetchUser();
  }, [userId, users]);

  const handleChange = (event, newValue) => {
    setValue(newValue); // עדכון כרטיסיה נבחרת
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
        width: "1200px", // גודל קבוע לרוחב
        margin: "0 auto", // מרכז את הקונטיינר
        position: "relative", // המיקום עבור האלמנטים הפנימיים
      }}
    >
      <Box
        sx={{
          border: `3px solid ${theme.palette.primary.main}`,
          padding: 3,
          marginTop: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        {/* כפתור יציאה - במיקום ימני עליון */}
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

        {/* כותרת Hello User */}
        <Typography
          variant="h4"
          align="left"
          sx={{ marginLeft: "30px", marginBottom: 1 }}
        >
          Hello {user.firstName}
        </Typography>

        {/* כרטיסיות - במרכז */}
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

        {/* תוכן לפי כרטיסיה */}
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
}

export default UserMode;
