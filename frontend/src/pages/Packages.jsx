import SEO from "../components/SEO";
import { SectionHeading, CTASection, Breadcrumbs } from "../components/Sections";
import { FLEET, waLink, WA_MESSAGES } from "../data/site";
import { track } from "../lib/analytics";

export default function Packages() {
  const bmw = FLEET[0];
  const others = FLEET.slice(1);
  return (
    <>
      <SEO
        title="Wedding Car Packages — BMW mulai Rp1.999.000 | The Wedding Cars"
        description="Paket wedding car The Wedding Cars: BMW 5 Series mulai Rp1.999.000. Harga final tergantung tanggal, lokasi, durasi & availability. Cek via WhatsApp."
        path="/packages"
        image="/images/bmw-11.jpg"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Packages", path: "/packages" }]}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Packages", path: "/packages" }]} />
      <section className="pb-16 md:pb-24" data-testid="packages-page">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Packages & Pricing"
            title="WEDDING CAR PACKAGES"
            sub="Harga yang jujur sejak awal — tanpa kejutan di kemudian hari."
          />

          <div className="mt-14 max-w-5xl mx-auto grid md:grid-cols-2 border border-line bg-cream shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="img-frame aspect-[4/3] md:aspect-auto">
              <img src={bmw.image} alt={bmw.alt} fetchPriority="high" className="editorial-img" />
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <span className="eyebrow">Featured Package</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">BMW 5 Series</h2>
              <p className="mt-2 font-serif italic text-muted2">Elegant. Executive. Timeless.</p>
              <p className="mt-8">
                <span className="text-[11px] uppercase tracking-[0.25em] text-golddark block">Starting from</span>
                <span className="font-serif text-5xl text-charcoal" data-testid="packages-bmw-price">Rp1.999.000</span>
              </p>
              <p className="mt-5 text-xs text-muted2 leading-relaxed">
                Final pricing may vary depending on wedding date, location, duration and
                availability. Untuk detail inklusi paket, silakan hubungi tim kami via WhatsApp.
              </p>
              <a
                href={waLink(WA_MESSAGES.bmw)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="packages-bmw-cta"
                onClick={() => track("check_availability_click", { source: "packages_page", car: "bmw-5-series" })}
                className="btn-primary mt-9 w-full sm:w-auto"
              >
                Check BMW Availability
              </a>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal text-center">Other Wedding Cars</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
              {others.map((car) => (
                <div key={car.slug} className="bg-cream p-6 flex flex-col" data-testid={`package-card-${car.slug}`}>
                  <div className="img-frame aspect-[4/3]">
                    <img src={car.teanaStock || car.image} alt={car.alt} loading="lazy" className="editorial-img" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-charcoal">{car.name}</h3>
                  <p className="mt-1 text-xs font-serif italic text-muted2">{car.tagline}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.15em] text-muted2">
                    Contact us for availability and pricing
                  </p>
                  <a
                    href={waLink(WA_MESSAGES.car(car.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`package-cta-${car.slug}`}
                    onClick={() => track("check_availability_click", { source: "packages_page", car: car.slug })}
                    className="btn-outline mt-5 !px-5 !py-3 text-center"
                  >
                    Ask Availability
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl text-charcoal">How Pricing Works</h2>
            <p className="mt-4 text-muted2 text-sm leading-relaxed">
              Harga final setiap paket bergantung pada <strong>tanggal wedding</strong>,{" "}
              <strong>lokasi acara</strong>, <strong>durasi penggunaan</strong>,{" "}
              <strong>pilihan kendaraan</strong>, dan <strong>ketersediaan armada</strong>.
              Cara tercepat untuk mendapatkan penawaran akurat: kirim tanggal, lokasi, dan mobil
              yang Anda minati via WhatsApp.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
