import { TransactionCategory } from "../../../../../_app_prisma/generated/prisma";
import { TransactionFormValues } from "../_schemas/form.schema";

export type TransactionFormProps = {
  categories: TransactionCategory[];
  transactionId?: string;
  transactionDefaultValues?: TransactionFormValues;
};
