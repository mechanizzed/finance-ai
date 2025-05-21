"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/prisma";
import { UpsertTransactionProps } from "../_types/actions.types";

export const getTransactions = async () => {
  const transactions = await db.transaction.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: true,
    },
  });
  return JSON.parse(JSON.stringify(transactions));
};

export const upsertTransaction = async (values: UpsertTransactionProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Sem acesso!");
  }
  const userId = session.user.id;
  await db.transaction.upsert({
    where: {
      id: values.id ?? new Date().toString(),
    },
    update: { ...values, userId },
    create: { ...values, userId },
  });
};

// export const getCategory = async (id: string) => {
//   const response = await db.transactionCategory.findFirst({
//     where: { id },
//   });
//   return response;
// };

// export const postStoreCategory = async (
//   values: Prisma.TransactionCategoryCreateInput,
// ) => {
//   await db.transactionCategory.create({
//     data: {
//       ...values,
//     },
//   });
// };

// export const putUpdateCategory = async (
//   id: string,
//   values: Prisma.TransactionCategoryUpdateInput,
// ) => {
//   await db.transactionCategory.update({
//     where: { id },
//     data: { name: values.name, icon: values.icon },
//   });
// };
