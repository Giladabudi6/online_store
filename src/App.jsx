import { useEffect } from "react";
import { useDispatch } from "react-redux";
import db from "./firebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import LogIn from "./logIn/logInPage";
import NewUser from "./login/newUser";
import AdminMode from "./adminMode/adminMode";
import UserMode from "./userMode/userMode";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch users data from Firestore and dispatch to store
    const usersQuery = query(collection(db, "users"));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "LOAD_USERS", payload: users });
    });

    // Fetch products data from Firestore and dispatch to store
    const productsQuery = query(collection(db, "products"));
    const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "LOAD_PRODUCTS", payload: products });
    });

    // Fetch categories data from Firestore and dispatch to store
    const categoriesQuery = query(collection(db, "categories"));
    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "LOAD_CATEGORIES", payload: categories });
    });

    // Clean up listeners on component unmount
    return () => {
      unsubscribeUsers();
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/NewUser" element={<NewUser />} />
      <Route path="/UserMode" element={<UserMode />} />
      <Route path="/AdminMode" element={<AdminMode />} />
    </Routes>
  );
};

export default App;
