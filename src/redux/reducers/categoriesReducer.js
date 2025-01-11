// Initial state is an empty array
const initialState = [];

// Reducer function for category actions
const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_CATEGORIES":
      return action.payload;

    default:
      return state;
  }
};

export default categoriesReducer;
