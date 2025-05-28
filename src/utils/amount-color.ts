import {
  Transaction,
  TransactionType,
} from "../../_app_prisma/generated/prisma/client";

export const getAmountColor = (transaction: Transaction): string => {
  if (transaction.type === TransactionType.EXPENSE) {
    return "text-red-500";
  }
  if (transaction.type === TransactionType.DEPOSIT) {
    return "text-green-500";
  }
  return "text-white";
};
