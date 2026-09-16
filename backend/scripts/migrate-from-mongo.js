/**
 * One-time migration: MongoDB -> MySQL.
 * Usage: npm run migrate
 * Safe to re-run: skips data that already exists.
 */
import "../src/env.js";

import { MongoClient } from "mongodb";
import crypto from "crypto";
import { pool, initSchema } from "../src/db.js";

const mongo = new MongoClient(process.env.MONGO_URL);

const iso = (v) => (v instanceof Date ? v.toISOString() : v || null);

async function main() {
  await initSchema();
  await mongo.connect();
  const mdb = mongo.db(process.env.DB_NAME);

  const users = await mdb.collection("users").find({}).toArray();
  for (const u of users) {
    await pool.query(
      `INSERT IGNORE INTO users (id, email, password_hash, name, role, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [crypto.randomUUID(), u.email, u.password_hash, u.name || "Admin", u.role || "admin", iso(u.created_at)]
    );
  }
  console.log(`users migrated: ${users.length}`);

  const posts = await mdb.collection("blog_posts").find({}).toArray();
  for (const p of posts) {
    await pool.query(
      `INSERT IGNORE INTO blog_posts (id, slug, title, excerpt, image, alt, date, meta_description, published, sections, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id || crypto.randomUUID(), p.slug, p.title, p.excerpt || "", p.image || "", p.alt || "",
       p.date || "", p.metaDescription || p.meta_description || "", p.published ? 1 : 0,
       JSON.stringify(p.sections || []), iso(p.created_at), iso(p.updated_at)]
    );
  }
  console.log(`blog_posts migrated: ${posts.length}`);

  const attempts = await mdb.collection("login_attempts").find({}).toArray();
  for (const a of attempts) {
    await pool.query(
      `INSERT IGNORE INTO login_attempts (identifier, count, last_attempt, locked_until) VALUES (?, ?, ?, ?)`,
      [a.identifier, a.count || 0, iso(a.last_attempt), iso(a.locked_until)]
    );
  }
  console.log(`login_attempts migrated: ${attempts.length}`);

  const files = await mdb.collection("files").find({}).toArray();
  for (const f of files) {
    await pool.query(
      `INSERT IGNORE INTO files (id, storage_path, original_filename, content_type, size, is_deleted, uploaded_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [f.id || crypto.randomUUID(), f.storage_path, f.original_filename || "", f.content_type || "",
       f.size || 0, f.is_deleted ? 1 : 0, f.uploaded_by || null, iso(f.created_at)]
    );
  }
  console.log(`files migrated: ${files.length}`);

  await mongo.close();
  await pool.end();
  console.log("Migration complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
