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
  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  size: z.coerce.number(),
  categoryId: z.string(),
  type: z.string(),
  listingStatus: z.enum(["selling", "sold out", "reopened"]),
  imageUrl: z.string(),
  amenities: z.string(),
});

export const contactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
});

export const categorySchema = z.object({
  name: z.string().min(4, {
    message: "Name should be at least 4 letters",
  }),
  description: z.string(),
});
