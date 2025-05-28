export const FIELD_NAMES = {
  email: "Email",
  password: "Password",
  fullName: "Full Name",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
};

export const properties = [
  {
    id: 1,
    name: "Luxury Family Home",
    description:
      "Beautiful and spacious property in a family-friendly neighborhood, featuring modern amenities and a large backyard perfect for gatherings.",
    price: 750000, // price in USD
    address: "123 Maple Street",
    city: "Springfield",
    state: "IL",
    zipCode: 62704,
    country: "USA",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2500,
    lotSize: 0.5, // in acres
    yearBuilt: 1990,
    listingStatus: "For Sale",
    listingDate: "2023-01-15",
    images: [
      "https://placehold.co/600x400.jpg",
      "https://placehold.co/600x400.jpg",
    ],
    amenities: [
      "Garage",
      "Swimming Pool",
      "Fireplace",
      "Central Air Conditioning",
    ],
  },
  {
    id: 2,
    name: "Modern Downtown Condo",
    description:
      "Sleek and stylish condo in the heart of downtown with panoramic city views and access to premium amenities.",
    price: 450000,
    address: "456 Elm Avenue",
    city: "Metropolis",
    state: "NY",
    zipCode: 10001,
    country: "USA",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    lotSize: 0, // typically not applicable for condos
    yearBuilt: 2015,
    listingStatus: "For Sale",
    listingDate: "2023-03-20",
    images: [
      "https://placehold.co/600x400.jpg",
      "https://placehold.co/600x400.jpg",
    ],
    amenities: ["Gym", "Rooftop Terrace", "24/7 Security"],
  },
  {
    id: 3,
    name: "Cozy Suburban Townhouse",
    description:
      "A charming townhouse located in a quiet suburb. Perfect for small families with easy access to schools and local amenities.",
    price: 320000,
    address: "789 Oak Lane",
    city: "Greenfield",
    state: "CA",
    zipCode: 90210,
    country: "USA",
    propertyType: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    lotSize: 0.2, // in acres
    yearBuilt: 2005,
    listingStatus: "For Sale",
    listingDate: "2023-02-10",
    images: [
      "https://placehold.co/600x400.jpg",
      "https://placehold.co/600x400.jpg",
    ],
    amenities: ["Garage", "Community Pool", "Playground"],
  },
  {
    id: 4,
    name: "Rustic Mountain Cabin",
    description:
      "Escape to nature in this rustic cabin featuring breathtaking mountain views and a peaceful retreat atmosphere.",
    price: 550000,
    address: "321 Pine Road",
    city: "Aspen",
    state: "CO",
    zipCode: 81611,
    country: "USA",
    propertyType: "Cabin",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    lotSize: 2, // in acres
    yearBuilt: 1985,
    listingStatus: "For Sale",
    listingDate: "2023-04-05",
    images: [
      "https://placehold.co/600x400.jpg",
      "https://placehold.co/600x400.jpg",
    ],
    amenities: ["Fireplace", "Wood Burning Stove", "Outdoor Deck"],
  },
  {
    id: 5,
    name: "Beachfront Villa",
    description:
      "Luxury villa with private beach access, offering a blend of comfort and elegance with stunning ocean views.",
    price: 1250000,
    address: "987 Ocean Drive",
    city: "Malibu",
    state: "CA",
    zipCode: 90265,
    country: "USA",
    propertyType: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4000,
    lotSize: 1, // in acres
    yearBuilt: 2010,
    listingStatus: "For Sale",
    listingDate: "2023-05-12",
    images: [
      "https://placehold.co/600x400.jpg",
      "https://placehold.co/600x400.jpg",
    ],
    amenities: [
      "Pool",
      "Outdoor Kitchen",
      "Home Theater",
      "Private Beach Access",
    ],
  },
  {
    id: 6,
    name: "Urban Loft Rental",
    description:
      "Spacious loft in downtown with a modern industrial design, perfect for professionals seeking a vibrant city lifestyle.",
    price: 3000, // monthly rent in USD
    address: "135 Liberty Street",
    city: "New York",
    state: "NY",
    zipCode: 10006,
    country: "USA",
    propertyType: "Loft",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 800,
    lotSize: 0,
    yearBuilt: 2018,
    listingStatus: "For Rent",
    listingDate: "2023-06-01",
    images: [
      "https://placehold.co/600x400.jpg",
      "https://placehold.co/600x400.jpg",
    ],
    amenities: ["Gym", "Laundry Facilities", "Rooftop Lounge"],
  },
];

export const FAQItems = [
  {
    question:
      "What are the most important documents to check before buying land in Nigeria?",
    answer:
      "Before purchasing land, ensure you verify documents like the Certificate of Occupancy (C of O), Deed of Assignment, Survey Plan, and Governor’s Consent. These documents confirm ownership and legal status, helping to avoid land disputes or buying government-acquired land.",
  },
  {
    question: "Is it better to buy land or a built property in Nigeria?",
    answer:
      "It depends on your goals. Buying land offers flexibility and lower upfront costs, especially for long-term investment. Built properties, however, are ready for immediate use or rental income, but they may cost more and offer less design freedom.",
  },
  {
    question: "Can a non-Nigerian own property in Nigeria?",
    answer:
      "Yes, non-Nigerians can own property in Nigeria, but typically through a leasehold arrangement of up to 99 years. However, foreigners must get approval from the state government and must not acquire land in areas designated as restricted.",
  },
  {
    question:
      "What are the risks of buying real estate in Nigeria, and how can I avoid them?",
    answer:
      "Common risks include land scams, fraudulent sellers, family disputes, and unclear land titles. To avoid these, always engage a real estate lawyer, conduct due diligence, and work with registered agents or reputable companies.",
  },
];

export const quickLinks = [
  {
    lable: "About Us",
    link: "#about-us",
  },
  {
    lable: "Why Choose Us",
    link: "#why-choose-us",
  },
  {
    lable: "Experience Realty Excellence",
    link: "#realty-excellence",
  },
  {
    lable: "Clients Trust Us",
    link: "#trust-us",
  },
  {
    lable: "Our Partners",
    link: "#our-partners",
  },
  {
    lable: "FAQ",
    link: "#faq",
  },
];
