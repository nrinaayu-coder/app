import { Link } from "react-router-dom";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { BRAND, waLink, WA_MESSAGES, LOCATIONS, FLEET } from "../data/site";
import { track } from "../lib/analytics";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-ink text-cream/80">
      <div className="container-x py-16 md:py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl tracking-[0.08em] text-cream">THE WEDDING CARS</p>
          <p className="font-serif italic text-gold mt-2 text-lg">
            More than a wedding car. It's part of your story.
          </p>
          <p className="mt-6 text-sm leading-relaxed max-w-md text-cream/60">
            Premium wedding car specialist based in Bogor, serving couples across Bogor,
            Jabodetabek and Bandung. Karena di hari spesial, setiap detail punya cerita.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <span className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              {BRAND.address}
            </span>
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp"
              onClick={() => track("whatsapp_click", { source: "footer" })}
              className="flex items-center gap-3 hover:text-cream transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-gold shrink-0" />
              {BRAND.whatsappDisplay}
            </a>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-instagram"
              onClick={() => track("instagram_click", { source: "footer" })}
              className="flex items-center gap-3 hover:text-cream transition-colors"
            >
              <Instagram className="w-4 h-4 text-gold shrink-0" />
              {BRAND.instagram}
            </a>
          </div>
        </div>

        <nav aria-label="Footer wedding cars">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Wedding Cars</p>
          <ul className="space-y-3 text-sm">
            {FLEET.map((c) => (
              <li key={c.slug}>
                <Link to={`/wedding-cars/${c.slug}`} data-testid={`footer-car-${c.slug}`} className="hover:text-cream transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
            <li><Link to="/packages" data-testid="footer-packages" className="hover:text-cream transition-colors">Packages</Link></li>
            <li><Link to="/real-weddings" data-testid="footer-real-weddings" className="hover:text-cream transition-colors">Real Weddings</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer service areas">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Service Areas</p>
          <ul className="space-y-3 text-sm">
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link to={l.path} data-testid={`footer-area-${l.slug}`} className="hover:text-cream transition-colors">
                  Wedding Car {l.city}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} The Wedding Cars. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" data-testid="footer-about" className="hover:text-cream transition-colors">About</Link>
            <Link to="/faq" data-testid="footer-faq" className="hover:text-cream transition-colors">FAQ</Link>
            <Link to="/blog" data-testid="footer-blog" className="hover:text-cream transition-colors">Blog</Link>
            <Link to="/contact" data-testid="footer-contact" className="hover:text-cream transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
