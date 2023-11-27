export const TravelCategory = [
  "Any",
  "Tours",
  "Flights",
  "Hotels",
  "Cruises",
  "Group_Travel",
  "Adventure_Travel",
  "Honeymoon_Packages",
];

export const TravelDestinations = [
  "Paris, France",
  "Kyoto, Japan",
  "Rome, Italy",
  "Cape Town, South Africa",
  "Santorini, Greece",
  "New York City, USA",
  "Machu Picchu, Peru",
];

export const ServiceStatus = ["available", "upcoming", "cancel"];

export const serviceFieldrules = {
  title: [
    {
      required: true,
      message: "Please enter title",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter price",
    },
  ],
  location: [
    {
      required: true,
      message: "Please enter location",
    },
  ],

  category: [
    {
      required: true,
      message: "Please enter category",
    },
  ],
};
