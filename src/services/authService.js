import { findUserByEmailAndPassword } from "../models/authModels.js";

export const loginUser = async (email, password) => {
  const snapshot = await findUserByEmailAndPassword(email, password);

  if (snapshot.empty) {
    return { success: false, message: "Usuario o contraseña incorrectos" };
  }

  const doc = snapshot.docs[0];
  const userData = doc.data();
  const user = {
    id: doc.id,               
    email: userData.email
  };

  return { success: true, user };
};