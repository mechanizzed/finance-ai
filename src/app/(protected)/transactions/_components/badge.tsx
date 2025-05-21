import { Badge } from "@/components/ui/badge";
import { TransactionType } from "../../../../../_app_prisma/generated/prisma";
import { BadgeTypesProps } from "../_types/badge.types";
import { CircleIcon } from "lucide-react";

export const BadgeTypes = ({ type }: BadgeTypesProps) => {
  if (type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted text-primary hover:bg-muted font-bold">
        <CircleIcon className="fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }

  if (type === TransactionType.EXPENSE) {
    return (
      <Badge className="font bold text-destructive bg-red-950/30">
        <CircleIcon className="fill-destructive" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="font bold bg-white/10 text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
};
