import { db } from "@/lib/prisma";
import { TransactionType } from "../../../../../_app_prisma/generated/prisma/client";
import {
  TotalExpensePerCategory,
  TransactionPercentagePerType,
} from "./action.types";
import { getSession } from "@/lib/get-session";

export const getDashboard = async (month: string) => {
  const { user } = await getSession();
  const userId = user.id;
  const where = {
    userId,
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const groupedTransactionsByCategoryId = await db.transaction.groupBy({
    by: ["categoryId"],
    where: {
      ...where,
      type: TransactionType.EXPENSE,
    },
    _sum: {
      amount: true,
    },
  });
  const categoryIds = groupedTransactionsByCategoryId.map((t) => t.categoryId);
  const categories = await db.transactionCategory.findMany({
    where: {
      id: { in: categoryIds },
    },
    select: {
      id: true,
      name: true,
      icon: true,
    },
  });

  const totalExpensePerCategory: TotalExpensePerCategory[] =
    groupedTransactionsByCategoryId.map((transaction) => {
      const category = categories.find((c) => c.id === transaction.categoryId);

      const totalAmount = Number(transaction._sum?.amount);

      return {
        categoryId: transaction.categoryId,
        categoryName: category?.name || "Sem categoria",
        categoryIcon: category?.icon || "",
        totalAmount,
        percentageOfTotal: Math.round(
          (totalAmount / Number(expensesTotal)) * 100,
        ),
      };
    });

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};
