"use client";

import { Button } from "@/components/ui/button";
import DynamicIcon from "@/utils/icon-generate";

import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export type CategoriesColumns = {
  name: string;
  icon: string;
  id: string;
};

export const columns: ColumnDef<CategoriesColumns>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <DynamicIcon name={row.original.icon} />
        </Button>
        {row.original.name}
      </div>
    ),
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
