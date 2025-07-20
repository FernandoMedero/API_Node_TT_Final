import { findUserByEmailAndPassword } from "../models/authModels.js";

export const loginUser = async (email, password) => {
  const snapshot = await findUserByEmailAndPassword(email, password);

  if (snapshot.empty) {
    return { success: false, message: "Usuario o contraseña incorrectos" };
  }

  const user = snapshot.docs[0].data();
  return { success: true, user };
};