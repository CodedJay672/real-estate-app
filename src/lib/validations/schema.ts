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
