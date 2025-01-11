/* eslint-disable react/prop-types */
import { useState } from "react";
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

const AddProduct = ({ products, categories, addProduct, setDisplayAddProduct,}) => {
  // State variables
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "Not Selected",
    price: "",
    description: "",
    picture: "",
    inStock: "",
  });
  const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle add product click
  const handleAddClick = async () => {
    const trimmedTitle = newProduct.title.trim();
    if (!trimmedTitle) {
      alert("Product title cannot be empty!");
      return;
    }

    const price = newProduct.price;
    if (price < 1 || isNaN(price)) {
      alert("Product price must be a valid number!");
      return;
    }

    const trimmedCategory = newProduct.category.trim();
    if (!trimmedCategory || trimmedCategory === "Not Selected") {
      alert("Please select a valid category!");
      return;
    }

    const inStock = newProduct.inStock;
    if (inStock < 0 || isNaN(inStock)) {
      alert("Product in-store quantity must be a valid number!");
      return;
    }

    const isExists = products.some(
      (product) => product.title.toLowerCase() === trimmedTitle.toLowerCase()
    );
    if (isExists) {
      alert("This product already exists!");
      return;
    }

    let pictureURL = "";
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        pictureURL = reader.result;
        saveProduct(pictureURL);
      };
      reader.readAsDataURL(file);
    } else {
      saveProduct(pictureURL);
    }
  };

  // Save new product
  const saveProduct = (pictureURL) => {
    const newProductData = {
      ...newProduct,
      picture: pictureURL,
    };

    addProduct(newProductData);
    setDisplayAddProduct(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "65vh",
      }}
    >
      <Box
        sx={{
          border: "2px solid rgb(83, 152, 222)",
          borderRadius: "10px",
          padding: "20px",
          margin: "10px",
          maxWidth: "500px",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* Title input */}
        <TextField
          label="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          fullWidth
          sx={{ marginBottom: "10px" }}
          size="small"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
        />

        {/* Category select */}
        <FormControl fullWidth sx={{ marginBottom: "10px" }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            label="Category"
            size="small"
          >
            <MenuItem value="Not Selected">Not Selected</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.title}>{category.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price input */}
        <TextField
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) => {
            let value = +e.target.value;
            if (value < 1) {
              value = 1;
            } else if (value > 1000) {
              value = 1000;
            }
            setNewProduct({ ...newProduct, price: value });
          }}
          fullWidth
          sx={{ marginBottom: "10px" }}
          size="small"
          inputProps={{ min: 1, max: 1000 }}
        />

        {/* Description input */}
        <TextField
          label="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          fullWidth
          multiline
          rows={2}
          sx={{ marginBottom: "10px" }}
          size="small"
          inputProps={{ maxLength: 60 }}
        />

        {/* In-Stock input */}
        <TextField
          label="In-Stock"
          type="number"
          value={newProduct.inStock}
          onChange={(e) => {
            let value = +e.target.value;
            if (value < 0) {
              value = 0;
            } else if (value > 10000) {
              value = 10000;
            }
            setNewProduct({ ...newProduct, inStock: value });
          }}
          fullWidth
          sx={{ marginBottom: "10px" }}
          size="small"
          inputProps={{ min: 0, max: 10000 }}
        />

        {/* Image upload */}
        <Box sx={{ marginBottom: "10px" }}>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            Upload Image:
          </Typography>
          <Button
            variant="outlined"
            component="label"
            sx={{
              fontSize: "12px",
              padding: "4px 10px",
              borderColor: "rgb(83, 152, 222)",
              color: "rgb(83, 152, 222)",
              "&:hover": {
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Choose Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {file && (
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                Selected Image:
              </Typography>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Add and Cancel buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleAddClick}
            sx={{
              fontSize: "14px",
              padding: "6px 12px",
              borderColor: "rgb(83, 152, 222)", 
              color: "rgb(83, 152, 222)", 
              "&:hover": {
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            onClick={() => setDisplayAddProduct(false)}
            sx={{
              fontSize: "14px",
              padding: "6px 12px",
              borderColor: "#d32f2f",
              color: "#d32f2f",
              "&:hover": {
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddProduct;
