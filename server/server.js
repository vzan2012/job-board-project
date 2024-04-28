import "dotenv/config";
import cors from "cors";
import express from "express";

import { authMiddleware, handleLogin } from "./auth.js";

const app = express();

app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

app.listen({ port: process.env.PORT }, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
