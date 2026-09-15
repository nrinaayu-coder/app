import SEO from "../components/SEO";
import { SectionHeading, CTASection, Breadcrumbs } from "../components/Sections";
import { WEDDING_IMAGES, BRAND } from "../data/site";

const values = [
  { t: "Wedding Specialization", d: "Kami bukan rental mobil umum. Fokus kami satu: mobil pengantin — dan semua detail yang menyertainya." },
  { t: "Premium Presentation", d: "Armada disiapkan dalam kondisi terbaik, karena mobil pengantin akan tampil di foto dan video pernikahan Anda selamanya." },
  { t: "Real Wedding Moments", d: "Portofolio kami adalah dokumentasi pernikahan sungguhan — bukan foto katalog atau stok gambar." },
  { t: "Simple Booking", d: "Tidak ada formulir rumit atau proses berbelit. Cukup satu percakapan WhatsApp untuk mengecek tanggal Anda." },
];

export default function About() {
  return (
    <>
      <SEO
        title="About The Wedding Cars — Wedding Car Specialist Bogor"
        description="The Wedding Cars adalah spesialis wedding car berbasis di Bogor, melayani Bogor, Jabodetabek & Bandung. More than a wedding car — it's part of your story."
        path="/about"
        image="/images/wedding-05.jpg"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "The Wedding Cars",
          url: "https://bogor-wedding-bmw.preview.emergentagent.com",
          sameAs: [BRAND.instagramUrl],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Jalan Siliwangi IV, Ciampea",
            addressLocality: "Bogor",
            addressCountry: "ID",
          },
        }}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      <section className="pb-16 md:pb-24" data-testid="about-page">
        <div className="container-x max-w-4xl">
          <span className="eyebrow">About Us</span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.05]">
            MORE THAN A WEDDING CAR.
          </h1>
          <p className="mt-6 font-serif italic text-xl text-golddark">
            It's part of your story.
          </p>
          <div className="mt-8 space-y-5 text-muted2 leading-relaxed">
            <p>
              The Wedding Cars adalah layanan sewa mobil pengantin premium yang berbasis di{" "}
              {BRAND.address}, melayani pasangan di Bogor, Jabodetabek, dan Bandung.
            </p>
            <p>
              Kami percaya mobil pengantin bukan sekadar transportasi. Ia adalah bagian dari
              momen kedatangan Anda, latar foto yang akan dikenang, dan detail kecil yang
              melengkapi cerita hari besar Anda. Karena di hari spesial, setiap detail punya cerita.
            </p>
            <p>
              Itulah mengapa setiap armada kami disiapkan khusus untuk pernikahan — bersih,
              wedding-ready, dan siap tampil sempurna dari prosesi akad hingga resepsi.
            </p>
          </div>
        </div>

        <div className="container-x mt-16">
          <div className="grid md:grid-cols-2 gap-4">
            {["/images/wedding-05.jpg", "/images/wedding-04.jpg"].map((src) => (
              <div key={src} className="img-frame aspect-[3/4] md:aspect-[4/5]">
                <img
                  src={src}
                  alt={WEDDING_IMAGES.find((w) => w.src === src)?.alt || "Dokumentasi pernikahan The Wedding Cars"}
                  loading="lazy"
                  className="editorial-img hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="container-x mt-16 md:mt-24">
          <SectionHeading eyebrow="What We Stand For" title="OUR PROMISE TO YOU" />
          <div className="mt-10 grid sm:grid-cols-2 gap-px bg-line border border-line">
            {values.map((v) => (
              <div key={v.t} className="bg-cream p-8 md:p-10">
                <h2 className="font-serif text-2xl text-charcoal">{v.t}</h2>
                <p className="mt-3 text-sm text-muted2 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection image="/images/wedding-02.jpg" />
    </>
  );
}
