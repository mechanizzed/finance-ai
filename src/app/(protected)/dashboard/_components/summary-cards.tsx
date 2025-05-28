import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { SummaryCardsProps } from "./summary-cards.types";
import Link from "next/link";

export const SummaryCards = ({
  icon,
  title,
  amount,
  sizeTextAmount = "small",
  isButtonAddTransaction,
}: SummaryCardsProps) => {
  return (
    <Card className="bg-muted">
      <CardContent>
        <div className="flex w-full items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {icon}

              <p className="text-muted-foreground text-sm font-light">
                {title}
              </p>
            </div>
            <h2
              data-size={sizeTextAmount}
              className="text-xl data-[size='large']:text-2xl"
            >
              {formatCurrency(Number(amount))}
            </h2>
          </div>

          {isButtonAddTransaction && (
            <Button size="sm" asChild>
              <Link href="/transactions/add">Adicionar transação</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
