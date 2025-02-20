import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email(),
  password: z.string().min(6),
});

export const productSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  location: z.string(),
  propertyType: z.enum(["house", "land"]),
  bedrooms: z.coerce.number().min(0).optional(),
  bathrooms: z.coerce.number().min(0).optional(),
  size: z.coerce.number().optional(),
  listingStatus: z.enum(["selling", "sold out", "reopened"]),
  imageUrl: z.string(),
  amenities: z.string(),
});

export const contactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
});

export type productType = z.infer<typeof productSchema>; // infer the type of the schema
