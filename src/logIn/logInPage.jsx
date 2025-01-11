import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";

// LogIn component
const LogIn = () => {
  // State variabls for user input
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Fetch users from Redux store
  const users = useSelector((state) => state.users || []);
  const navigate = useNavigate();
  const theme = useTheme();

  // Handle login logic
  const handleLogin = () => {
    const user = users.find(
      (u) => userName === u.userName && password === u.password
    );
    if (!user) {
      alert("Error: Invalid username or password!");
      return;
    }
    if (user.mode === "admin") {
      navigate("/AdminMode");
      return;
    }
    sessionStorage.userId = user.id;
    navigate("/UserMode");
  };

  // Render login form
  return (
    <Box
      sx={{
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 3,
        padding: 4,
        width: "400px",
        margin: "auto",
        marginTop: 8,
        backgroundColor: theme.palette.secondary.main,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      {/* Welcome message */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          color: "black",
        }}
      >
        Welcome to Online Store
      </Typography>
      {/* User Name input field */}
      <TextField
        fullWidth
        variant="outlined"
        label="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        inputProps={{ maxLength: 30 }}
      />
      {/* Password input field */}
      <TextField
        fullWidth
        variant="outlined"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        inputProps={{ maxLength: 30 }}
      />
      {/* Log In button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{
          padding: 1,
          textTransform: "none",
          fontSize: "16px",
          marginBottom: 2,
        }}
      >
        Log In
      </Button>
      {/* Link to registration page */}
      <Typography
        variant="body2"
        sx={{
          marginTop: 2,
          color: "black",
        }}
      >
        New user?{" "}
        <Link
          to="/newUser"
          style={{
            textDecoration: "none",
            color: theme.palette.primary.main,
          }}
        >
          Register
        </Link>
      </Typography>
    </Box>
  );
}

export default LogIn;
