// Initial state is an empty array
const initialState = [];

// Reducer function for user actions
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USERS":
      return action.payload;

    default:
      return state;
  }
};

export default usersReducer;
