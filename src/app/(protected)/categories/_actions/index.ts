"use server";

import { Prisma } from "../../../../../_app_prisma/generated/prisma/client";
import { db } from "@/lib/prisma";

export const getCategories = async () => {
  const categories = await db.transactionCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return categories;
};

export const getCategory = async (id: string) => {
  const response = await db.transactionCategory.findFirst({
    where: { id },
  });
  return response;
};

export const postStoreCategory = async (
  values: Prisma.TransactionCategoryCreateInput,
) => {
  await db.transactionCategory.create({
    data: {
      ...values,
    },
  });
};

export const putUpdateCategory = async (
  id: string,
  values: Prisma.TransactionCategoryUpdateInput,
) => {
  await db.transactionCategory.update({
    where: { id },
    data: { name: values.name },
  });
};
