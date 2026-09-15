import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingWhatsApp, StickyMobileCTA } from "@/components/Conversion";
import Home from "@/pages/Home";
import Fleet from "@/pages/Fleet";
import FleetDetail from "@/pages/FleetDetail";
import RealWeddings from "@/pages/RealWeddings";
import Packages from "@/pages/Packages";
import LocationPage from "@/pages/LocationPage";
import About from "@/pages/About";
import FaqPage from "@/pages/FaqPage";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import { LOCATIONS } from "@/data/site";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="container-x pt-44 pb-28 text-center" data-testid="not-found">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-4xl sm:text-5xl text-charcoal">Page not found</h1>
      <p className="mt-4 text-muted2">Halaman yang Anda cari tidak tersedia.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex" data-testid="not-found-home">
        Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="App bg-cream min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="pb-14 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wedding-cars" element={<Fleet />} />
            <Route path="/wedding-cars/:slug" element={<FleetDetail />} />
            <Route path="/wedding-cars/xpander" element={<Navigate to="/wedding-cars" replace />} />
            <Route path="/real-weddings" element={<RealWeddings />} />
            <Route path="/packages" element={<Packages />} />
            {LOCATIONS.map((l) => (
              <Route key={l.slug} path={l.path} element={<LocationPage slug={l.slug} />} />
            ))}
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <StickyMobileCTA />
      </BrowserRouter>
    </div>
  );
}

export default App;
