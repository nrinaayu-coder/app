import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { pool } from "./db.js";
import { hashPassword, verifyPassword } from "./auth.js";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!rows.length) {
    await pool.query(
      "INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES (?, ?, ?, 'Admin', 'admin', ?)",
      [crypto.randomUUID(), email, hashPassword(password), new Date().toISOString()]
    );
    console.log(`Admin user seeded: ${email}`);
  } else if (!verifyPassword(password, rows[0].password_hash)) {
    await pool.query("UPDATE users SET password_hash = ? WHERE email = ?", [hashPassword(password), email]);
    console.log("Admin password updated from env");
  }
}

export async function seedBlog() {
  const [rows] = await pool.query("SELECT COUNT(*) AS c FROM blog_posts");
  if (rows[0].c > 0) return;
  const seedFile = path.join(ROOT, "..", "blog_seed.json");
  if (!fs.existsSync(seedFile)) return;
  const posts = JSON.parse(fs.readFileSync(seedFile, "utf8"));
  const now = new Date().toISOString();
  for (const p of posts) {
    await pool.query(
      `INSERT INTO blog_posts (id, slug, title, excerpt, image, alt, date, meta_description, published, sections, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      [crypto.randomUUID(), p.slug, p.title, p.excerpt || "", p.image || "", p.alt || "",
       p.date || now.slice(0, 10), p.excerpt || "", JSON.stringify(p.sections || []), now, now]
    );
  }
  console.log(`Seeded ${posts.length} blog posts`);
}
