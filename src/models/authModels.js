import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

const usersCollection = collection(db, "users");

export const findUserByEmailAndPassword = async (email, password) => {
  const q = query(
    usersCollection,
    where("email", "==", email),
    where("password", "==", password)
  );
  const snapshot = await getDocs(q);
  return snapshot;
};