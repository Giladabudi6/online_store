/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  placeOrder,
  removeFromCart,
} from "../../redux/actions/cartActions";
import { getProductById } from "../../utils";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ products, updateUser }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const totalAmount = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      total += product.price * item.qty;
    }
    return total;
  }, 0);

  const handleOrder = async () => {
    try {
      await updateUser(cart);
      console.log("Order placed successfully");
      dispatch(placeOrder());
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // Handle removing product from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Card
      sx={{
        padding: 1.5,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Cart Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
      >
        Shopping Cart
      </Typography>
      <Divider sx={{ marginBottom: 1 }} />
      {cart.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: "0.9rem" }}
        >
          The cart is empty.
        </Typography>
      ) : (
        <Box>
          {cart.map((item) => {
            const product = getProductById(item.productId, products);
            return (
              <Box key={item.productId} sx={{ marginBottom: 1 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* Product Details */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ flexGrow: 1 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "1rem", marginTop: 1 }}
                    >
                      {product.price.toFixed(2)}$
                    </Typography>
                  </Box>
                  {/* Remove Product Button */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ marginTop: 1 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFromCart(item.productId)}
                      sx={{
                        fontSize: "2.5rem",
                        "&:hover": {
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "2rem" }} />
                    </IconButton>
                  </Box>
                </Box>
                {/* Total Price */}
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ marginTop: 1 }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "1rem" }}
                  >
                    Total: {(item.qty * product.price).toFixed(2)}$
                  </Typography>
                </Box>
                {/* Quantity Controls */}
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: 1 }}
                >
                  {/* Decrease Quantity Button */}
                  <IconButton
                    size="small"
                    onClick={() => dispatch(updateQuantity(item.productId, -1))}
                    disabled={item.qty === 1}
                  >
                    <RemoveIcon sx={{ fontSize: "2rem" }} />
                  </IconButton>
                  <Typography variant="body2" sx={{ mx: 1, fontSize: "1rem" }}>
                    {item.qty}
                  </Typography>
                  {/* Increase Quantity Button */}
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (item.qty + 1 > product.inStock) {
                        alert("Cannot add more than available stock!");
                        return;
                      }
                      dispatch(updateQuantity(item.productId, 1));
                    }}
                  >
                    <AddIcon sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 1 }} />
              </Box>
            );
          })}
          {/* Total Amount */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: 1 }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              Total:
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              {totalAmount.toFixed(2)}$
            </Typography>
          </Box>
          {/* Place Order Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleOrder}
            sx={{ marginTop: 1.5, textTransform: "none", fontSize: "1rem" }}
          >
            Place Order
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default Cart;
