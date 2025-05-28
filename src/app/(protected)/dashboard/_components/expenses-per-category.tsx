import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpensesPerCategoryProps } from "./expenses-per-category.types";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DynamicIcon from "@/utils/icon-generate";
import { Separator } from "@/components/ui/separator";

export const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="h-full w-full rounded-xl border py-6">
      <CardHeader>
        <CardTitle className="mb-2 font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <Separator className="my-3" />

      <CardContent className="space-y-4">
        {expensesPerCategory.map((category) => (
          <div
            className="flex w-full items-center justify-start gap-2"
            key={category.categoryId}
          >
            <DynamicIcon name={category.categoryIcon} size={18} />
            <div className="w-full space-y-0.5">
              <div className="flex w-full justify-between">
                <p className="text-sm font-light">{category.categoryName}</p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} />
            </div>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};
