import { useState, useRef } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import SEO from "../components/SEO";
import { SectionHeading, Breadcrumbs } from "../components/Sections";
import { BRAND, FLEET, LOCATIONS, waLink, WA_MESSAGES } from "../data/site";
import { track } from "../lib/analytics";

const initial = { name: "", date: "", location: "", car: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  const started = useRef(false);

  const onChange = (e) => {
    if (!started.current) {
      started.current = true;
      track("booking_form_start");
    }
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo The Wedding Cars, saya ingin mengecek availability wedding car.\n\nNama: ${form.name}\nTanggal wedding: ${form.date}\nLokasi: ${form.location}\nMobil yang diminati: ${form.car}\nNomor WhatsApp: ${form.phone}${form.message ? `\nPesan: ${form.message}` : ""}`;
    track("booking_form_submit", { car: form.car, location: form.location });
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const inputCls =
    "w-full bg-white border border-line px-4 py-3.5 text-sm text-charcoal placeholder:text-muted2/60 focus:border-gold focus:outline-none transition-colors";

  return (
    <>
      <SEO
        title="Contact & Check Availability | The Wedding Cars Bogor"
        description="Cek availability wedding car untuk tanggal pernikahan Anda. Isi form inquiry atau chat langsung via WhatsApp — The Wedding Cars Bogor, Jabodetabek & Bandung."
        path="/contact"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <section className="pb-20 md:pb-28" data-testid="contact-page">
        <div className="container-x grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Contact & Booking"
              title="CHECK YOUR DATE."
              sub="Ceritakan rencana wedding Anda — kami akan mengecek availability dan membantu menyiapkan sisanya."
            />
            <div className="mt-10 space-y-6 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-golddark mb-1">WhatsApp</p>
                <a
                  href={waLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp-direct"
                  onClick={() => track("whatsapp_click", { source: "contact_page" })}
                  className="font-serif text-xl text-charcoal hover:text-golddark transition-colors"
                >
                  {BRAND.whatsappDisplay}
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-golddark mb-1">Instagram</p>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-instagram"
                  onClick={() => track("instagram_click", { source: "contact_page" })}
                  className="font-serif text-xl text-charcoal hover:text-golddark transition-colors"
                >
                  {BRAND.instagram}
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-golddark mb-1">Studio</p>
                <p className="text-muted2 leading-relaxed">{BRAND.address}</p>
              </div>
            </div>
            <div className="img-frame aspect-[4/3] mt-10 hidden lg:block">
              <img src="/images/wedding-06.jpg" alt="Pasangan pengantin bersama BMW wedding car" loading="lazy" className="editorial-img" />
            </div>
          </div>

          <div className="lg:col-span-3">
            {sent ? (
              <div className="border border-line bg-ivory p-10 md:p-14 text-center" data-testid="booking-confirmation">
                <CheckCircle2 className="w-10 h-10 text-golddark mx-auto" />
                <h2 className="mt-5 font-serif text-3xl text-charcoal">Thank you, {form.name || "calon pengantin"}.</h2>
                <p className="mt-4 text-muted2 leading-relaxed max-w-md mx-auto">
                  Inquiry Anda sudah kami siapkan dan WhatsApp telah terbuka dengan detail Anda.
                  Jika jendela WhatsApp belum terbuka, klik tombol di bawah ini.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={waLink(WA_MESSAGES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="confirmation-whatsapp"
                    onClick={() => track("whatsapp_click", { source: "booking_confirmation" })}
                    className="btn-primary"
                  >
                    <MessageCircle className="w-4 h-4" /> Open WhatsApp
                  </a>
                  <button
                    data-testid="confirmation-new-inquiry"
                    onClick={() => { setSent(false); setForm(initial); started.current = false; }}
                    className="btn-outline"
                  >
                    New Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="border border-line bg-white p-7 md:p-10 space-y-5" data-testid="booking-form">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Nama *</label>
                    <input id="name" name="name" required value={form.name} onChange={onChange} placeholder="Nama Anda" className={inputCls} data-testid="form-name" />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Tanggal Wedding *</label>
                    <input id="date" name="date" type="date" required value={form.date} onChange={onChange} className={inputCls} data-testid="form-date" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="location" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Lokasi Wedding *</label>
                    <select id="location" name="location" required value={form.location} onChange={onChange} className={inputCls} data-testid="form-location">
                      <option value="">Pilih lokasi</option>
                      {LOCATIONS.map((l) => (
                        <option key={l.slug} value={l.city}>{l.city}</option>
                      ))}
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="car" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Mobil yang Diminati *</label>
                    <select id="car" name="car" required value={form.car} onChange={onChange} className={inputCls} data-testid="form-car">
                      <option value="">Pilih mobil</option>
                      {FLEET.map((c) => (
                        <option key={c.slug} value={c.name}>{c.name}</option>
                      ))}
                      <option value="Belum yakin">Belum yakin — butuh rekomendasi</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Nomor WhatsApp *</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} placeholder="08xx xxxx xxxx" className={inputCls} data-testid="form-phone" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-muted2 mb-2">Pesan</label>
                  <textarea id="message" name="message" rows={4} value={form.message} onChange={onChange} placeholder="Ceritakan rencana wedding Anda — venue, tema, atau pertanyaan lainnya." className={inputCls} data-testid="form-message" />
                </div>
                <button type="submit" className="btn-primary w-full" data-testid="booking-form-submit">
                  Check Availability
                </button>
                <p className="text-xs text-muted2 text-center leading-relaxed">
                  Dengan mengirim form ini, Anda akan diarahkan ke WhatsApp dengan detail inquiry
                  yang sudah terisi otomatis.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
