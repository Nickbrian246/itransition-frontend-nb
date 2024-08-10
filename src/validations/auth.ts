import { z } from "zod";

export const RegisterUserSchema = z.object({
  firstName: z.string({ message: " field must not be empty" }),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string({ message: "password required" }),
});

export const LogInUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterUser = z.infer<typeof RegisterUserSchema>;
export type LoginUser = z.infer<typeof LogInUserSchema>;
