// Initial state is an empty array
const initialState = [];

// Reducer function for product actions
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return action.payload;

    default:
      return state;
  }
};

export default productsReducer;
