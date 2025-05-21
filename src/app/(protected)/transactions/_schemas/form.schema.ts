import { z } from "zod";
import {
  TransactionType,
  TransactionPaymentMethod,
} from "../../../../../_app_prisma/generated/prisma";

export const transactionSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Digite um nome para a transação.",
  }),
  amount: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatório.",
  }),
  categoryId: z.string().trim().min(1, { message: "Selecione uma categoria" }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatório.",
  }),
  date: z.date({
    required_error: "A data é obrigatória.",
  }),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
