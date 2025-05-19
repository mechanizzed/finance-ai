import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { AlignJustify, ListPlus } from "lucide-react";
import Link from "next/link";
import { getCategories } from "./_actions";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary flex items-center gap-1 text-2xl font-bold">
          <AlignJustify />
          Categorias
        </h1>
        <Link href="/categories/add">
          <Button size="sm" variant="secondary">
            Adicionar
            <ListPlus />
          </Button>
        </Link>
      </div>

      <div className="container mx-auto pb-10">
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
}
