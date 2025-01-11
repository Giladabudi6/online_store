import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkF17VD4quEckLECJ25ASkOAt6s1QMkng",
  authDomain: "onlinestore-2764d.firebaseapp.com",
  projectId: "onlinestore-2764d",
  storageBucket: "onlinestore-2764d.firebasestorage.app",
  messagingSenderId: "359660997859",
  appId: "1:359660997859:web:f164f447c015b58ef489d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export default db;
export { storage };
