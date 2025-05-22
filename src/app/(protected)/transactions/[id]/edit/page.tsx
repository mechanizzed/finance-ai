import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ListCheck } from "lucide-react";
import { TransactionForm } from "../../_components/transaction-form";
import Link from "next/link";
import { getCategories } from "@/app/(protected)/categories/_actions";
import { getTransaction } from "../../_actions";

export default async function EditTransaction({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transaction = await getTransaction(id);
  const transactionDefaultValues = {
    ...transaction,
    amount: Number(transaction.amount),
    date: new Date(transaction.date),
  };
  const categories = await getCategories();

  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary flex items-center gap-1 text-2xl font-bold">
          <ListCheck />
          Editar transação
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
          <TransactionForm
            categories={categories}
            transactionDefaultValues={transactionDefaultValues}
            transactionId={transaction.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
