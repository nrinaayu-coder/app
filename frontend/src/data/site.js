export const BRAND = {
  name: "The Wedding Cars",
  tagline: "More than a wedding car. It's part of your story.",
  address: "Jalan Siliwangi IV, Ciampea, Bogor, Indonesia",
  instagram: "@theweddingcars",
  instagramUrl: "https://www.instagram.com/theweddingcars",
  whatsappDisplay: "+62 852-1045-2328",
  whatsapp: "6285210452328",
};

export const waLink = (message) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

export const WA_MESSAGES = {
  general:
    "Halo The Wedding Cars, saya ingin mengecek availability wedding car.\n\nNama:\nTanggal wedding:\nLokasi:\nMobil yang diminati:",
  bmw: "Halo The Wedding Cars, saya tertarik BMW 5 Series untuk wedding saya. Bisa cek availability untuk tanggal wedding saya?",
  location: (city) =>
    `Halo The Wedding Cars, saya ingin mengecek availability wedding car di ${city}.\n\nNama:\nTanggal wedding:\nMobil yang diminati:`,
  car: (carName) =>
    `Halo The Wedding Cars, saya ingin mengecek availability & harga ${carName} untuk wedding saya.\n\nNama:\nTanggal wedding:\nLokasi:`,
};

export const FALLBACK_ANSWER =
  "Silakan hubungi tim The Wedding Cars untuk detail paket sesuai tanggal dan lokasi wedding Anda.";

export const WEDDING_IMAGES = [
  { src: "/images/wedding-01.jpg", label: "Wedding Arrival", alt: "Pengantin tiba di venue pernikahan dengan BMW putih" },
  { src: "/images/wedding-02.jpg", label: "BMW Wedding", alt: "Pengantin pria membukakan pintu BMW untuk pengantin wanita" },
  { src: "/images/wedding-03.jpg", label: "Real Wedding", alt: "Pasangan pengantin di samping BMW 5 Series berdekorasi bunga" },
  { src: "/images/wedding-04.jpg", label: "Wedding Moment", alt: "Pasangan pengantin berfoto melalui panoramic roof BMW" },
  { src: "/images/wedding-05.jpg", label: "Real Wedding", alt: "Pasangan pengantin berbusana adat di depan BMW wedding car" },
  { src: "/images/wedding-06.jpg", label: "BMW Wedding", alt: "Pasangan pengantin berbusana adat membuka pintu BMW putih" },
  { src: "/images/wedding-07.jpg", label: "Wedding Arrival", alt: "Pengantin wanita berjalan menuju BMW wedding car" },
  { src: "/images/wedding-08.jpg", label: "Wedding Moment", alt: "Pengantin pria membantu pengantin wanita masuk ke mobil" },
  { src: "/images/wedding-09.jpg", label: "Real Wedding", alt: "Pengantin pria membukakan pintu mobil untuk pengantin wanita" },
  { src: "/images/wedding-10.jpg", label: "Wedding Moment", alt: "Momen pengantin wanita keluar dari BMW wedding car" },
  { src: "/images/wedding-11.jpg", label: "BMW Wedding", alt: "Pasangan pengantin berbusana adat bersama BMW 5 Series" },
  { src: "/images/wedding-12.jpg", label: "Real Wedding", alt: "Pengantin wanita keluar dari mobil pengantin didampingi pengantin pria" },
];

export const BMW_IMAGES = {
  hero: { src: "/images/bmw-11.jpg", alt: "BMW 5 Series putih dengan dekorasi bunga pernikahan" },
  exterior: [
    { src: "/images/bmw-11.jpg", alt: "Tampak depan BMW 5 Series wedding car dengan dekorasi bunga" },
    { src: "/images/bmw-01.jpg", alt: "Sisi samping BMW 5 Series putih dengan pita dan bunga pernikahan" },
  ],
  decoration: [
    { src: "/images/bmw-10.jpg", alt: "Dekorasi bunga pernikahan di kap mesin BMW 5 Series" },
    { src: "/images/wedding-04.jpg", alt: "Pasangan pengantin berfoto dengan BMW berdekorasi bunga" },
  ],
  rearSeat: [{ src: "/images/bmw-02.jpg", alt: "Kursi belakang BMW 5 Series yang lega dan nyaman" }],
  panoramic: [
    { src: "/images/bmw-03.jpg", alt: "Panoramic roof BMW 5 Series dari luar" },
    { src: "/images/bmw-05.jpg", alt: "Suasana kabin BMW 5 Series dengan panoramic roof" },
  ],
  interior: [
    { src: "/images/bmw-04.jpg", alt: "Interior dan kokpit BMW 5 Series" },
    { src: "/images/bmw-06.jpg", alt: "Dashboard dan konsol tengah BMW 5 Series" },
    { src: "/images/bmw-07.jpg", alt: "Dashboard BMW 5 Series dengan panoramic roof" },
  ],
};

