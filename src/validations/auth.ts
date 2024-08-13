import { z } from "zod";

export const RegisterUserSchema = z.object({
  firstName: z
    .string({ message: "FirstNameError" })
    .min(4, { message: "FirstNameError" }),
  lastName: z.string().min(4, { message: "FirstNameError" }),
  email: z.string().email({ message: "EmailError" }),
  password: z.string({ message: "PasswordRequired" }),
});

export const LogInUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterUser = z.infer<typeof RegisterUserSchema>;
export type LoginUser = z.infer<typeof LogInUserSchema>;
