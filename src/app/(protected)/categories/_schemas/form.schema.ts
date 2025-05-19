import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Digite uma categoria"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
