import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API REST con NODE JS" });
});

import productsRouter from "./src/routes/productsRoutes.js";
app.use("/api", productsRouter);

import authRouter from "./src/routes/authRouter.js";
app.use("/api/auth", authRouter);

import notFound from "./src/middlewares/not-found.js";
app.use(notFound);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
