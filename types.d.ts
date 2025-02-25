import { addHouseSchema, addLandSchema } from "@/lib/validations/schema";
import { z } from "zod";

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

type AddLandProps = z.infer<typeof addLandSchema>;
type AddHouseProps = z.infer<typeof addHouseSchema>;
