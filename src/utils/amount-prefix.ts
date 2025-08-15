import { TransactionType } from "../../_app_prisma/generated/prisma";

export const getAmountPrefix = (type: TransactionType): string => {
  if (type === TransactionType.DEPOSIT) {
    return "+";
  }
  return "-";
};
