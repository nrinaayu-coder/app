import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { SectionHeading, CTASection, FAQBlock, Breadcrumbs, FleetCard } from "../components/Sections";
import { LOCATIONS, FLEET, FAQS, WEDDING_IMAGES, waLink, WA_MESSAGES, BRAND } from "../data/site";
import { track } from "../lib/analytics";

export default function LocationPage({ slug }) {
  const params = useParams();
  const city = slug || params.city;
  const loc = LOCATIONS.find((l) => l.slug === city);

  useEffect(() => {
    if (loc) track("location_page_view", { city: loc.slug });
  }, [loc]);

  if (!loc) {
    return (
      <div className="container-x pt-40 pb-24 text-center">
        <h1 className="font-serif text-4xl text-charcoal">Page not found</h1>
        <Link to="/" className="btn-outline mt-8 inline-flex" data-testid="location-not-found-home">Back to Home</Link>
      </div>
    );
  }

  const message = WA_MESSAGES.location(loc.city);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/#service-areas" },
    { name: `Wedding Car ${loc.city}`, path: loc.path },
  ];
  const heroImg = WEDDING_IMAGES[loc.slug === "jakarta" ? 11 : loc.slug === "bandung" ? 4 : loc.slug === "depok" ? 8 : loc.slug === "tangerang" ? 5 : loc.slug === "bekasi" ? 9 : 0];

  return (
    <>
      <SEO
        title={loc.title}
        description={loc.description}
        path={loc.path}
        image={heroImg.src}
        breadcrumbs={crumbs}
      />
      <Breadcrumbs items={crumbs} />

      <section className="pb-16 md:pb-24" data-testid={`location-${loc.slug}`}>
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="eyebrow">Service Area — {loc.city}</span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.05]">
                {loc.h1.toUpperCase()}
              </h1>
              <p className="mt-4 font-serif italic text-lg text-golddark">
                Sewa mobil pengantin premium untuk pernikahan di {loc.city}.
              </p>
              {loc.intro.map((p, i) => (
                <p key={i} className="mt-5 text-muted2 leading-relaxed">{p}</p>
              ))}
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`location-${loc.slug}-cta`}
                  onClick={() => track("check_availability_click", { source: "location_page", city: loc.slug })}
                  className="btn-primary w-full sm:w-auto"
                >
                  Check Availability
                </a>
                <Link to="/wedding-cars" data-testid={`location-${loc.slug}-fleet`} className="btn-outline w-full sm:w-auto">
                  View Our Cars
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="img-frame aspect-[4/3]"
            >
              <img src={heroImg.src} alt={heroImg.alt} fetchPriority="high" className="editorial-img" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-ivory border-y border-line py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Fleet"
            title={`WEDDING CARS IN ${loc.city.toUpperCase()}`}
            sub="Armada wedding-ready yang tersedia untuk area layanan ini."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {FLEET.slice(0, 3).map((car) => (
              <FleetCard key={car.slug} car={car} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/wedding-cars" data-testid={`location-${loc.slug}-all-cars`} className="btn-outline">
              View All Wedding Cars
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Real Moments"
              title={`REAL WEDDINGS AROUND ${loc.city.toUpperCase()}`}
            />
            <p className="mt-5 text-muted2 leading-relaxed text-sm">
              Dokumentasi pernikahan sungguhan bersama armada The Wedding Cars — dari momen
              kedatangan hingga sesi foto bersama mobil pengantin.
            </p>
            <Link to="/real-weddings" data-testid={`location-${loc.slug}-portfolio`} className="btn-outline mt-8">
              View Real Weddings
            </Link>
          </div>
          <div className="columns-2 gap-4">
            {WEDDING_IMAGES.slice(3, 7).map((img) => (
              <figure key={img.src} className="mb-4 break-inside-avoid img-frame">
                <img src={img.src} alt={img.alt} loading="lazy" className="editorial-img hover:scale-[1.04]" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory border-y border-line py-16 md:py-24">
        <div className="container-x max-w-4xl">
          <SectionHeading eyebrow="FAQ" title={`QUESTIONS ABOUT WEDDING CAR IN ${loc.city.toUpperCase()}`} center />
          <div className="mt-10">
            <FAQBlock
              faqs={[FAQS[0], FAQS[8], FAQS[9], { q: `Apakah melayani area ${loc.city}?`, a: `Ya, kami melayani pernikahan di ${loc.city}. ${BRAND.name} berbasis di Bogor dan melayani Bogor, Jabodetabek, dan Bandung. Hubungi kami via WhatsApp untuk cek availability tanggal Anda.` }]}
              idPrefix={`loc-faq-${loc.slug}`}
            />
          </div>
        </div>
      </section>

      <CTASection
        title={`PLANNING A WEDDING IN ${loc.city.toUpperCase()}?`}
        sub="Your date deserves the right car."
        message={message}
      />
    </>
  );
}
