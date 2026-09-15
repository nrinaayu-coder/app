import SEO from "../components/SEO";
import { SectionHeading, FAQBlock, CTASection, Breadcrumbs } from "../components/Sections";
import { FAQS } from "../data/site";

export default function FaqPage() {
  return (
    <>
      <SEO
        title="FAQ — Pertanyaan Seputar Sewa Wedding Car | The Wedding Cars"
        description="Jawaban atas pertanyaan umum seputar sewa mobil pengantin: harga, availability, driver, durasi, dekorasi, area layanan, dan cara booking."
        path="/faq"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <section className="pb-20 md:pb-28" data-testid="faq-page">
        <div className="container-x max-w-4xl">
          <SectionHeading
            as="h1"
            eyebrow="Frequently Asked Questions"
            title="EVERYTHING YOU NEED TO KNOW."
            sub="Jawaban jujur untuk pertanyaan yang paling sering kami terima. Tidak menemukan jawaban Anda? Tanya langsung via WhatsApp."
          />
          <div className="mt-12">
            <FAQBlock faqs={FAQS} idPrefix="faq-page" />
          </div>
        </div>
      </section>
      <CTASection title="STILL HAVE QUESTIONS?" sub="Tim kami siap membantu — cukup satu pesan WhatsApp." />
    </>
  );
}
