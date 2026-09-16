import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { CTASection, Breadcrumbs } from "../components/Sections";
import { BLOG_POSTS } from "../data/blog";
import { api, imgUrl } from "../lib/api";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => BLOG_POSTS.find((p) => p.slug === slug) || null);
  const [notFound, setNotFound] = useState(false);
  const [allPosts, setAllPosts] = useState(BLOG_POSTS);

  useEffect(() => {
    setPost(BLOG_POSTS.find((p) => p.slug === slug) || null);
    setNotFound(false);
    api.get("/blog")
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length) {
          setAllPosts(r.data);
          const found = r.data.find((p) => p.slug === slug);
          if (found) setPost(found);
          else if (!BLOG_POSTS.find((p) => p.slug === slug)) setNotFound(true);
        }
      })
      .catch(() => {});
  }, [slug]);

  if (notFound || !post) {
    if (!notFound && !post) return null;
    return (
      <div className="container-x pt-40 pb-24 text-center">
        <h1 className="font-serif text-4xl text-charcoal">Article not found</h1>
        <Link to="/blog" className="btn-outline mt-8 inline-flex" data-testid="blog-not-found-back">
          Back to Blog
        </Link>
      </div>
    );
  }

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <SEO
        title={`${post.title} | The Wedding Cars`}
        description={post.metaDescription || post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        breadcrumbs={crumbs}
      />
      <Breadcrumbs items={crumbs} />
      <article className="pb-20 md:pb-28" data-testid={`blog-post-${post.slug}`}>
        <div className="container-x max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-golddark">
            Wedding Guide — {new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight leading-[1.15]">
            {post.title}
          </h1>
        </div>
        <div className="container-x max-w-4xl mt-10">
          <div className="img-frame aspect-[16/9]">
            <img src={imgUrl(post.image)} alt={post.alt} fetchPriority="high" className="editorial-img" />
          </div>
        </div>
        <div className="container-x max-w-3xl mt-12 space-y-10">
          {post.sections.map((s, i) => (
            <section key={i}>
              {s.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-4">{s.heading}</h2>
              )}
              {s.paragraphs.map((p, j) => (
                <p key={j} className="text-muted2 leading-relaxed mb-4">{p}</p>
              ))}
            </section>
          ))}
          <div className="border border-line bg-ivory p-8 text-center">
            <p className="font-serif text-2xl text-charcoal">Checking availability for your date?</p>
            <p className="mt-2 text-sm text-muted2">
              Cek tanggal wedding Anda sekarang — armada premium kami terbatas untuk setiap tanggal.
            </p>
            <Link to="/contact" data-testid="blog-post-cta" className="btn-primary mt-6">
              Check Availability
            </Link>
          </div>
        </div>
        <div className="container-x max-w-4xl mt-16">
          <h2 className="font-serif text-2xl text-charcoal">Read Next</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} data-testid={`related-${p.slug}`} className="group">
                <div className="img-frame aspect-[4/3]">
                  <img src={imgUrl(p.image)} alt={p.alt} loading="lazy" className="editorial-img group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 font-serif text-lg text-charcoal leading-snug group-hover:text-golddark transition-colors">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <CTASection />
    </>
  );
}
