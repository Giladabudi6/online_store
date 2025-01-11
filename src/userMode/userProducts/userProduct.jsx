/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../../redux/actions/cartActions";
import { Button, Box, Typography } from "@mui/material";

const UserProduct = ({ product, users }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItem = cart.find((item) => item.productId === product.id);
  const amount = cartItem ? cartItem.qty : 0;

  // Handle cart quantity update
  const updateCartQuantityHandler = (change) => {
    const currentQty = cartItem ? cartItem.qty : 0;
    const newQty = currentQty + change;

    if (newQty > product.inStock) {
      alert("Cannot add more than available stock!");
      return;
    }

    if (newQty < 0) {
      return;
    }

    dispatch(updateQuantity(product.id, change));
  };

  // Filter bought products
  const filterBoughtProduts = () => {
    const bought = users
      .filter((user) => user.shareUserData)
      .map((user) =>
        user.orders.filter((order) => order.productId === product.id)
      )
      .reduce((x, y) => [...x, ...y], []);
    return bought.length;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid rgb(83, 152, 222)",
        borderRadius: "10px",
        padding: "10px",
        margin: "5px",
        width: "310px",
        height: "200px",
        marginLeft: "25px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* Product Details */}
      <Box sx={{ flex: 1, margin: "10px" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "8px", textAlign: "left" }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ marginBottom: "8px", textAlign: "left" }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "8px", textAlign: "left" }}
        >
          Price: {product.price}$
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "8px", textAlign: "left" }}
        >
          In Stock: {product.inStock}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "8px", textAlign: "left" }}
        >
          Bought: {filterBoughtProduts()}
        </Typography>
      </Box>

      {/* Product Image */}
      {product.picture && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px",
            marginTop: "5px",
          }}
        >
          <img
            src={product.picture}
            alt={product.title}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "190px",
              maxHeight: "150px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          {/* Quantity Controls */}
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {/* Decrease Quantity Button */}
            <Button
              variant="outlined"
              onClick={() => updateCartQuantityHandler(-1)}
              sx={{
                fontSize: "16px",
                padding: "2px 4px",
                minWidth: "30px",
                borderColor: "#1976d2",
                borderRadius: 20,
                color: "#1976d2",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              -
            </Button>

            <Typography
              variant="body2"
              sx={{
                padding: "0 6px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {amount}
            </Typography>

            {/* Increase Quantity Button */}
            <Button
              variant="outlined"
              onClick={() => updateCartQuantityHandler(1)}
              sx={{
                fontSize: "16px",
                padding: "2px 4px",
                minWidth: "30px",
                borderColor: "#1976d2",
                borderRadius: 20,
                color: "#1976d2",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              +
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserProduct;
