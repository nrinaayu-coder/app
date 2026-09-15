import { useEffect } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { SectionHeading, CTASection, Breadcrumbs } from "../components/Sections";
import { WEDDING_IMAGES } from "../data/site";
import { track } from "../lib/analytics";

export default function RealWeddings() {
  useEffect(() => {
    track("real_wedding_view");
  }, []);

  return (
    <>
      <SEO
        title="Real Weddings — Portofolio Pernikahan | The Wedding Cars"
        description="Galeri pernikahan sungguhan bersama armada The Wedding Cars. Momen kedatangan, foto bersama BMW wedding car, dan cerita hari spesial pasangan di Bogor, Jabodetabek & Bandung."
        path="/real-weddings"
        image="/images/wedding-04.jpg"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Real Weddings", path: "/real-weddings" }]}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Real Weddings", path: "/real-weddings" }]} />
      <section className="pb-20 md:pb-28" data-testid="real-weddings-page">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Portfolio"
            title="REAL WEDDINGS. REAL MOMENTS."
            sub="Setiap foto di halaman ini adalah dokumentasi pernikahan sungguhan — bukan foto katalog."
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="img-frame mt-12 aspect-[16/9] md:aspect-[21/9]"
          >
            <img
              src="/images/wedding-01.jpg"
              alt="Pasangan pengantin tiba di venue pernikahan dengan BMW putih"
              fetchPriority="high"
              className="editorial-img"
            />
          </motion.div>

          <div className="mt-6 columns-2 md:columns-3 gap-4 [column-fill:balance]">
            {WEDDING_IMAGES.slice(1).map((img, i) => (
              <motion.figure
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="group relative mb-4 break-inside-avoid img-frame"
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="editorial-img group-hover:scale-[1.04]" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-cream text-[10px] uppercase tracking-[0.25em]">{img.label}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="YOUR STORY COULD BE NEXT."
        sub="Your date deserves the right car."
        image="/images/wedding-07.jpg"
      />
    </>
  );
}
