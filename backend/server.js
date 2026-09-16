import "./src/env.js";

import express from "express";
import cors from "cors";
import { pool, initSchema } from "./src/db.js";
import { seedAdmin, seedBlog } from "./src/seed.js";
import { initStorage } from "./src/storage.js";
import authRoutes from "./src/routes/authRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";

const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || "*").split(","),
    credentials: true,
  })
);

const api = express.Router();
api.get("/", (_req, res) => res.json({ message: "The Wedding Cars API" }));
api.use("/auth", authRoutes);
api.use(blogRoutes);
api.use(fileRoutes);
app.use("/api", api);

const PORT = 8001;

async function start() {
  await initSchema();
  await seedAdmin();
  await seedBlog();
  try {
    await initStorage();
    console.log("Object storage initialized");
  } catch (err) {
    console.error("Storage init failed:", err.message);
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`API listening on 0.0.0.0:${PORT}`));
}

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});

start().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
