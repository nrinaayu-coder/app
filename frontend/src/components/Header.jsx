import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { BRAND, waLink, WA_MESSAGES, LOCATIONS } from "../data/site";
import { track } from "../lib/analytics";

const NAV = [
  { to: "/wedding-cars", label: "Wedding Cars" },
  { to: "/packages", label: "Packages" },
  { to: "/real-weddings", label: "Real Weddings" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setAreasOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = ({ isActive }) =>
    `text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
      isActive ? "text-charcoal" : "text-muted2 hover:text-charcoal"
    }`;

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" data-testid="header-logo" className="flex flex-col leading-none">
          <span className="font-serif text-lg md:text-xl tracking-[0.08em] text-charcoal">
            THE WEDDING CARS
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-golddark mt-0.5">
            Bogor · Jabodetabek · Bandung
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          <NavLink to="/wedding-cars" className={linkCls} data-testid="nav-wedding-cars">Wedding Cars</NavLink>
          <NavLink to="/packages" className={linkCls} data-testid="nav-packages">Packages</NavLink>
          <NavLink to="/real-weddings" className={linkCls} data-testid="nav-real-weddings">Real Weddings</NavLink>
          <div className="relative">
            <button
              data-testid="nav-service-areas"
              onClick={() => setAreasOpen((v) => !v)}
              onBlur={() => setTimeout(() => setAreasOpen(false), 150)}
              className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-medium text-muted2 hover:text-charcoal transition-colors duration-300"
              aria-expanded={areasOpen}
            >
              Service Areas <ChevronDown className="w-3 h-3" />
            </button>
            {areasOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border border-line shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-2">
                {LOCATIONS.map((l) => (
                  <Link
                    key={l.slug}
                    to={l.path}
                    data-testid={`nav-area-${l.slug}`}
                    className="block px-5 py-2.5 text-xs tracking-[0.1em] uppercase text-muted2 hover:text-charcoal hover:bg-ivory transition-colors"
                  >
                    {l.city}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/about" className={linkCls} data-testid="nav-about">About</NavLink>
          <NavLink to="/faq" className={linkCls} data-testid="nav-faq">FAQ</NavLink>
          <NavLink to="/blog" className={linkCls} data-testid="nav-blog">Blog</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="header-check-availability"
            onClick={() => track("check_availability_click", { source: "header" })}
            className="hidden sm:inline-flex btn-primary !px-6 !py-3"
          >
            Check Availability
          </a>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 text-charcoal"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-line" data-testid="mobile-menu">
          <nav className="container-x py-6 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV.slice(0, 3).map((n) => (
              <Link key={n.to} to={n.to} data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g, "-")}`} className="py-3 font-serif text-2xl text-charcoal border-b border-line/60">
                {n.label}
              </Link>
            ))}
            <p className="pt-4 pb-1 text-[10px] uppercase tracking-[0.3em] text-golddark">Service Areas</p>
            <div className="grid grid-cols-2 gap-x-4">
              {LOCATIONS.map((l) => (
                <Link key={l.slug} to={l.path} data-testid={`mobile-nav-area-${l.slug}`} className="py-2 text-sm text-muted2">
                  {l.city}
                </Link>
              ))}
            </div>
            {NAV.slice(3).map((n) => (
              <Link key={n.to} to={n.to} data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g, "-")}`} className="py-3 font-serif text-2xl text-charcoal border-b border-line/60">
                {n.label}
              </Link>
            ))}
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-menu-check-availability"
              onClick={() => track("check_availability_click", { source: "mobile_menu" })}
              className="btn-primary mt-5 w-full"
            >
              Check Availability
            </a>
            <p className="text-center text-xs text-muted2 pt-3">{BRAND.whatsappDisplay}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
