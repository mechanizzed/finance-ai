import {
  // TransactionCategory,
  TransactionType,
} from "../../../../../_app_prisma/generated/prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  //  category: TransactionCategory;
  category: string;
  totalAmount: number;
  percentageOfTotal: number;
}
