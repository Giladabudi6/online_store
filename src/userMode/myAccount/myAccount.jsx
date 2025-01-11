/* eslint-disable react/prop-types */
import { useState } from "react";
import db from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";

const MyAccount = ({ user, users }) => {
  const [updatedUserData, setUpdatedUserData] = useState(user);
  const theme = useTheme();

  // Check if username already exists
  const isUserNameExist = (userName) => {
    return users.some(
      (user) => user.userName === userName && user.id !== updatedUserData.id
    );
  };

  // Save and update user data
  const saveChanges = async () => {
    // Field validations
    if (updatedUserData.firstName.length < 2) {
      alert("First name must be at least 2 characters long.");
      return;
    }
    if (updatedUserData.lastName.length < 2) {
      alert("Last name must be at least 2 characters long.");
      return;
    }
    if (updatedUserData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (isUserNameExist(updatedUserData.userName)) {
      alert("Username already exists.");
      return;
    }

    setUpdatedUserData(updatedUserData);
    const userRef = doc(db, "users", user.id);
    try {
      await updateDoc(userRef, updatedUserData);
      alert("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("An error occurred while updating the user.");
    }
  };

  return (
    <>
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        My Account
      </Typography>

      {/* Account details form */}
      <Box
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 3,
          padding: 4,
          width: "400px",
          margin: "auto",
          marginTop: 4,
          backgroundColor: theme.palette.secondary.main,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          {/* First Name input */}
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            value={updatedUserData.firstName}
            onChange={(e) =>
              setUpdatedUserData({
                ...updatedUserData,
                firstName: e.target.value,
              })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
            inputProps={{ maxLength: 30 }}
          />
          {/* Last Name input */}
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            value={updatedUserData.lastName}
            onChange={(e) =>
              setUpdatedUserData({
                ...updatedUserData,
                lastName: e.target.value,
              })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
            inputProps={{ maxLength: 30 }}
          />
          {/* User Name input */}
          <TextField
            fullWidth
            variant="outlined"
            label="User Name"
            value={updatedUserData.userName}
            onChange={(e) =>
              setUpdatedUserData({
                ...updatedUserData,
                userName: e.target.value,
              })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
            inputProps={{ maxLength: 30 }}
          />
          {/* Password input */}
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            value={updatedUserData.password}
            onChange={(e) =>
              setUpdatedUserData({
                ...updatedUserData,
                password: e.target.value,
              })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
            inputProps={{ maxLength: 30 }}
          />
          {/* Allow others to see my orders checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={updatedUserData.shareUserData}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    shareUserData: e.target.checked,
                  })
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
          {/* Save button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={saveChanges}
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
            Save
          </Button>
          {/* Cancel button */}
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => setUpdatedUserData(user)}
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
      </Box>
    </>
  );
}

export default MyAccount;
