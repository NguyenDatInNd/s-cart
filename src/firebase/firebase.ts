import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt1qKWaXxcAFs-_kVhRNpwyuGbUqJn0Vg",
  authDomain: "shop-app-e6905.firebaseapp.com",
  projectId: "shop-app-e6905",
  storageBucket: "shop-app-e6905.appspot.com",
  messagingSenderId: "660865077422",
  appId: "1:660865077422:web:7afe7159ec63b08ac2dd3f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