export const FLEET = [
  {
    slug: "bmw-5-series",
    name: "BMW 5 Series",
    tagline: "Elegant. Executive. Timeless.",
    price: "Rp1.999.000",
    priceNote: "Starting from",
    image: "/images/bmw-11.jpg",
    alt: "BMW 5 Series putih dengan dekorasi bunga pernikahan",
    description:
      "BMW 5 Series menjadi pilihan utama pasangan yang menginginkan kesan elegan, eksekutif, dan timeless di hari pernikahan. Dari momen kedatangan hingga sesi foto, mobil ini hadir sebagai bagian dari cerita hari spesial Anda.",
    why: [
      "Tampilan elegan yang fotogenik untuk foto pernikahan",
      "Kabin lapang dan nyaman untuk pengantin berbusana lengkap",
      "Panoramic roof untuk momen foto yang ikonik",
      "Aura premium untuk kedatangan yang berkesan",
    ],
    featured: true,
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    tagline: "Classic prestige for your special day.",
    price: null,
    image: "/images/fleet-03.jpg",
    alt: "Mercedes-Benz hitam dengan dekorasi bunga pernikahan",
    description:
      "Mercedes-Benz membawa kesan prestise klasik yang tak lekang oleh waktu — pilihan tepat untuk pernikahan dengan nuansa formal dan mewah.",
    why: [
      "Kesan mewah dan berkelas untuk acara pernikahan",
      "Cocok untuk tema pernikahan klasik maupun modern",
      "Nyaman untuk perjalanan akad hingga resepsi",
    ],
  },
  {
    slug: "fortuner",
    name: "Toyota Fortuner",
    tagline: "Bold presence, comfortable journey.",
    price: null,
    image: "/images/fleet-02.jpg",
    alt: "Toyota Fortuner hitam dengan dekorasi pernikahan",
    description:
      "Toyota Fortuner menghadirkan kehadiran yang gagah dengan kenyamanan ekstra — ideal untuk keluarga dan rombongan pengantin.",
    why: [
      "Kabin tinggi dan lega, mudah untuk busana pengantin",
      "Tampil gagah dalam foto pernikahan",
      "Nyaman untuk perjalanan luar kota",
    ],
  },
  {
    slug: "xpander",
    name: "Mitsubishi Xpander",
    tagline: "Practical elegance for the family.",
    price: null,
    image: "/images/fleet-01.jpg",
    alt: "Mitsubishi Xpander dengan dekorasi bunga pernikahan",
    description:
      "Mitsubishi Xpander adalah pilihan praktis dan elegan untuk kebutuhan transportasi keluarga di hari pernikahan.",
    why: [
      "Fleksibel untuk kebutuhan keluarga dan rombongan",
      "Tetap tampil rapi dan elegan dengan dekorasi",
      "Pilihan efisien tanpa mengorbankan kesan",
    ],
  },
  {
    slug: "alphard",
    name: "Toyota Alphard",
    tagline: "First-class comfort, unmistakable presence.",
    price: null,
    image: "/images/fleet-alphard.jpg",
    stockImage: "https://images.unsplash.com/photo-1693762464020-fc46e9cbeb33?crop=entropy&cs=srgb&fm=jpg&q=85",
    alt: "Toyota Alphard untuk wedding car",
    description:
      "Toyota Alphard menghadirkan kemewahan dan kenyamanan kelas satu dengan kabin super lega — favorit untuk pengantin berbusana lengkap dan rombongan keluarga.",
    why: [
      "Kabin sangat lega, ideal untuk gaun dan busana adat",
      "Kesan mewah dan berwibawa saat kedatangan",
      "Nyaman untuk pengantin maupun keluarga inti",
    ],
  },
];

