import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ListPlus } from "lucide-react";
import Link from "next/link";
import { CategoryForm } from "../_components/category-form";

export default function CategoriesAdd() {
  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary flex items-center gap-1 text-2xl font-bold">
          <ListPlus />
          Adicionar categoria
        </h1>

        <Button size="sm" variant="secondary" asChild>
          <Link href="/categories">
            <ChevronLeft />
            Voltar
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent>
          <CategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
