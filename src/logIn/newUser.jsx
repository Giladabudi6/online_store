import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentDate } from "../utils";
import { collection, addDoc, updateDoc,} from "firebase/firestore";
import db from "../firebaseConfig";
import { useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";

// NewUser component
const NewUser = () => {
  // State variables for new user
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    joinDate: getCurrentDate(),
    shareUserData: false,
    mode: "customer",
    orders: [],
  });

  const navigate = useNavigate();
  const users = useSelector((state) => state.users || []);
  const theme = useTheme();

  // Function to add a new user
  const addNewUser = async () => {
    if (newUser.firstName === "" || newUser.lastName === "") {
      alert("First name and last name cannot be empty.");
      return;
    }
    if (newUser.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (users.some((user) => user.userName === newUser.userName)) {
      alert("Username already exists.");
      return;
    }

    try {
      // Add new user to Firebase
      const docRef = await addDoc(collection(db, "users"), newUser);
      await updateDoc(docRef, { id: docRef.id });
      console.log("New user added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding new user: ", error);
      alert("An error occurred while adding the user.");
    }
  };

  // Render new user registration form
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
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          color: "black",
        }}
      >
        New User Registration
      </Typography>

      {/* Input field for first name */}
      <TextField
        fullWidth
        variant="outlined"
        label="First Name"
        value={newUser.firstName}
        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        inputProps={{ maxLength: 30 }}
      />
      {/* Input field for last name */}
      <TextField
        fullWidth
        variant="outlined"
        label="Last Name"
        value={newUser.lastName}
        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        inputProps={{ maxLength: 30 }}
      />
      {/* Input field for username */}
      <TextField
        fullWidth
        variant="outlined"
        label="User Name"
        value={newUser.userName}
        onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        inputProps={{ maxLength: 30 }}
      />
      {/* Input field for password */}
      <TextField
        fullWidth
        variant="outlined"
        type="password"
        label="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
          },
        }}
        inputProps={{ maxLength: 30 }}
      />
      {/* Checkbox for sharing user data */}
      <FormControlLabel
        control={
          <Checkbox
            checked={newUser.shareUserData}
            onChange={(e) =>
              setNewUser({ ...newUser, shareUserData: e.target.checked })
            }
            sx={{ color: theme.palette.primary.main }}
          />
        }
        label="Allow others to see my orders"
        sx={{
          color: "black",
          marginBottom: 2,
        }}
      />
      {/* Create button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={addNewUser}
        sx={{
          padding: 1,
          textTransform: "none",
          fontSize: "16px",
          marginBottom: 2,
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Create
      </Button>
      {/* Cancel button */}
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          padding: 1,
          textTransform: "none",
          fontSize: "16px",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default NewUser;