export const LOCATIONS = [
  {
    slug: "bogor",
    path: "/wedding-car-bogor",
    city: "Bogor",
    title: "Wedding Car Bogor | Sewa Mobil Pengantin Premium",
    h1: "Wedding Car Bogor",
    description:
      "Sewa mobil pengantin & wedding car premium di Bogor. BMW 5 Series mulai Rp1.999.000. Melayani Bogor & sekitarnya — cek availability via WhatsApp.",
    intro: [
      "The Wedding Cars berbasis di Jalan Siliwangi IV, Ciampea, Bogor — menjadikan Bogor area layanan utama kami. Sebagai spesialis wedding car di Bogor, kami memahami ritme hari pernikahan: dari persiapan pagi hari, prosesi akad, hingga resepsi dan sesi foto bersama mobil pengantin.",
      "Untuk pernikahan di Bogor — baik di kota, Ciampea, Dramaga, hingga area Sentul — armada kami disiapkan dalam kondisi wedding-ready. BMW 5 Series menjadi favorit pasangan di Bogor, dengan harga mulai Rp1.999.000.",
    ],
  },
  {
    slug: "jakarta",
    path: "/wedding-car-jakarta",
    city: "Jakarta",
    title: "Wedding Car Jakarta | Sewa Mobil Pengantin Premium",
    h1: "Wedding Car Jakarta",
    description:
      "Sewa wedding car premium untuk pernikahan di Jakarta. BMW 5 Series & armada wedding-ready lainnya. Cek availability via WhatsApp.",
    intro: [
      "Merencanakan pernikahan di Jakarta membutuhkan detail yang presisi — termasuk mobil pengantin. The Wedding Cars melayani pasangan di seluruh Jakarta, dari gedung resepsi di Jakarta Selatan hingga venue di Jakarta Barat, Utara, Timur, dan Pusat.",
      "BMW 5 Series kami siap menemani kedatangan Anda dengan kesan elegan di tengah hiruk pikuk kota. Tim kami akan membantu menyesuaikan jadwal dengan timeline acara Anda di Jakarta.",
    ],
  },
  {
    slug: "depok",
    path: "/wedding-car-depok",
    city: "Depok",
    title: "Wedding Car Depok | Sewa Mobil Pengantin Premium",
    h1: "Wedding Car Depok",
    description:
      "Sewa mobil pengantin premium di Depok. BMW 5 Series & pilihan wedding car lainnya. Cek tanggal wedding Anda via WhatsApp.",
    intro: [
      "Untuk pasangan yang menikah di Depok, The Wedding Cars menghadirkan layanan wedding car premium tanpa repot. Lokasi Depok yang berdekatan dengan basis kami di Bogor membuat koordinasi hari pernikahan menjadi lebih mudah dan fleksibel.",
      "Dari akad di kediaman hingga resepsi di gedung, mobil pengantin kami — termasuk BMW 5 Series — disiapkan untuk membuat setiap perpindahan lokasi terasa istimewa.",
    ],
  },
  {
    slug: "tangerang",
    path: "/wedding-car-tangerang",
    city: "Tangerang",
    title: "Wedding Car Tangerang | Sewa Mobil Pengantin Premium",
    h1: "Wedding Car Tangerang",
    description:
      "Sewa wedding car premium di Tangerang & sekitarnya. BMW 5 Series dan armada wedding-ready. Cek availability via WhatsApp.",
    intro: [
      "The Wedding Cars melayani pernikahan di Tangerang dan sekitarnya — dari venue modern di Gading Serpong hingga acara adat di kediaman keluarga. Kami memahami bahwa setiap pernikahan di Tangerang punya karakter dan kebutuhan yang berbeda.",
      "Ceritakan tanggal dan lokasi wedding Anda, dan tim kami akan membantu merekomendasikan wedding car yang tepat, termasuk BMW 5 Series yang menjadi andalan kami.",
    ],
  },
  {
    slug: "bekasi",
    path: "/wedding-car-bekasi",
    city: "Bekasi",
    title: "Wedding Car Bekasi | Sewa Mobil Pengantin Premium",
    h1: "Wedding Car Bekasi",
    description:
      "Sewa mobil pengantin premium di Bekasi. Wedding car specialist untuk akad & resepsi. Cek availability via WhatsApp.",
    intro: [
      "Untuk pasangan di Bekasi, The Wedding Cars menyediakan layanan sewa mobil pengantin premium yang berfokus penuh pada kebutuhan hari pernikahan — bukan sekadar rental mobil biasa.",
      "Dari persiapan pagi hingga sesi foto bersama mobil pengantin, kami memastikan kendaraan tampil sempurna. Hubungi kami untuk mengecek ketersediaan BMW 5 Series dan armada lainnya untuk tanggal wedding Anda di Bekasi.",
    ],
  },
  {
    slug: "bandung",
    path: "/wedding-car-bandung",
    city: "Bandung",
    title: "Wedding Car Bandung | Sewa Mobil Pengantin Premium",
    h1: "Wedding Car Bandung",
    description:
      "Sewa wedding car premium untuk pernikahan di Bandung. BMW 5 Series & armada elegan lainnya. Cek availability via WhatsApp.",
    intro: [
      "Bandung dikenal dengan venue pernikahan yang indah — dari garden party di Lembang hingga ballroom hotel di pusat kota. The Wedding Cars melayani pasangan yang menikah di Bandung dengan armada wedding car premium.",
      "Perjalanan ke Bandung adalah bagian dari layanan kami. Diskusikan tanggal, lokasi, dan kebutuhan wedding Anda dengan tim kami untuk mendapatkan rekomendasi paket yang sesuai.",
    ],
  },
];

