import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, "Digite uma senha"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
