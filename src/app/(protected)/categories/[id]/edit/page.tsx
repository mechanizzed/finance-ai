import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ListCheck } from "lucide-react";
import { CategoryForm } from "../../_components/category-form";
import Link from "next/link";
import { getCategory } from "../../_actions";

export default async function EditCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategory(id);

  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary flex items-center gap-1 text-2xl font-bold">
          <ListCheck />
          Editar categoria
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
          <CategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
