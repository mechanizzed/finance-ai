import {
  // TransactionCategory,
  TransactionType,
} from "../../../../../_app_prisma/generated/prisma/client";

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export type TotalExpensePerCategory = {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  totalAmount: number;
  percentageOfTotal: number;
};

export type GenerateAiReportProps = {
  month: string;
};
