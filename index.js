import "dotenv/config";
import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API REST con NODE JS" });
});

import productsRouter from "./src/routes/productsRoutes.js";
app.use("/api", productsRouter);

import authRouter from "./src/routes/authRouter.js";
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
