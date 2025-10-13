export const footerLinks = [
  [
    {
      id: 1,
      name: "Help Center",
      href: "/",
    },
    {
      id: 2,
      name: "Authors",
      href: "/",
    },
    {
      id: 3,
      name: "About",
      href: "/",
    },
    {
      id: 4,
      name: "Privacy",
      href: "/",
    },
  ],
  [
    {
      id: 1,
      name: "Community",
      href: "/",
    },
    {
      id: 2,
      name: "Blogs",
      href: "/",
    },
    {
      id: 3,
      name: "Forums",
      href: "/",
    },
    {
      id: 4,
      name: "Meetups",
      href: "/",
    },
  ],
];

export const galleryItems = [
  {
    id: 1,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378086/gallery/1_gdmhoe.webp",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378083/gallery/2_uloyfk.webp",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378084/gallery/3_ps7rhf.webp",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378084/gallery/4_lrtkkx.webp",
  },

  {
    id: 5,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378084/gallery/5_yztybf.webp",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378085/gallery/6_hc7lpz.webp",
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378084/gallery/7_sklcgp.webp",
  },
  {
    id: 8,
    url: "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378085/gallery/8_hmdjeb.webp",
  },
];

export const sponsorItems = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378807/sponsor/1_xv3hg1.jpg",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378807/sponsor/2_xas6ay.png",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378808/sponsor/3_dsi59j.jpg",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378809/sponsor/4_oam1gj.jpg",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378810/sponsor/5_yhowsp.jpg",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378806/sponsor/6_w9icrf.jpg",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/djdrjwmfc/image/upload/v1702378806/sponsor/7_w3eq8q.png",
  },
];

export const reviewItems = [
  {
    id: "b7a2b5e4-9b23-4f8f-b1c5-7d9934e7aa12",
    serviceId: "svc_001",
    userId: "usr_001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    reviewTitle: "Amazing experience!",
    ratings: [5, 4, 5, 5],
    comment:
      "Everything went smoothly from start to finish. Highly recommend this service!",
    createdAt: "2024-10-10T10:32:00.000Z",
    updatedAt: "2024-10-10T10:32:00.000Z",
  },
  {
    id: "e4db96e2-54b5-48c2-9b33-915b7b5fdbe4",
    serviceId: "svc_002",
    userId: "usr_002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    reviewTitle: "Good but room for improvement",
    ratings: [4, 3, 4],
    comment:
      "The service was decent overall, though response times could be better.",
    createdAt: "2024-10-11T15:21:00.000Z",
    updatedAt: "2024-10-11T15:21:00.000Z",
  },
  {
    id: "1af5f1d7-48b8-43c3-bbb0-f7b8932d90ea",
    serviceId: "svc_001",
    userId: "usr_003",
    name: "Sofia García",
    email: "sofia.garcia@example.com",
    reviewTitle: "Would definitely book again",
    ratings: [5, 5, 5, 4],
    comment:
      "Super easy booking process and great customer support. Worth every penny!",
    createdAt: "2024-10-12T08:45:00.000Z",
    updatedAt: "2024-10-12T08:45:00.000Z",
  },
  {
    id: "d3f3e8b6-94cf-4c2f-b1c1-cb52a4e03bcd",
    serviceId: "svc_003",
    userId: "usr_004",
    name: "Liam Patel",
    email: "liam.patel@example.com",
    reviewTitle: "Disappointed",
    ratings: [2, 3, 2],
    comment:
      "The service did not match expectations. Communication was lacking.",
    createdAt: "2024-09-22T11:13:00.000Z",
    updatedAt: "2024-09-22T11:13:00.000Z",
  },
];

export const serviceItems = [
  {
    id: "1a9c3f17-4d14-4ab8-8c24-1b9c5efb8a01",
    name: "Luxury Beach Resort Stay",
    description:
      "Enjoy a 5-star beachfront resort experience with private villas, infinity pools, and fine dining.",
    price: 450.0,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    location: "Maldives",
    category: "TRAVEL",
    status: "available",
  },
  {
    id: "2f4b0b2e-8d2a-4f75-8b5f-d7c8304e1229",
    name: "City Tour with Guide",
    description:
      "Explore historic landmarks and hidden gems with a professional local guide.",
    price: 80.0,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    location: "Rome, Italy",
    category: "TOUR",
    status: "available",
  },
  {
    id: "3e98b4f1-2a15-49a0-9e8b-76f4c5928acb",
    name: "Mountain Trekking Adventure",
    description:
      "Join a guided trek through scenic mountain trails with camping and meals included.",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    location: "Kathmandu, Nepal",
    category: "ADVENTURE",
    status: "available",
  },
  {
    id: "4d23e6a2-01b3-4b56-9124-7c33bdb0cf72",
    name: "Luxury Spa Experience",
    description:
      "Relax and rejuvenate with a 3-hour luxury spa package including aromatherapy and massage.",
    price: 200.0,
    image: "https://images.unsplash.com/photo-1587019153369-147831c5c81b",
    location: "Bali, Indonesia",
    category: "WELLNESS",
    status: "available",
  },
  {
    id: "5a14e5c8-65f8-4e79-8f8d-128e7de26cf0",
    name: "Professional Photography Session",
    description:
      "Book a 2-hour outdoor or studio shoot with professional editing included.",
    price: 150.0,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    location: "Los Angeles, USA",
    category: "CREATIVE",
    status: "available",
  },
  {
    id: "6b3d8e3a-7f9f-44d4-9f76-9f5b67d6a03c",
    name: "Culinary Workshop",
    description:
      "Learn to cook authentic local dishes with a professional chef in a hands-on workshop.",
    price: 95.0,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    location: "Bangkok, Thailand",
    category: "FOOD",
    status: "available",
  },
  {
    id: "7f62b815-b87a-4b12-a987-24d8d98cb8b0",
    name: "Private Yacht Charter",
    description:
      "Rent a luxury yacht for a private cruise with captain, crew, and gourmet catering.",
    price: 1200.0,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    location: "Monaco",
    category: "LUXURY",
    status: "available",
  },
  {
    id: "8c29e7e4-4f25-4e1c-a3b8-fbaabf509b1f",
    name: "Eco Safari Tour",
    description:
      "Discover wildlife and natural landscapes with sustainable travel options and local guides.",
    price: 350.0,
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    location: "Nairobi, Kenya",
    category: "ADVENTURE",
    status: "available",
  },
  {
    id: "9e41c3e9-79d0-4bcb-a3b4-18b61b72e2b2",
    name: "Snowboarding Weekend Camp",
    description:
      "A 3-day snowboarding trip with training, accommodation, and equipment included.",
    price: 280.0,
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f",
    location: "Whistler, Canada",
    category: "SPORTS",
    status: "available",
  },
  {
    id: "10df6b84-7c1e-482a-9d4e-2a7b6b76bcb1",
    name: "Art & Culture Tour",
    description:
      "Guided tour exploring museums, galleries, and cultural landmarks.",
    price: 110.0,
    image: "https://images.unsplash.com/photo-1505666286783-6a5a10f1e5c1",
    location: "Paris, France",
    category: "CULTURE",
    status: "available",
  },
];
