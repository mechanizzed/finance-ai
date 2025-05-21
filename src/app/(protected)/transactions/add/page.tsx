import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, DollarSign } from "lucide-react";
import Link from "next/link";
import { TransactionForm } from "../_components/transaction-form";
import { getCategories } from "../../categories/_actions";

export default async function TransactionsAdd() {
  const categories = await getCategories();

  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary flex items-center gap-1 text-2xl font-bold">
          <DollarSign />
          Adicionar transação
        </h1>

        <Button size="sm" variant="secondary" asChild>
          <Link href="/transactions">
            <ChevronLeft />
            Voltar
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent>
          <TransactionForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
