"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValues, categorySchema } from "../_schemas/form.schema";
import { postStoreCategory, putUpdateCategory } from "../_actions";
import { Button } from "@/components/ui/button";
import { CirclePlus, SquarePen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategoryFormPrpos } from "./form.types";
import { toast } from "sonner";

export const CategoryForm = ({ category }: CategoryFormPrpos) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category ? category.name : "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    if (category) {
      await putUpdateCategory(category.id, data);
      router.replace("/categories");
      toast.success("Categoria atualizada com sucesso!");
      return;
    }
    await postStoreCategory(data);
    router.replace("/categories");
    toast.success("Categoria cadastrada com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-1">
          Nome:
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Nome da categoria"
        />
        {errors && errors.name && (
          <span className="text-destructive text-sm font-extralight">
            {errors.name.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full justify-self-end md:w-auto lg:w-auto xl:w-auto 2xl:w-auto"
      >
        {category ? (
          <>
            Atualizar <SquarePen />
          </>
        ) : (
          <>
            Cadastrar <CirclePlus />
          </>
        )}
      </Button>
    </form>
  );
};
