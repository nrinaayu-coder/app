import { Router } from "express";
import { pool } from "../db.js";
import {
  verifyPassword, createAccessToken, requireAuth,
  checkLockout, recordFailedLogin, clearLoginAttempts,
} from "../auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(422).json({ detail: "Email dan password wajib diisi." });
  const normalized = email.toLowerCase().trim();
  const identifier = `${req.ip}:${normalized}`;
  try {
    await checkLockout(identifier);
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [normalized]);
    const user = rows[0];
    if (!user || !verifyPassword(password, user.password_hash)) {
      await recordFailedLogin(identifier);
      return res.status(401).json({ detail: "Email atau password salah." });
    }
    await clearLoginAttempts(identifier);
    const token = createAccessToken(user.id, normalized);
    res.json({ token, user: { email: normalized, name: user.name, role: user.role } });
  } catch (err) {
    res.status(err.status || 500).json({ detail: err.message });
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json(req.user);
});

export default router;
