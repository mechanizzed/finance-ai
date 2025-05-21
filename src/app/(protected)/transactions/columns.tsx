"use client";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

import { TRANSACTION_PAYMENT_METHOD_LABELS } from "./_constants";
import { BadgeTypes } from "./_components/badge";
import DynamicIcon from "@/utils/icon-generate";
import {
  Transaction,
  TransactionCategory,
} from "../../../../_app_prisma/generated/prisma";

export const columns: ColumnDef<
  Transaction & { category: TransactionCategory }
>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => <BadgeTypes type={row.original.type} />,
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Button variant="ghost" size="sm">
          <DynamicIcon name={row.original.category.icon} />
        </Button>
        {row.original.category.name}
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Método",
    cell: ({ row }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[row.original.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(row.original.amount)),
  },
  {
    accessorKey: "id",
    header: "Ações",
    cell: ({ row }) => (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          asChild
        >
          <Link href={`/transactions/${row.original.id}/edit`}>
            <PencilIcon />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </>
    ),
  },
];
