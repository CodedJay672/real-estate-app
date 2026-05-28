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
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  role: z.enum(["user", "admin"]),
});

export const productSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  location: z.string().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
  categoryId: z.string().optional(),
  listingStatus: z.enum(["selling", "sold out", "reopened"]).default("selling").optional(),
  imageUrl: z.string().optional(),
  imageId: z.string().optional(),
  tags: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().optional(),
  leadType: z.enum(["buyer", "renter", "seller"]).default("buyer"),
  propertyName: z.string().optional(),
  message: z.string().nonempty(),
});

export const categorySchema = z.object({
  name: z.string().min(4, {
    message: "Name should be at least 4 letters",
  }),
  description: z.string().optional(),
});

export const notificationSchema = z.object({
  type: z.enum(["enquiries"]).default("enquiries"),
  title: z.string().nonempty({ message: "title is required" }),
  content: z.string().nonempty({ message: "content is required" }),
  isRead: z.boolean().default(false),
  url: z.string().optional(),
});

export type productFormSchema = z.infer<typeof productSchema>;
export type equiriesFormInputType = z.infer<typeof contactSchema>;
export type notificationInputType = z.infer<typeof notificationSchema>;
