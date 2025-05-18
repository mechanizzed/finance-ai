import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { ChevronLeft, CirclePlus, ListPlus } from "lucide-react";
import Link from "next/link";

export default function CategoriesAdd() {
  return (
    <div className="w-full">
      <div className="mb-3 flex w-full items-end justify-between border-b pb-3">
        <h1 className="text-primary flex items-center gap-1 text-2xl font-bold">
          <ListPlus />
          Adicionar categoria
        </h1>
        <Link href="/categories">
          <Button size="sm" variant="secondary">
            <ChevronLeft />
            Voltar
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent>
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-muted-foreground text-sm font-light"
            >
              Nome:
            </label>
            <Input
              name="name"
              autoFocus
              placeholder="Digite o nome da categoria"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Cancelar</Button>
          <Button>
            Cadastrar <CirclePlus />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
