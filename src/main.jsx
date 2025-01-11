import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./redux/reducers/usersReducer.js";
import productsReducer from "./redux/reducers/productsReducer.js";
import categoriesReducer from "./redux/reducers/categoriesReducer.js";
import cartReducer from "./redux/reducers/cartReducer.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Combine reducers to manage app state
const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

// Create a custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(83, 152, 222)", // Primary color
    },
    secondary: {
      main: "rgb(250, 253, 239)", // Secondary color
    },
  },
  typography: {
    fontFamily: "'Lora', serif", // Font style
  },
});

// Render the app with providers
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter> 
        <ThemeProvider theme={theme}> 
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
