"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CategoriesColumns = {
  id: string;
  name: string;
};

export const columns: ColumnDef<CategoriesColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
];
