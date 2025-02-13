interface IProperties {
  id: number;
  name: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  listingStatus: string;
  listingDate: string;
  images: string[];
  amenities: string[];
}
