import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { SectionHeading, Breadcrumbs, CTASection } from "../components/Sections";
import { BLOG_POSTS } from "../data/blog";
import { api, imgUrl } from "../lib/api";

export default function Blog() {
  const [posts, setPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    api.get("/blog")
      .then((r) => { if (Array.isArray(r.data) && r.data.length) setPosts(r.data); })
      .catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="Wedding Guide — Tips & Panduan Wedding Car | The Wedding Cars"
        description="Panduan memilih dan menyewa wedding car: harga sewa mobil pengantin di Bogor, tips memilih mobil pengantin, BMW vs Mercedes, dan lainnya."
        path="/blog"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <section className="pb-20 md:pb-28" data-testid="blog-page">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Wedding Guide"
            title="NOTES FOR YOUR BIG DAY."
            sub="Panduan praktis seputar wedding car — ditulis untuk membantu persiapan pernikahan Anda."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {posts.map((post, i) => (
              <article key={post.slug || post.id}>
                <Link to={`/blog/${post.slug}`} data-testid={`blog-card-${post.slug}`} className="group block">
                  <div className="img-frame aspect-[4/3]">
                    <img src={imgUrl(post.image)} alt={post.alt} loading={i < 3 ? "eager" : "lazy"} className="editorial-img group-hover:scale-[1.04]" />
                  </div>
                  <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-golddark">
                    {new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-charcoal leading-snug group-hover:text-golddark transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted2 leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-charcoal border-b border-gold pb-1">
                    Read Article
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
