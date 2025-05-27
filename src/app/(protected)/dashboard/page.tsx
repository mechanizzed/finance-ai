import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FileText, Wallet } from "lucide-react";
import Link from "next/link";
import { TransactionList } from "../_components/TransactionsList";
import { ChartPieTransactions } from "./_components/chart-pie-transactions";
import { getDashboard } from "./_actions";

export default async function Dashboard() {
  const dashboardValues = await getDashboard("05");
  console.log(dashboardValues);
  return (
    <>
      <div className="mb-6 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary text-2xl font-bold">Dashboard</h1>

        <div className="flex gap-x-2 gap-y-1">
          <div className="flex items-center gap-1">
            <Button variant="secondary" className="border">
              Gerar relatório IA <FileText size={15} />
            </Button>
          </div>

          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Janeiro</SelectItem>
              <SelectItem value="dark">Fevereiro</SelectItem>
              <SelectItem value="system">Março</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <Card className="bg-muted">
            <CardContent>
              <div className="flex w-full items-end justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Wallet size={16} />
                    </Button>
                    <p className="text-muted-foreground text-sm font-light">
                      Saldo
                    </p>
                  </div>
                  <h2 className="text-4xl font-bold">R$ 2.700,89</h2>
                </div>

                <Button size="sm" asChild>
                  <Link href="/transactions/add">Adicionar transação</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-2">
          <Card className="bg-muted">
            <CardContent>
              <ChartPieTransactions {...dashboardValues} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex items-center justify-between border-b">
              <h4 className="text-lg font-bold">Transações</h4>
              <Button variant="outline" asChild>
                <Link href="/transactions">Ver mais</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <TransactionList />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
