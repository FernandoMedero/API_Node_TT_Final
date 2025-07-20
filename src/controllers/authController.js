import jwt from "jsonwebtoken";
import { loginUser } from "../services/authService.js";

/*
const default_user = {
  id: 1,
  email: "apinode@prueba.com.comentado",
  password: "password.comentado",
};
*/
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);

    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    const payload = { id: user.id };
    const expiration = { expiresIn: "1h" };

    const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);
    res.json({ token });
    return res.status(200).json({ user: result.user });
  } catch (error) {
    console.error("Error en loginController:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
  /*
  const user = { id: 1, email };

  if (email === default_user.email && password === default_user.password) {
    const payload = { id: user.id };
    const expiration = { expiresIn: "1h" };

    const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);
    res.json({ token });
  } else {
    res.sendStatus(401).json({error: 'Sus credenciales no coinciden ....'})
  }
    */
};
