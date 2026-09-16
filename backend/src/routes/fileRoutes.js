import { Router } from "express";
import crypto from "crypto";
import multer from "multer";
import { pool } from "../db.js";
import { requireAuth } from "../auth.js";
import { putObject, getObject } from "../storage.js";

const router = Router();
const APP_NAME = "theweddingcars";
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

const MIME = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

router.post("/admin/upload", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(422).json({ detail: "File wajib diisi." });
  const ext = (req.file.originalname.split(".").pop() || "").toLowerCase();
  const contentType = MIME[ext];
  if (!contentType) return res.status(400).json({ detail: "Hanya file gambar (jpg/png/webp) yang diizinkan." });
  const path = `${APP_NAME}/blog/${crypto.randomUUID()}.${ext}`;
  const result = await putObject(path, req.file.buffer, contentType);
  await pool.query(
    `INSERT INTO files (id, storage_path, original_filename, content_type, size, is_deleted, uploaded_by, created_at)
     VALUES (?, ?, ?, ?, ?, 0, ?, ?)`,
    [crypto.randomUUID(), result.path, req.file.originalname, contentType, result.size,
     req.user.email, new Date().toISOString()]
  );
  res.json({ path: result.path, url: `/api/files/${result.path}` });
});

router.get("/files/*", async (req, res) => {
  const path = req.params[0];
  const [rows] = await pool.query(
    "SELECT * FROM files WHERE storage_path = ? AND is_deleted = 0", [path]
  );
  if (!rows.length) return res.status(404).json({ detail: "File not found" });
  try {
    const { data, contentType } = await getObject(path);
    res.setHeader("Content-Type", rows[0].content_type || contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(data);
  } catch {
    res.status(404).json({ detail: "File not found" });
  }
});

export default router;
