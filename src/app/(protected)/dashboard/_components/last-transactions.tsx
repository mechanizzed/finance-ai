import Image from "next/image";
import Link from "next/link";
import { LastTransactionsProps } from "./last-transactions.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { formatCurrency } from "@/utils/format-currency";
import { getAmountColor } from "@/utils/amount-color";
import { getAmountPrefix } from "@/utils/amount-prefix";
import { formatDate } from "@/utils/formate-date";
import { Separator } from "@/components/ui/separator";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "../../_constants";

export const LastTransactions = ({
  lastTransactions,
}: LastTransactionsProps) => {
  return (
    <ScrollArea className="rounded-lg border py-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <Separator className="my-3" />
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="text-primary rounded-lg bg-white/5 p-3">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={15}
                  width={15}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-xs text-wrap">{transaction.name}</p>
                <p className="text-muted-foreground text-[11px] font-extralight">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};
