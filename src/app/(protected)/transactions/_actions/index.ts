"use server";
import { db } from "@/lib/prisma";
import { UpsertTransactionProps } from "../_types/actions.types";
import { getSession } from "@/lib/get-session";

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

export const getTransaction = async (id: string) => {
  const response = await db.transaction.findFirst({
    where: { id },
    include: {
      category: true,
    },
  });
  return JSON.parse(JSON.stringify(response));
};

export const upsertTransaction = async (values: UpsertTransactionProps) => {
  const { user } = await getSession();
  const userId = user.id;
  await db.transaction.upsert({
    where: {
      id: values.id ?? new Date().toString(),
    },
    update: { ...values, userId },
    create: { ...values, userId },
  });
};
