/* eslint-disable no-case-declarations */
const initialState = [];

// Reducer function for cart actions
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_QUANTITY":
      // Update quantity of existing product
      const { productId, change } = action.payload;
      const existingItemIndex = state.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        const updatedState = [...state];
        const updatedItem = { ...updatedState[existingItemIndex] };

        updatedItem.qty = Math.max(updatedItem.qty + change, 0);
        if (updatedItem.qty === 0) {
          updatedState.splice(existingItemIndex, 1); 
        } else {
          updatedState[existingItemIndex] = updatedItem;
        }

        return updatedState;
      }

      if (change > 0) {
        return [...state, { productId, qty: change }];
      }

      return state;

    case "PLACE_ORDER":
      // Clear cart after order
      return [];

    case "REMOVE_FROM_CART":
      // Remove product from cart
      return state.filter((item) => item.productId !== action.payload);

    default:
      return state;
  }
};

export default cartReducer;
