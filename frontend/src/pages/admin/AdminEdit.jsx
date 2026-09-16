import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, Upload } from "lucide-react";
import { api, imgUrl } from "../../lib/api";
import { AdminShell, useAdminAuth } from "./AdminBlog";

const emptySection = () => ({ heading: "", paragraphsText: "" });

export default function AdminEdit() {
  const ready = useAdminAuth();
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", slug: "", date: new Date().toISOString().slice(0, 10),
    excerpt: "", metaDescription: "", image: "", alt: "", published: true,
  });
  const [sections, setSections] = useState([emptySection()]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && id) {
      api.get("/admin/blog").then((r) => {
        const post = r.data.find((p) => p.id === id);
        if (!post) return;
        setForm({
          title: post.title, slug: post.slug, date: post.date,
          excerpt: post.excerpt || "", metaDescription: post.metaDescription || "",
          image: post.image || "", alt: post.alt || "", published: !!post.published,
        });
        setSections(
          (post.sections || []).map((s) => ({
            heading: s.heading || "",
            paragraphsText: (s.paragraphs || []).join("\n\n"),
          }))
        );
      });
    }
  }, [ready, id]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onTitleChange = (e) => {
    const title = e.target.value;
    setForm((f) => ({
      ...f, title,
      slug: f.slug && f.slug !== slugify(f.title) ? f.slug : slugify(title),
    }));
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/admin/upload", fd);
      setForm((f) => ({ ...f, image: data.url }));
    } catch (err) {
      setError(typeof err.response?.data?.detail === "string" ? err.response.data.detail : "Upload gagal.");
    } finally {
      setUploading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      sections: sections
        .map((s) => ({
          heading: s.heading || null,
          paragraphs: s.paragraphsText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
        }))
        .filter((s) => s.heading || s.paragraphs.length),
    };
    try {
      if (isNew) await api.post("/admin/blog", payload);
      else await api.put(`/admin/blog/${id}`, payload);
      navigate("/admin");
    } catch (err) {
      const d = err.response?.data?.detail;
      setError(typeof d === "string" ? d : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  if (!ready) return null;

  const inputCls =
    "w-full bg-white border border-line px-4 py-3 text-sm text-charcoal placeholder:text-muted2/60 focus:border-gold focus:outline-none transition-colors";
  const labelCls = "block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2";

  return (
    <AdminShell title={isNew ? "New Article" : "Edit Article"}>
      <form onSubmit={onSave} className="grid lg:grid-cols-3 gap-8" data-testid="admin-post-form">
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-line bg-white p-6 space-y-5">
            <div>
              <label className={labelCls} htmlFor="post-title">Judul Artikel *</label>
              <input id="post-title" required value={form.title} onChange={onTitleChange}
                placeholder="Contoh: Tips Memilih Wedding Car" className={inputCls} data-testid="post-title" />
            </div>
            <div>
              <label className={labelCls} htmlFor="post-slug">Slug URL *</label>
              <input id="post-slug" required value={form.slug} onChange={set("slug")}
                placeholder="tips-memilih-wedding-car" className={inputCls} data-testid="post-slug" />
              <p className="text-xs text-muted2 mt-1.5">URL artikel: /blog/{form.slug || "..."}</p>
            </div>
          </div>

          <div className="border border-line bg-white p-6 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">Isi Artikel (Sections)</p>
              <button type="button" onClick={() => setSections((s) => [...s, emptySection()])}
                data-testid="add-section"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-golddark hover:text-charcoal transition-colors">
                <Plus className="w-4 h-4" /> Add Section
              </button>
            </div>
            {sections.map((s, i) => (
              <div key={i} className="border border-line p-5 space-y-4 relative" data-testid={`section-${i}`}>
                {sections.length > 1 && (
                  <button type="button" aria-label="Remove section"
                    onClick={() => setSections((arr) => arr.filter((_, j) => j !== i))}
                    className="absolute top-3 right-3 p-1.5 text-muted2 hover:text-red-800 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <div>
                  <label className={labelCls}>Sub-judul (opsional)</label>
                  <input value={s.heading}
                    onChange={(e) => setSections((arr) => arr.map((x, j) => j === i ? { ...x, heading: e.target.value } : x))}
                    placeholder="Contoh: Faktor yang Memengaruhi Harga" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Paragraf</label>
                  <textarea rows={6} value={s.paragraphsText}
                    onChange={(e) => setSections((arr) => arr.map((x, j) => j === i ? { ...x, paragraphsText: e.target.value } : x))}
                    placeholder="Tulis paragraf di sini. Pisahkan paragraf dengan satu baris kosong."
                    className={inputCls} data-testid={`section-text-${i}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-line bg-white p-6 space-y-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">Pengaturan</p>
            <div>
              <label className={labelCls} htmlFor="post-date">Tanggal</label>
              <input id="post-date" type="date" value={form.date} onChange={set("date")} className={inputCls} data-testid="post-date" />
            </div>
            <label className="flex items-center gap-3 text-sm text-charcoal cursor-pointer">
              <input type="checkbox" checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4 accent-[#1A1A1A]" data-testid="post-published" />
              Published (tampil di website)
            </label>
          </div>

          <div className="border border-line bg-white p-6 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">Gambar Utama (Header)</p>
            {form.image && (
              <div className="aspect-[16/10] overflow-hidden bg-beige">
                <img src={imgUrl(form.image)} alt="Preview" className="w-full h-full object-cover" data-testid="image-preview" />
              </div>
            )}
            <label className="btn-outline w-full cursor-pointer !py-3" data-testid="upload-button">
              <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : form.image ? "Ganti Gambar" : "Upload Gambar"}
              <input type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} data-testid="upload-input" />
            </label>
            <div>
              <label className={labelCls} htmlFor="post-alt">Alt Text (SEO)</label>
              <input id="post-alt" value={form.alt} onChange={set("alt")}
                placeholder="Deskripsi gambar untuk SEO" className={inputCls} data-testid="post-alt" />
            </div>
          </div>

          <div className="border border-line bg-white p-6 space-y-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">SEO</p>
            <div>
              <label className={labelCls} htmlFor="post-excerpt">Excerpt / Ringkasan</label>
              <textarea id="post-excerpt" rows={3} value={form.excerpt} onChange={set("excerpt")}
                placeholder="Ringkasan singkat yang tampil di daftar blog" className={inputCls} data-testid="post-excerpt" />
            </div>
            <div>
              <label className={labelCls} htmlFor="post-meta">Meta Description</label>
              <textarea id="post-meta" rows={3} value={form.metaDescription} onChange={set("metaDescription")}
                placeholder="Deskripsi untuk Google (kosongkan untuk memakai excerpt)" className={inputCls} data-testid="post-meta" />
            </div>
          </div>

          {error && <p className="text-sm text-red-800 bg-red-50 border border-red-200 px-4 py-3" data-testid="admin-edit-error">{error}</p>}
          <button type="submit" disabled={saving || uploading} className="btn-primary w-full disabled:opacity-50" data-testid="post-save">
            {saving ? "Saving..." : isNew ? "Publish Article" : "Save Changes"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "");
}
