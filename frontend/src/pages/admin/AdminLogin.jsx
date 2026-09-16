import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setToken } from "../../lib/api";

function formatError(detail) {
  if (detail == null) return "Terjadi kesalahan. Coba lagi.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || String(e)).join(" ");
  return String(detail);
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      navigate("/admin");
    } catch (err) {
      setError(formatError(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white border border-line px-4 py-3.5 text-sm text-charcoal placeholder:text-muted2/60 focus:border-gold focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5" data-testid="admin-login">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-2xl tracking-[0.08em] text-charcoal" data-testid="admin-login-logo">
            THE WEDDING CARS
          </Link>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-golddark">Blog Admin</p>
        </div>
        <form onSubmit={onSubmit} className="border border-line bg-white p-8 md:p-10 space-y-5">
          <div>
            <label htmlFor="admin-email" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Email</label>
            <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@theweddingcars.id" className={inputCls} data-testid="admin-email" />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Password</label>
            <input id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" className={inputCls} data-testid="admin-password" />
          </div>
          {error && (
            <p className="text-sm text-red-800 bg-red-50 border border-red-200 px-4 py-3" data-testid="admin-login-error">{error}</p>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50" data-testid="admin-login-submit">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-6">
          <Link to="/" className="text-xs text-muted2 hover:text-charcoal transition-colors" data-testid="admin-back-home">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