export const FAQS = [
  {
    q: "Berapa harga sewa wedding car?",
    a: "BMW 5 Series tersedia mulai dari Rp1.999.000. Harga final dapat bervariasi tergantung tanggal wedding, lokasi, durasi, dan ketersediaan. Untuk kendaraan lain seperti Mercedes-Benz, Toyota Fortuner, Mitsubishi Xpander, dan Toyota Alphard, silakan hubungi kami untuk harga & availability.",
  },
  { q: "Apakah sudah termasuk driver?", a: FALLBACK_ANSWER },
  { q: "Apakah tersedia dekorasi bunga?", a: FALLBACK_ANSWER },
  { q: "Berapa lama durasi penggunaan?", a: FALLBACK_ANSWER },
  {
    q: "Apakah melayani Jakarta?",
    a: "Ya. Selain Bogor sebagai area utama, kami melayani pernikahan di Jakarta dan seluruh Jabodetabek. Sampaikan lokasi venue Anda melalui WhatsApp untuk pengecekan availability.",
  },
  {
    q: "Apakah melayani Bandung?",
    a: "Ya, kami melayani pernikahan di Bandung dan sekitarnya. Silakan hubungi tim kami untuk detail paket sesuai tanggal dan lokasi wedding Anda.",
  },
  {
    q: "Apakah bisa untuk akad dan resepsi?",
    a: FALLBACK_ANSWER,
  },
  {
    q: "Apakah bisa untuk luar kota?",
    a: "Area layanan utama kami meliputi Bogor, Jakarta, Depok, Tangerang, Bekasi (Jabodetabek), dan Bandung. Untuk kebutuhan di luar area tersebut, silakan diskusikan dengan tim kami melalui WhatsApp.",
  },
  {
    q: "Bagaimana cara mengecek availability?",
    a: "Klik tombol Check Availability di halaman ini atau hubungi kami langsung via WhatsApp di +62 852-1045-2328. Sampaikan tanggal wedding, lokasi, dan mobil yang diminati — tim kami akan segera membantu.",
  },
  {
    q: "Bagaimana cara booking?",
    a: "Cukup hubungi kami via WhatsApp dengan menyebutkan nama, tanggal wedding, lokasi, dan mobil pilihan Anda. Tim The Wedding Cars akan mengonfirmasi ketersediaan dan memandu proses booking hingga selesai.",
  },
];

export const SITE_URL = "https://bogor-wedding-bmw.preview.emergentagent.com";
