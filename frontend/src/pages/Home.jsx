import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { SectionHeading, TrustStrip, FleetCard, FAQBlock, CTASection } from "../components/Sections";
import { FLEET, WEDDING_IMAGES, BMW_IMAGES, FAQS, LOCATIONS, waLink, WA_MESSAGES } from "../data/site";
import { track } from "../lib/analytics";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

function Hero() {
  return (
    <section data-testid="hero" className="relative min-h-[92svh] flex items-end overflow-hidden bg-ink">
      <img
        src="/images/wedding-07.jpg"
        alt="Pengantin pria membukakan pintu BMW 5 Series putih untuk pengantin wanita — The Wedding Cars Bogor"
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] animate-fade-in"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/20" />
      <div className="relative container-x pb-24 pt-40 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="eyebrow !text-gold"
        >
          Premium Wedding Car Specialist
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-7xl text-cream tracking-tight leading-[1.05] max-w-4xl"
        >
          YOUR WEDDING DESERVES<br className="hidden sm:block" /> A BEAUTIFUL ARRIVAL.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 max-w-xl text-cream/85 text-base sm:text-lg leading-relaxed"
        >
          Premium wedding cars in Bogor, Jabodetabek &amp; Bandung, prepared for one of the
          most important days of your life.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-4 font-serif italic text-gold text-lg"
        >
          More than a wedding car. It's part of your story.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-9 flex flex-col sm:flex-row gap-4"
        >
          <a
            href={waLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-check-availability"
            onClick={() => track("check_availability_click", { source: "hero" })}
            className="btn-gold w-full sm:w-auto"
          >
            Check Availability
          </a>
          <Link to="/wedding-cars" data-testid="hero-view-cars" className="btn-outline-light w-full sm:w-auto">
            View Our Cars
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FleetSection() {
  const bmw = FLEET[0];
  const others = FLEET.slice(1);
  return (
    <section data-testid="fleet-section" className="py-16 md:py-24 lg:py-32">
      <div className="container-x">
        <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Our Wedding Cars"
            title="CHOOSE THE CAR FOR YOUR WEDDING DAY."
            sub="From timeless luxury to comfortable elegance, choose a car that feels right for your celebration."
          />
          <Link to="/wedding-cars" data-testid="fleet-view-all" className="btn-outline shrink-0 hidden md:inline-flex">
            View All Cars
          </Link>
        </motion.div>

        <motion.div {...fadeUp} className="mt-12">
          <div className="relative">
            <FleetCard car={bmw} large />
            <span className="absolute top-4 left-4 bg-charcoal/85 backdrop-blur text-cream text-[10px] uppercase tracking-[0.25em] px-4 py-2">
              Hero Product
            </span>
          </div>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {others.map((car) => (
            <motion.div key={car.slug} {...fadeUp}>
              <FleetCard car={car} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link to="/wedding-cars" data-testid="fleet-view-all-mobile" className="btn-outline w-full">
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
}

function BMWFeature() {
  const grid = [
    BMW_IMAGES.exterior[1],
    BMW_IMAGES.decoration[0],
    BMW_IMAGES.rearSeat[0],
    BMW_IMAGES.panoramic[0],
    BMW_IMAGES.interior[0],
    BMW_IMAGES.interior[1],
  ];
  return (
    <section data-testid="bmw-feature" className="bg-charcoal text-cream py-16 md:py-24 lg:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...fadeUp}>
            <span className="eyebrow !text-gold">Featured — BMW 5 Series</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              YOUR WEDDING DESERVES A BMW.
            </h2>
            <p className="mt-6 text-cream/75 leading-relaxed max-w-lg">
              Make your arrival and wedding portraits feel even more special with the BMW 5
              Series. Elegant. Executive. Timeless.
            </p>
            <p className="mt-8">
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold block">Starting from</span>
              <span className="font-serif text-4xl sm:text-5xl text-cream" data-testid="bmw-price">Rp1.999.000</span>
            </p>
            <p className="mt-4 text-xs text-cream/50 max-w-md leading-relaxed">
              Final pricing may vary depending on wedding date, location, duration and availability.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a
                href={waLink(WA_MESSAGES.bmw)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="bmw-check-availability"
                onClick={() => track("check_availability_click", { source: "bmw_feature", car: "bmw-5-series" })}
                className="btn-gold w-full sm:w-auto"
              >
                Check BMW Availability
              </a>
              <Link
                to="/wedding-cars/bmw-5-series"
                data-testid="bmw-view-details"
                onClick={() => track("fleet_detail_view", { car: "bmw-5-series", source: "bmw_feature" })}
                className="btn-outline-light w-full sm:w-auto"
              >
                View Details
              </Link>
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-3">
            {grid.map((img, i) => (
              <div key={img.src} className={`img-frame ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
                <img src={img.src} alt={img.alt} loading="lazy" className="editorial-img hover:scale-[1.05]" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StoryBlocks() {
  const blocks = [
    {
      img: "/images/wedding-02.jpg",
      alt: "Pasangan pengantin tersenyum melalui panoramic roof BMW",
      title: "ELEGANT ARRIVAL",
      text: "Make your arrival feel as special as the moment itself.",
    },
    {
      img: "/images/wedding-04.jpg",
      alt: "Pasangan berfoto melalui panoramic roof BMW",
      title: "BEAUTIFUL WEDDING PHOTOS",
      text: "Your wedding car becomes part of the story you capture.",
    },
    {
      img: "/images/wedding-09.jpg",
      alt: "Pengantin pria membukakan pintu mobil untuk pengantin wanita",
      title: "STRESS-FREE JOURNEY",
      text: "Professional service designed around your special day.",
    },
  ];
  return (
    <section data-testid="story-section" className="py-16 md:py-24 lg:py-32">
      <div className="container-x">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="The Experience"
            title="MORE THAN A WEDDING CAR."
            sub="From your first arrival to the final photograph, your wedding car should feel like part of the celebration."
            center
          />
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-8">
          {blocks.map((b, i) => (
            <motion.article
              key={b.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.12 }}
              className="group"
            >
              <div className="img-frame aspect-[3/4]">
                <img src={b.img} alt={b.alt} loading="lazy" className="editorial-img group-hover:scale-[1.04]" />
              </div>
              <div className="pt-6 border-t border-gold/50 mt-6">
                <h3 className="font-serif text-2xl text-charcoal">{b.title}</h3>
                <p className="mt-2 text-muted2 text-sm leading-relaxed">{b.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealWeddingsPreview() {
  const imgs = WEDDING_IMAGES.slice(0, 8);
  return (
    <section data-testid="real-weddings-preview" className="bg-ivory border-y border-line py-16 md:py-24 lg:py-32">
      <div className="container-x">
        <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="REAL WEDDINGS. REAL MOMENTS."
            sub="Setiap foto adalah pernikahan sungguhan bersama armada The Wedding Cars."
          />
          <Link to="/real-weddings" data-testid="real-weddings-view-all" className="btn-outline shrink-0 hidden md:inline-flex">
            View Real Weddings
          </Link>
        </motion.div>
        <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:balance]">
          {imgs.map((img, i) => (
            <motion.figure
              key={img.src}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 4) * 0.08 }}
              className="group relative mb-4 break-inside-avoid img-frame"
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="editorial-img group-hover:scale-[1.04]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-cream text-[10px] uppercase tracking-[0.25em]">{img.label}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-10 md:hidden">
          <Link to="/real-weddings" data-testid="real-weddings-view-all-mobile" className="btn-outline w-full">
            View Real Weddings
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { t: "Wedding-Focused Service", d: "Kami hanya fokus pada satu hal: mobil pengantin. Setiap detail disiapkan untuk hari pernikahan Anda." },
    { t: "Professional Service", d: "Tim yang memahami rundown pernikahan — dari penjemputan hingga sesi foto." },
    { t: "Wedding-Ready Vehicles", d: "Armada disiapkan dalam kondisi terbaik dan tampil sempurna di hari-H." },
    { t: "Transparent Starting Price", d: "BMW 5 Series mulai Rp1.999.000 — tanpa biaya tersembunyi di awal pembicaraan." },
    { t: "Easy WhatsApp Booking", d: "Cek tanggal, tanya paket, dan booking — semua cukup lewat satu percakapan WhatsApp." },
  ];
  return (
    <section data-testid="why-us" className="py-16 md:py-24 lg:py-32">
      <div className="container-x grid lg:grid-cols-5 gap-12">
        <motion.div {...fadeUp} className="lg:col-span-2">
          <SectionHeading eyebrow="Why Us" title="WHY COUPLES CHOOSE THE WEDDING CARS" />
          <div className="img-frame aspect-[4/3] mt-10 hidden lg:block">
            <img src="/images/wedding-11.jpg" alt="Pasangan pengantin berbusana adat bersama BMW wedding car" loading="lazy" className="editorial-img" />
          </div>
        </motion.div>
        <div className="lg:col-span-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.07 }}
              className="flex gap-6 py-7 border-b border-line first:border-t"
            >
              <span className="font-serif text-2xl text-gold shrink-0 w-10">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal">{it.t}</h3>
                <p className="mt-2 text-sm text-muted2 leading-relaxed">{it.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackagesPreview() {
  const bmw = FLEET[0];
  return (
    <section data-testid="packages-preview" className="bg-ivory border-y border-line py-16 md:py-24 lg:py-32">
      <div className="container-x">
        <motion.div {...fadeUp}>
          <SectionHeading eyebrow="Packages" title="WEDDING CAR PACKAGES" center />
        </motion.div>
        <motion.div {...fadeUp} className="mt-14 max-w-4xl mx-auto grid md:grid-cols-2 border border-line bg-cream">
          <div className="img-frame aspect-[4/3] md:aspect-auto">
            <img src={bmw.image} alt={bmw.alt} loading="lazy" className="editorial-img" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="eyebrow">Featured Offer</span>
            <h3 className="font-serif text-3xl text-charcoal">{bmw.name}</h3>
            <p className="mt-2 font-serif italic text-muted2">{bmw.tagline}</p>
            <p className="mt-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-golddark block">Starting from</span>
              <span className="font-serif text-4xl text-charcoal">Rp1.999.000</span>
            </p>
            <p className="mt-4 text-xs text-muted2 leading-relaxed">
              Final pricing may vary depending on wedding date, location, duration and
              availability. Kendaraan lain: contact us for availability and pricing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink(WA_MESSAGES.bmw)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="packages-check-availability"
                onClick={() => track("check_availability_click", { source: "packages_preview" })}
                className="btn-primary"
              >
                Check Availability
              </a>
              <Link to="/packages" data-testid="packages-view-all" className="btn-outline">
                All Packages
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceAreas() {
  return (
    <section data-testid="service-areas" id="service-areas" className="py-16 md:py-24 lg:py-32">
      <div className="container-x">
        <motion.div {...fadeUp}>
          <SectionHeading
            eyebrow="Service Areas"
            title="WEDDING CAR NEAR YOU."
            sub="Serving couples across Bogor, Jabodetabek and Bandung."
          />
        </motion.div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line">
          {LOCATIONS.map((l, i) => (
            <motion.div key={l.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
              <Link
                to={l.path}
                data-testid={`service-area-${l.slug}`}
                onClick={() => track("location_page_view", { city: l.slug, source: "home" })}
                className="group flex items-center justify-between bg-cream px-6 py-8 md:py-10 transition-colors duration-300 hover:bg-charcoal"
              >
                <div>
                  <p className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-cream transition-colors duration-300">
                    {l.city}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted2 group-hover:text-cream/60 transition-colors duration-300">
                    Wedding Car {l.city}
                  </p>
                </div>
                <ChevronRightSmall />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChevronRightSmall() {
  return (
    <span className="text-golddark group-hover:text-gold transition-colors duration-300 text-xl font-serif">→</span>
  );
}

function HomeFAQ() {
  return (
    <section data-testid="home-faq" className="py-16 md:py-24 lg:py-32 bg-ivory border-t border-line">
      <div className="container-x grid lg:grid-cols-5 gap-12">
        <motion.div {...fadeUp} className="lg:col-span-2">
          <SectionHeading
            eyebrow="FAQ"
            title="QUESTIONS, ANSWERED."
            sub="Tidak menemukan jawaban? Tim kami siap membantu via WhatsApp."
          />
        </motion.div>
        <motion.div {...fadeUp} className="lg:col-span-3">
          <FAQBlock faqs={FAQS} idPrefix="home-faq" />
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Sewa Mobil Pengantin & Wedding Car Bogor | The Wedding Cars"
        description="The Wedding Cars — spesialis wedding car premium di Bogor, Jabodetabek & Bandung. BMW 5 Series mulai Rp1.999.000. Cek availability via WhatsApp."
        path="/"
        image="/images/wedding-01.jpg"
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
      <Hero />
      <TrustStrip />
      <FleetSection />
      <BMWFeature />
      <StoryBlocks />
      <RealWeddingsPreview />
      <WhyUs />
      <PackagesPreview />
      <ServiceAreas />
      <HomeFAQ />
      <CTASection image="/images/wedding-03.jpg" />
    </>
  );
}
