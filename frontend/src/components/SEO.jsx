import { useEffect } from "react";
import { SITE_URL } from "../data/site";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export default function SEO({ title, description, path = "/", image, breadcrumbs, jsonLd }) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_URL}${path}`);
    setMeta("property", "og:type", "website");
    if (image) setMeta("property", "og:image", `${SITE_URL}${image}`);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${SITE_URL}${path}`);

    document.head.querySelectorAll("script[data-page-schema]").forEach((s) => s.remove());
    const schemas = [];
    if (breadcrumbs?.length > 1) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.path}`,
        })),
      });
    }
    if (jsonLd) schemas.push(jsonLd);
    schemas.forEach((schema) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-page-schema", "true");
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    });
  }, [title, description, path, image, breadcrumbs, jsonLd]);
  return null;
}
