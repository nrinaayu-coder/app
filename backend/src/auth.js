import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";

const now = () => new Date().toISOString();

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
export const verifyPassword = (plain, hashed) => bcrypt.compareSync(plain, hashed);

export function createAccessToken(userId, email) {
  return jwt.sign(
    { sub: userId, email, type: "access" },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ detail: "Not authenticated" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.type !== "access") return res.status(401).json({ detail: "Invalid token type" });
    const [rows] = await pool.query(
      "SELECT id, email, name, role, created_at FROM users WHERE email = ?",
      [payload.email]
    );
    if (!rows.length) return res.status(401).json({ detail: "User not found" });
    req.user = rows[0];
    next();
  } catch (err) {
    const detail = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ detail });
  }
}

export async function checkLockout(identifier) {
  const [rows] = await pool.query("SELECT * FROM login_attempts WHERE identifier = ?", [identifier]);
  const rec = rows[0];
  if (rec && rec.count >= 5 && rec.locked_until && rec.locked_until > now()) {
    const err = new Error("Terlalu banyak percobaan login. Coba lagi dalam 15 menit.");
    err.status = 429;
    throw err;
  }
}

export async function recordFailedLogin(identifier) {
  const [rows] = await pool.query("SELECT count FROM login_attempts WHERE identifier = ?", [identifier]);
  const count = (rows[0]?.count || 0) + 1;
  const lockedUntil = count >= 5 ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null;
  await pool.query(
    `INSERT INTO login_attempts (identifier, count, last_attempt, locked_until)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE count = VALUES(count), last_attempt = VALUES(last_attempt), locked_until = VALUES(locked_until)`,
    [identifier, count, now(), lockedUntil]
  );
}

export async function clearLoginAttempts(identifier) {
  await pool.query("DELETE FROM login_attempts WHERE identifier = ?", [identifier]);
}
