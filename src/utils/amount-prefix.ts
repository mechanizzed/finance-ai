import {
  Transaction,
  TransactionType,
} from "../../_app_prisma/generated/prisma";

export const getAmountPrefix = (transaction: Transaction): string => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return "+";
  }
  return "-";
};
