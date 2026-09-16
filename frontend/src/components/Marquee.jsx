const ITEMS = [
  "More than a wedding car",
  "It's part of your story",
  "Bogor · Jabodetabek · Bandung",
  "Karena di hari spesial, setiap detail punya cerita",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-line bg-cream py-5 md:py-7" aria-hidden="true" data-testid="editorial-marquee">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="font-serif italic text-2xl md:text-4xl text-charcoal/85 px-6 md:px-10">{item}</span>
                <span className="w-1.5 h-1.5 rotate-45 bg-gold shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
