"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export type CategoriesColumns = {
  name: string;
  id: string;
};

export const columns: ColumnDef<CategoriesColumns>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "id",
    header: "Ações",
    meta: {
      align: "right",
    },

    cell: ({ row }) => (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          asChild
        >
          <Link href={`/categories/${row.original.id}/edit`}>
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
