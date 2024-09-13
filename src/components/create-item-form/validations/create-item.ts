import { z } from "zod";

export const CreateItemSchema = z.object({
  name: z
    .string({ message: "Name must be  string" })
    .min(4, { message: "Name must have at least 4 letters" }),
  tagsIds: z.string().array().nonempty({
    message: "You must select at least one tag ",
  }),
});
