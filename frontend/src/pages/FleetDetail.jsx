import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { SectionHeading, CTASection, FAQBlock, Breadcrumbs, FleetCard } from "../components/Sections";
import { FLEET, BMW_IMAGES, WEDDING_IMAGES, FAQS, waLink, WA_MESSAGES } from "../data/site";
import { track } from "../lib/analytics";
import { useEffect } from "react";

function BMWGallery() {
  const sections = [
    { title: "Exterior", imgs: BMW_IMAGES.exterior },
    { title: "Wedding Decoration", imgs: BMW_IMAGES.decoration },
    { title: "Rear Seat", imgs: BMW_IMAGES.rearSeat },
    { title: "Interior & Dashboard", imgs: BMW_IMAGES.interior },
    { title: "Panoramic Roof", imgs: BMW_IMAGES.panoramic },
  ];
  return (
    <div className="space-y-16 md:space-y-24">
      {sections.map((s, i) => (
        <motion.section
          key={s.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className={`grid lg:grid-cols-12 gap-8 items-center ${i % 2 ? "" : ""}`}
        >
          <div className={`lg:col-span-4 ${i % 2 ? "lg:order-2" : ""}`}>
            <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">{s.title}</h2>
          </div>
          <div className={`lg:col-span-8 grid ${s.imgs.length > 1 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"} gap-4 ${i % 2 ? "lg:order-1" : ""}`}>
            {s.imgs.map((img) => (
              <div key={img.src} className="img-frame aspect-[3/4]">
                <img src={img.src} alt={img.alt} loading="lazy" className="editorial-img hover:scale-[1.04]" />
              </div>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}

export default function FleetDetail() {
  const { slug } = useParams();
  const car = FLEET.find((c) => c.slug === slug);

  useEffect(() => {
    if (car) track("fleet_detail_view", { car: car.slug });
  }, [car]);

  if (!car) {
    return (
      <div className="container-x pt-40 pb-24 text-center">
        <h1 className="font-serif text-4xl text-charcoal">Car not found</h1>
        <Link to="/wedding-cars" className="btn-outline mt-8 inline-flex" data-testid="fleet-not-found-back">
          View All Wedding Cars
        </Link>
      </div>
    );
  }

  const isBMW = car.slug === "bmw-5-series";
  const heroImg = car.stockImage || car.image;
  const message = isBMW ? WA_MESSAGES.bmw : WA_MESSAGES.car(car.name);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Wedding Cars", path: "/wedding-cars" },
    { name: car.name, path: `/wedding-cars/${car.slug}` },
  ];
  const others = FLEET.filter((c) => c.slug !== car.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={
          isBMW
            ? "Sewa BMW 5 Series Wedding Car Bogor | The Wedding Cars"
            : `Sewa ${car.name} Wedding Car | The Wedding Cars Bogor`
        }
        description={
          isBMW
            ? "Sewa BMW 5 Series untuk wedding car di Bogor, Jabodetabek & Bandung. Mulai Rp1.999.000. Elegant. Executive. Timeless. Cek availability via WhatsApp."
            : `Sewa ${car.name} untuk mobil pengantin di Bogor, Jabodetabek & Bandung. Hubungi The Wedding Cars untuk availability & pricing.`
        }
        path={`/wedding-cars/${car.slug}`}
        image={car.image}
        breadcrumbs={crumbs}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${car.name} Wedding Car Rental`,
          image: `https://bogor-wedding-bmw.preview.emergentagent.com${car.image}`,
          description: car.description,
          brand: { "@type": "Brand", name: "The Wedding Cars" },
          ...(car.price
            ? {
                offers: {
                  "@type": "Offer",
                  priceCurrency: "IDR",
                  price: "1999000",
                  availability: "https://schema.org/InStock",
                },
              }
            : {}),
        }}
      />
      <Breadcrumbs items={crumbs} />

      <section className="pb-16 md:pb-24" data-testid={`car-detail-${car.slug}`}>
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="img-frame aspect-[4/3]">
              <img src={heroImg} alt={car.alt} fetchPriority="high" className="editorial-img" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <span className="eyebrow">Wedding Car</span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.05]">
                {car.name}
              </h1>
              <p className="mt-4 font-serif italic text-xl text-muted2">{car.tagline}</p>
              {car.price ? (
                <p className="mt-8">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-golddark block">Starting from</span>
                  <span className="font-serif text-4xl sm:text-5xl text-charcoal" data-testid="car-price">{car.price}</span>
                </p>
              ) : (
                <p className="mt-8 text-sm uppercase tracking-[0.15em] text-muted2" data-testid="car-price-note">
                  Contact us for availability & pricing
                </p>
              )}
              <p className="mt-6 text-muted2 leading-relaxed">{car.description}</p>
              <p className="mt-4 text-xs text-muted2/80 leading-relaxed">
                Final pricing may vary depending on wedding date, location, duration and availability.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="car-check-availability"
                  onClick={() => track("check_availability_click", { source: "fleet_detail", car: car.slug })}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isBMW ? "Check BMW Availability" : "Check Availability"}
                </a>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="car-whatsapp"
                  onClick={() => track("whatsapp_click", { source: "fleet_detail", car: car.slug })}
                  className="btn-outline w-full sm:w-auto"
                >
                  Chat via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {isBMW && (
        <section className="bg-ivory border-y border-line py-16 md:py-24" data-testid="bmw-gallery">
          <div className="container-x">
            <SectionHeading eyebrow="Inside & Out" title="THE BMW 5 SERIES, UP CLOSE." sub="Exterior, interior, dan setiap detail yang membuatnya istimewa di hari pernikahan." />
            <div className="mt-14">
              <BMWGallery />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="For Your Day" title={`WHY ${car.name.toUpperCase()} WORKS FOR WEDDINGS`} />
            <ul className="mt-8 space-y-5">
              {car.why.map((w, i) => (
                <li key={i} className="flex gap-5 items-start border-b border-line pb-5">
                  <span className="font-serif text-xl text-gold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-muted2 leading-relaxed">{w}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Real Moments" title="WEDDING MOMENTS" />
            <div className="mt-8 columns-2 gap-4">
              {WEDDING_IMAGES.slice(2, 6).map((img) => (
                <figure key={img.src} className="mb-4 break-inside-avoid img-frame">
                  <img src={img.src} alt={img.alt} loading="lazy" className="editorial-img hover:scale-[1.04]" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory border-y border-line py-16 md:py-24">
        <div className="container-x max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="COMMON QUESTIONS" center />
          <div className="mt-10">
            <FAQBlock faqs={FAQS.slice(0, 5)} idPrefix={`car-faq-${car.slug}`} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Explore" title="OTHER WEDDING CARS" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {others.map((c) => (
              <FleetCard key={c.slug} car={c} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={isBMW ? "READY FOR YOUR BMW WEDDING?" : "READY FOR YOUR WEDDING DAY?"}
        sub="Your date deserves the right car."
        message={message}
      />
    </>
  );
}
