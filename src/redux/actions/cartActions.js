// Action to add a product to the cart with quantity and date
export const addToCart = (productId, quantity, date) => ({
  type: "ADD_TO_CART",
  payload: { productId, quantity, date },
});

// Action to remove a product from the cart by its ID
export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

// Action to update the quantity of a specific product in the cart
export const updateQuantity = (productId, change) => ({
  type: "UPDATE_QUANTITY",
  payload: { productId, change },
});

// Action to place an order and clear the cart
export const placeOrder = () => ({
  type: "PLACE_ORDER",
});
