// Utility function to get the current date in DD-MM-YYYY format
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Format day with leading zero
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
};

// Find a user by ID from a list of users
const getUserById = (id, users) => {
  return users.find((user) => user.id === id);
};

// Find a product by ID from a list of products
const getProductById = (id, products) => {
  return products.find((product) => product.id === id);
};

export { getCurrentDate, getUserById, getProductById };
