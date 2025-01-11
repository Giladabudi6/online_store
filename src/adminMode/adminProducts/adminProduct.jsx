/* eslint-disable react/prop-types */
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AdminProduct = ({ users, product, products, categories, updateProduct }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleUpdateClick = () => {
    const trimmedTitle = updatedProduct.title.trim();
    if (!trimmedTitle) {
      alert("Product title cannot be empty!");
      return;
    }

    const price = updatedProduct.price;
    if (price < 0 || isNaN(price)) {
      alert("Product price must be a valid number!");
      return;
    }

    const inStock = updatedProduct.inStock;
    if (inStock < 0 || isNaN(inStock)) {
      alert("Product in-store quantity must be a valid number!");
      return;
    }

    const isExists = products
      .filter((prod) => prod.id !== updatedProduct.id)
      .some(
        (product) => product.title.toLowerCase() === trimmedTitle.toLowerCase()
      );
    if (isExists) {
      alert("This product already exists!");
      return;
    }

    updateProduct({ ...updatedProduct });
  };

  const boughtByTable = () => {
    const productOrders = users.flatMap((user) =>
      user.orders
        .filter((order) => order.productId === product.id)
        .map((order) => ({
          name: `${user.firstName}${" "}${user.lastName}`,
          date: order.date,
        }))
    );

    // קיבוץ לפי שם ותאריך וספירת כמות ההזמנות
    const groupedOrders = Object.values(
      productOrders.reduce((acc, order) => {
        const key = `${order.name}-${order.date}`; // מפתח ייחודי לפי שם ותאריך
        if (!acc[key]) {
          acc[key] = { ...order, quantity: 1 }; // יצירת רשומה חדשה עם כמות ראשונית 1
        } else {
          acc[key].quantity += 1; // הוספת כמות להזמנות קיימות
        }
        return acc;
      }, {})
    );

    if (groupedOrders.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          No purchases for this product yet.
        </Typography>
      );
    }

    return (
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          marginTop: "5px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  textAlign: "center",
                  minWidth: "80px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  textAlign: "center",
                  minWidth: "80px",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  textAlign: "center",
                  minWidth: "80px",
                }}
              >
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{order.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {order.quantity}
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // ארגון אופקי
        justifyContent: "space-between", // פיזור שווה בין העמודות
        alignItems: "flex-start", // יישור עליון
        gap: "20px", // מרווח בין העמודות
        padding: "10px",
        border: "1px solid rgb(83, 152, 222)",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        width: "970px",
      }}
    >
      {/* עמודה שמאלית: שדות ועדכון */}
      <Box
        sx={{
          flex: "2", // תופס שטח יחסי
          maxWidth: "300px", // מגביל את הרוחב
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "9px",
          marginBottom: "7px",
        }}
      >
        <TextField
          label="Title"
          value={updatedProduct.title}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              title: e.target.value,
            })
          }
          fullWidth
          size="small"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={updatedProduct.category}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, category: e.target.value })
            }
            label="Category"
            size="small"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Price"
          type="number"
          value={updatedProduct.price}
          onChange={(e) => {
            let value = +e.target.value;
            if (value < 1) {
              value = 1;
            } else if (value > 1000) {
              value = 1000;
            }
            setUpdatedProduct({ ...updatedProduct, price: value });
          }}
          inputProps={{ min: 1, max: 1000 }}
          fullWidth
          size="small"
        />

        <TextField
          label="Description"
          value={updatedProduct.description}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              description: e.target.value,
            })
          }
          fullWidth
          multiline
          rows={2}
          size="small"
          inputProps={{ maxLength: 60 }}
        />

<TextField
  label="In Stock"
  type="number"
  value={updatedProduct.inStock}
  onChange={(e) => {
    let value = +e.target.value;
    if (value < 0) {
      value = 0;
    } else if (value > 10000) {
      value = 10000;
    }
    setUpdatedProduct({ ...updatedProduct, inStock: value });
  }}
  fullWidth
  size="small"
  inputProps={{ min: 0, max: 10000 }}
/>


        <Box
          sx={{
            display: "flex",
            //justifyContent: "space-between",
            gap: "8px",
            margin: "auto",
          }}
        >
          <Button
            variant="contained"
            onClick={handleUpdateClick}
            sx={{
              fontSize: "14px",
              padding: "6px 12px",
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            onClick={() => setUpdatedProduct(product)}
            sx={{
              fontSize: "14px",
              padding: "6px 12px",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* עמודה מרכזית: טבלה */}
      <Box
        sx={{
          flex: "2",
          maxWidth: "360px", // רוחב מירבי לטבלה
          maxHeight: "300px", // הגובה המקסימלי, ניתן לשנות לפי הצורך
          overflowY: "auto", // גלילה אנכית אם התוכן גבוה מדי
          border: "1px solid rgba(0, 0, 0, 0.12)", // תוחם את האזור
          borderRadius: "5px",
          padding: "10px", // ריווח פנימי
          backgroundColor: "#f9f9f9", // רקע לטבלה
          marginTop: "9px",
          marginBottom: "7px",
        }}
      >
        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          Bought by:
        </Typography>

        {/* הטבלה */}
        {boughtByTable()}
      </Box>

      {/* עמודה ימנית: תמונה */}
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "9px",
          marginBottom: "1px",
        }}
      >
        {updatedProduct.picture ? (
          <img
            src={updatedProduct.picture}
            alt={updatedProduct.title}
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "240px",
              maxWidth: "245px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No image available
          </Typography>
        )}
        <Button
          variant="outlined"
          component="label"
          sx={{ fontSize: "14px", padding: "6px 12px", margin: "15px", marginBottom: "2px" ,marginTop: "7px" }}
        >
          Upload New Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    picture: event.target.result,
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </Button>

        {updatedProduct.picture !== product.picture && (
          <Typography variant="caption" color="text.secondary">
            Click &quot;Save Changes&quot; to save
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default AdminProduct;
