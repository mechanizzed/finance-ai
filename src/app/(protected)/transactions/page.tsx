import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { CirclePlus, DollarSign } from "lucide-react";
import Link from "next/link";
import { getTransactions } from "./_actions";

export default async function Transactions() {
  const transactions = await getTransactions();

  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary flex items-center gap-1 text-2xl font-bold">
          <DollarSign />
          Transações
        </h1>

        <Button size="sm" variant="secondary" asChild>
          <Link href="/transactions/add">
            Adicionar <CirclePlus />
          </Link>
        </Button>
      </div>

      <div className="container mx-auto pb-10">
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}
