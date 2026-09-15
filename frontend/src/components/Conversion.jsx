import { MessageCircle, CalendarCheck } from "lucide-react";
import { waLink, WA_MESSAGES } from "../data/site";
import { track } from "../lib/analytics";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      data-testid="floating-whatsapp"
      onClick={() => track("whatsapp_click", { source: "floating_button" })}
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(18,140,126,0.35)] transition-transform duration-300 hover:scale-105"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" aria-hidden="true" />
      <MessageCircle className="w-7 h-7 relative" fill="currentColor" />
    </a>
  );
}

export function StickyMobileCTA() {
  return (
    <div
      data-testid="sticky-mobile-cta"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-cream/95 backdrop-blur-md border-t border-line grid grid-cols-2"
    >
      <a
        href={waLink(WA_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="sticky-cta-availability"
        onClick={() => track("check_availability_click", { source: "sticky_bar" })}
        className="flex items-center justify-center gap-2 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-charcoal"
      >
        <CalendarCheck className="w-4 h-4" /> Check Availability
      </a>
      <a
        href={waLink(WA_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="sticky-cta-whatsapp"
        onClick={() => track("whatsapp_click", { source: "sticky_bar" })}
        className="flex items-center justify-center gap-2 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] bg-charcoal text-cream"
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
    </div>
  );
}
