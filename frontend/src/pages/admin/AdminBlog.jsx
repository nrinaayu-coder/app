import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, ExternalLink } from "lucide-react";
import { api, setToken, getToken } from "../../lib/api";

export function useAdminAuth() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!getToken()) {
      navigate("/admin/login");
      return;
    }
    api.get("/auth/me")
      .then(() => setReady(true))
      .catch(() => {
        setToken(null);
        navigate("/admin/login");
      });
  }, [navigate]);
  return ready;
}

export function AdminShell({ title, children, actions }) {
  const navigate = useNavigate();
  const logout = () => {
    setToken(null);
    navigate("/admin/login");
  };
  return (
    <div className="min-h-screen bg-cream" data-testid="admin-shell">
      <header className="border-b border-line bg-cream/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-serif text-lg tracking-[0.08em] text-charcoal" data-testid="admin-logo">
              THE WEDDING CARS
            </Link>
            <span className="text-[10px] uppercase tracking-[0.3em] text-golddark hidden sm:inline">Blog Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <button onClick={logout} data-testid="admin-logout"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-muted2 hover:text-charcoal transition-colors px-3 py-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">{title}</h1>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminBlog() {
  const ready = useAdminAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    api.get("/admin/blog")
      .then((r) => setPosts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (ready) load();
  }, [ready]);

  const onDelete = async (post) => {
    if (!window.confirm(`Hapus artikel "${post.title}"?`)) return;
    await api.delete(`/admin/blog/${post.id}`);
    load();
  };

  if (!ready) return null;

  return (
    <AdminShell
      title="Blog Articles"
      actions={
        <Link to="/admin/blog/new" data-testid="admin-new-post" className="btn-primary !px-5 !py-2.5">
          <Plus className="w-4 h-4" /> New Article
        </Link>
      }
    >
      {loading ? (
        <p className="text-muted2 text-sm">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted2 text-sm">Belum ada artikel.</p>
      ) : (
        <div className="border border-line bg-white divide-y divide-line" data-testid="admin-post-list">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4">
              <div className="w-16 h-12 shrink-0 overflow-hidden bg-beige hidden sm:block">
                {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg text-charcoal truncate">{p.title}</p>
                <p className="text-xs text-muted2">
                  /blog/{p.slug} · {p.date} ·{" "}
                  <span className={p.published ? "text-golddark" : "text-muted2"}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {p.published && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer"
                    aria-label="View" data-testid={`admin-view-${p.slug}`}
                    className="p-2 text-muted2 hover:text-charcoal transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button onClick={() => navigate(`/admin/blog/${p.id}/edit`)} aria-label="Edit"
                  data-testid={`admin-edit-${p.slug}`}
                  className="p-2 text-muted2 hover:text-charcoal transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(p)} aria-label="Delete"
                  data-testid={`admin-delete-${p.slug}`}
                  className="p-2 text-muted2 hover:text-red-800 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
