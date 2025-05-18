import { Button } from "@/components/ui/button";
import { BanknoteArrowUp } from "lucide-react";

export function TransactionList() {
  return (
    <div className="mb-6 flex w-full items-end justify-between">
      <div>
        <div className="flex items-center justify-start gap-3">
          <Button size="icon" variant="secondary">
            <BanknoteArrowUp size={20} className="text-green-500" />
          </Button>
          <div>
            <p className="text-xs font-bold">Salário</p>
            <p className="text-muted-foreground text-xs font-light">
              15 Nov, 2024
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-green-500">+R$ 3.900</p>
      </div>
    </div>
  );
}
