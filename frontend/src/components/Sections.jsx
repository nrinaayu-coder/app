import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import { waLink, WA_MESSAGES } from "../data/site";
import { track } from "../lib/analytics";

export function SectionHeading({ eyebrow, title, sub, light = false, center = false, as = "h2" }) {
  const Tag = as;
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow" data-testid="section-eyebrow">{eyebrow}</span>}
      <Tag
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] ${
          light ? "text-cream" : "text-charcoal"
        }`}
      >
        {title}
      </Tag>
      {sub && (
        <p className={`mt-5 text-base sm:text-lg font-serif italic leading-relaxed ${light ? "text-cream/70" : "text-muted2"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-24 md:pt-28 pb-6" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-muted2">
        {items.map((b, i) => (
          <li key={b.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-gold" />}
            {i < items.length - 1 ? (
              <Link to={b.path} className="hover:text-charcoal transition-colors">{b.name}</Link>
            ) : (
              <span className="text-charcoal" aria-current="page">{b.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function TrustStrip() {
  const items = [
    { t: "Real Weddings", d: "Dokumentasi pernikahan sungguhan" },
    { t: "Wedding-Focused Service", d: "Spesialis mobil pengantin" },
    { t: "Wedding-Ready Vehicles", d: "Armada disiapkan untuk hari-H" },
    { t: "Easy Booking", d: "Cukup lewat WhatsApp" },
  ];
  return (
    <section data-testid="trust-strip" className="border-y border-line bg-ivory">
      <div className="container-x py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((it, i) => (
          <div key={it.t} className={`${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""}`}>
            <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-charcoal">{it.t}</p>
            <p className="mt-2 text-sm text-muted2 font-serif italic">{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FleetCard({ car, large = false }) {
  const img = car.teanaStock || car.image;
  return (
    <Link
      to={`/wedding-cars/${car.slug}`}
      data-testid={`fleet-card-${car.slug}`}
      onClick={() => track("fleet_click", { car: car.slug })}
      className="group block"
    >
      <div className={`img-frame ${large ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"}`}>
        <img
          src={img}
          alt={car.alt}
          loading="lazy"
          className="editorial-img group-hover:scale-[1.04]"
        />
      </div>
      <div className="pt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl text-charcoal group-hover:text-golddark transition-colors duration-300">
            {car.name}
          </h3>
          <p className="mt-1 text-sm font-serif italic text-muted2">{car.tagline}</p>
          {car.price ? (
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-golddark font-semibold">
              Starting from {car.price}
            </p>
          ) : (
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted2">
              Contact us for availability & pricing
            </p>
          )}
        </div>
        <span className="mt-2 w-9 h-9 shrink-0 border border-line flex items-center justify-center text-charcoal transition-colors duration-300 group-hover:bg-charcoal group-hover:text-cream">
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

export function FAQBlock({ faqs, idPrefix = "faq" }) {
  return (
    <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`${idPrefix}-${i}`} className="border-line">
          <AccordionTrigger
            data-testid={`${idPrefix}-question-${i}`}
            className="font-serif text-lg sm:text-xl text-charcoal hover:text-golddark hover:no-underline py-5 text-left"
          >
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted2 leading-relaxed text-sm sm:text-base max-w-3xl">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function CTASection({ title = "READY FOR YOUR WEDDING DAY?", sub = "Your date deserves the right car.", message = WA_MESSAGES.general, image }) {
  return (
    <section data-testid="cta-section" className="relative bg-ink overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </>
      )}
      <div className="relative container-x py-24 md:py-36 text-center">
        <span className="eyebrow !text-gold">Check Your Date</span>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream tracking-tight leading-[1.05] max-w-3xl mx-auto">
          {title}
        </h2>
        <p className="mt-6 font-serif italic text-lg sm:text-xl text-cream/70">{sub}</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-check-availability"
            onClick={() => track("check_availability_click", { source: "cta_section" })}
            className="btn-gold w-full sm:w-auto"
          >
            Check Availability
          </a>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cta-whatsapp"
            onClick={() => track("whatsapp_click", { source: "cta_section" })}
            className="btn-outline-light w-full sm:w-auto"
          >
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
