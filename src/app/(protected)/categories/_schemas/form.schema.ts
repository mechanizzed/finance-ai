import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Digite uma categoria"),
  icon: z.string().trim().min(1, "Digite o nome de um ícone"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
