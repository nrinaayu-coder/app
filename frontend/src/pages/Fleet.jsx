import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { SectionHeading, FleetCard, CTASection, Breadcrumbs } from "../components/Sections";
import { FLEET } from "../data/site";

export default function Fleet() {
  const bmw = FLEET[0];
  const others = FLEET.slice(1);
  return (
    <>
      <SEO
        title="Our Wedding Cars — BMW, Mercedes-Benz & More | The Wedding Cars"
        description="Pilih wedding car untuk hari pernikahan Anda: BMW 5 Series mulai Rp1.999.000, Mercedes-Benz, Toyota Fortuner, Mitsubishi Xpander, Nissan Teana. Bogor, Jabodetabek & Bandung."
        path="/wedding-cars"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Wedding Cars", path: "/wedding-cars" }]}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Wedding Cars", path: "/wedding-cars" }]} />
      <section className="pb-16 md:pb-24" data-testid="fleet-page">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="The Fleet"
            title="OUR WEDDING CARS"
            sub="From timeless luxury to comfortable elegance — each car is prepared to be part of your story."
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-12"
          >
            <FleetCard car={bmw} large />
          </motion.div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {others.map((car) => (
              <FleetCard key={car.slug} car={car} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
