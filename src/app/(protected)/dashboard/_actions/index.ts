"use server";

import { connection } from "next/server";
import OpenAI from "openai";
import { db } from "@/lib/prisma";
import { TransactionType } from "../../../../../_app_prisma/generated/prisma/client";
import {
  TotalExpensePerCategory,
  TransactionPercentagePerType,
  GenerateAiReportProps,
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

export const generateAiReport = async ({
  month,
}: GenerateAiReportProps): Promise<string | null> => {
  await connection();
  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // return DUMMY_REPORT;
    console.error("erro ao buscar .env");
    return "erro";
  }
  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  // pegar as transações do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
    },
    include: {
      category: true,
    },
  });
  // mandar as transações para o ChatGPT e pedir para ele gerar um relatório com insights
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category.name}`,
    )
    .join(";")}`;
  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  // pegar o relatório gerado pelo ChatGPT e retornar para o usuário
  return completion.choices[0].message.content;
};
