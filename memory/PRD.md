# PRD — The Wedding Cars

## Original Problem Statement
Build a production-ready, responsive website for THE WEDDING CARS — a premium wedding car rental specialist for Bogor, Jabodetabek & Bandung. Luxury wedding editorial + premium automotive aesthetic. Primary conversion: WhatsApp inquiries. Hero product: BMW 5 Series starting Rp1.999.000. Use ONLY real photography extracted from 3 uploaded PDFs (portfolio, BMW interior/exterior, fleet). Full SEO foundation, 6 local SEO pages, blog with 10 articles, mobile-first with sticky bottom CTA, floating WhatsApp button, analytics-ready events.

## User Choices
- Bilingual: English editorial headlines + Indonesian body copy
- Contact form: redirect to WhatsApp with prefilled message (no DB storage)
- Blog: concise ~400–600 word articles

## Architecture
- Frontend: React 19 + react-router-dom 7 (SPA), Tailwind, framer-motion, shadcn accordion
- Backend: FastAPI template kept as-is (health endpoint only; no DB needed per user choice)
- Images: extracted from PDFs via PyMuPDF, resized ≤1600px, JPEG q82, served from /public/images
- SEO: per-page SEO component (title/meta/canonical/OG/JSON-LD), static sitemap.xml + robots.txt

## User Personas
- Engaged couples (25-35) in Bogor/Jabodetabek/Bandung planning weddings
- Wedding organizers/family members sourcing vendors via WhatsApp

## Implemented (2026-09-15)
- Homepage with 12 sections: Hero (real wedding photo), Trust strip, Fleet grid (BMW dominant), BMW feature gallery, Story blocks, Real Weddings masonry preview, Why Us, Packages preview, Service Areas, FAQ accordion, Final CTA, Footer
- /wedding-cars + 5 detail pages (BMW page with Exterior/Decoration/Rear Seat/Interior/Panoramic Roof galleries)
- /real-weddings editorial gallery (12 real photos)
- /packages with BMW Rp1.999.000 featured + pricing explanation
- 6 local SEO pages: /wedding-car-{bogor,jakarta,depok,tangerang,bekasi,bandung} with unique intros
- /about, /faq (10 Q&A, honest fallbacks), /blog + 10 articles, /contact (form → WhatsApp + confirmation)
- Floating WhatsApp + sticky mobile bottom CTA; analytics events via dataLayer (whatsapp_click, check_availability_click, booking_form_start/submit, fleet_click, fleet_detail_view, real_wedding_view, instagram_click, location_page_view)
- LocalBusiness/Organization/Product/FAQPage/BreadcrumbList structured data

## Known Limitations
- Toyota Alphard replaced Nissan Teana in the fleet (per visual edit, 2026-09-15); it currently shows a temporary stock image that depicts a sedan — replace with a real Alphard photo when supplied. All other imagery is real client photography.
- SPA: meta tags set client-side (fine for preview; consider SSR/prerender for production SEO)

## Backlog
- P0: Connect real GA4/GTM ID; custom domain
- P1: Lightbox for galleries; WebP/AVIF variants + srcset
- P1: Expand blog articles to long-form
- P2: Instagram feed integration; prerender/SSG for SEO
