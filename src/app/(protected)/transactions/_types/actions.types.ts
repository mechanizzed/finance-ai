import {
  TransactionType,
  TransactionPaymentMethod,
} from "../../../../../_app_prisma/generated/prisma";

export type UpsertTransactionProps = {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
};
