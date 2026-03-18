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
  name: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  location: z.string(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
  categoryId: z.string(),
  listingStatus: z.enum(["selling", "sold out", "reopened"]).default("selling"),
  imageUrl: z.string(),
  imageId: z.string(),
  tags: z.string().nonempty({
    message:
      "SEO tags cannot be empty. please provide a comma seperated list of tags",
  }),
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
