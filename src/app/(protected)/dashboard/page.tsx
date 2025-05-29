import { redirect } from "next/navigation";

import {
  PiggyBank,
  TrendingDownIcon,
  TrendingUpIcon,
  Wallet,
} from "lucide-react";

import { ChartPieTransactions } from "./_components/chart-pie-transactions";
import { getDashboard } from "./_actions";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { SummaryCards } from "./_components/summary-cards";
import { LastTransactions } from "./_components/last-transactions";
import { DateSelect } from "./_components/date-select";
import { isMatch } from "date-fns";
import { getCurrentMonth } from "@/utils/get-current-month";
import { MONTH_OPTIONS } from "../_constants";
import { ButtonReportAi } from "./_components/button-report-ai";

interface DashboardProps {
  searchParams: Promise<{ month: string }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const { month } = await searchParams;
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${getCurrentMonth()}`);
  }

  const dashboardValues = await getDashboard(month);
  const isTransactionsToShow: boolean = dashboardValues.lastTransactions.length;
  const getMonthName = MONTH_OPTIONS.find((m) => m.value === month)?.label;

  return (
    <>
      <div className="mb-6 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary text-2xl font-bold">Dashboard</h1>

        <div className="flex gap-x-2 gap-y-1">
          <div className="flex items-center gap-1">
            <ButtonReportAi month={month} />
          </div>

          <DateSelect />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 2xl:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <SummaryCards
            icon={<Wallet size={16} className="text-primary" />}
            sizeTextAmount="large"
            title="Saldo"
            amount={dashboardValues.balance}
            isButtonAddTransaction
          />

          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            <SummaryCards
              icon={<TrendingUpIcon size={16} className="text-green-500" />}
              title="Receita"
              amount={dashboardValues.depositsTotal}
            />
            <SummaryCards
              icon={<TrendingDownIcon size={16} className="text-red-500" />}
              title="Despesas"
              amount={dashboardValues.expensesTotal}
            />
            <SummaryCards
              icon={<PiggyBank size={16} className="text-muted-foreground" />}
              title="Investido"
              amount={dashboardValues.investmentsTotal}
            />
          </div>

          {isTransactionsToShow ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2">
              <ChartPieTransactions {...dashboardValues} />

              <ExpensesPerCategory
                expensesPerCategory={dashboardValues.totalExpensePerCategory}
              />
            </div>
          ) : (
            <p className="text-center text-sm font-bold">
              Nenhuma transação encontrada para o mês de{" "}
              <span className="text-primary">{getMonthName}</span>
            </p>
          )}
        </div>
        {isTransactionsToShow ? (
          <div className="col-span-1">
            <LastTransactions
              lastTransactions={dashboardValues.lastTransactions}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
