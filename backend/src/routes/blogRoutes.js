import { Router } from "express";
import crypto from "crypto";
import { pool } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();

const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "");

const toApi = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt || "",
  image: row.image || "",
  alt: row.alt || "",
  date: row.date || "",
  metaDescription: row.meta_description || "",
  published: !!row.published,
  sections: typeof row.sections === "string" ? JSON.parse(row.sections || "[]") : row.sections || [],
  created_at: row.created_at,
  updated_at: row.updated_at,
});

// Public
router.get("/blog", async (_req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM blog_posts WHERE published = 1 ORDER BY date DESC LIMIT 200"
  );
  res.json(rows.map(toApi));
});

router.get("/blog/:slug", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM blog_posts WHERE slug = ? AND published = 1",
    [req.params.slug]
  );
  if (!rows.length) return res.status(404).json({ detail: "Post not found" });
  res.json(toApi(rows[0]));
});

// Admin
router.get("/admin/blog", requireAuth, async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM blog_posts ORDER BY date DESC LIMIT 500");
  res.json(rows.map(toApi));
});

function readPayload(body) {
  const { title, slug, excerpt = "", image = "", alt = "", date = "",
    metaDescription = "", published = true, sections = [] } = body || {};
  if (!title) return { error: "Judul wajib diisi." };
  return {
    title,
    slug: slugify(slug || title),
    excerpt, image, alt,
    date: date || new Date().toISOString().slice(0, 10),
    meta_description: metaDescription,
    published: published ? 1 : 0,
    sections: JSON.stringify(
      sections.map((s) => ({ heading: s.heading || null, paragraphs: s.paragraphs || [] }))
    ),
  };
}

router.post("/admin/blog", requireAuth, async (req, res) => {
  const data = readPayload(req.body);
  if (data.error) return res.status(422).json({ detail: data.error });
  const [dupes] = await pool.query("SELECT id FROM blog_posts WHERE slug = ?", [data.slug]);
  if (dupes.length) return res.status(400).json({ detail: "Slug sudah digunakan. Gunakan judul/slug lain." });
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await pool.query(
    `INSERT INTO blog_posts (id, slug, title, excerpt, image, alt, date, meta_description, published, sections, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, data.slug, data.title, data.excerpt, data.image, data.alt, data.date,
     data.meta_description, data.published, data.sections, now, now]
  );
  const [rows] = await pool.query("SELECT * FROM blog_posts WHERE id = ?", [id]);
  res.json(toApi(rows[0]));
});

router.put("/admin/blog/:id", requireAuth, async (req, res) => {
  const data = readPayload(req.body);
  if (data.error) return res.status(422).json({ detail: data.error });
  const [result] = await pool.query(
    `UPDATE blog_posts SET slug=?, title=?, excerpt=?, image=?, alt=?, date=?, meta_description=?, published=?, sections=?, updated_at=?
     WHERE id=?`,
    [data.slug, data.title, data.excerpt, data.image, data.alt, data.date,
     data.meta_description, data.published, data.sections, new Date().toISOString(), req.params.id]
  );
  if (!result.affectedRows) return res.status(404).json({ detail: "Post not found" });
  const [rows] = await pool.query("SELECT * FROM blog_posts WHERE id = ?", [req.params.id]);
  res.json(toApi(rows[0]));
});

router.delete("/admin/blog/:id", requireAuth, async (req, res) => {
  const [result] = await pool.query("DELETE FROM blog_posts WHERE id = ?", [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ detail: "Post not found" });
  res.json({ deleted: true });
});

export default router;
