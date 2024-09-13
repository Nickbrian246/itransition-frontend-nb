import { z } from "zod";

export const CreateCollectionSchema = z.object({
  name: z
    .string({ message: "Name must be  string" })
    .min(4, { message: "Name must have at least 4 letters" }),
  description: z
    .string()
    .min(4, { message: "Description must have at least 4 characters" }),
  category: z
    .string()
    .min(4, { message: "You must select at least one category" }),
});
