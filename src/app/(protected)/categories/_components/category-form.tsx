"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValues, categorySchema } from "../_schemas/form.schema";
import { postStoreCategory, putUpdateCategory } from "../_actions";

import { Button } from "@/components/ui/button";
import { CirclePlus, SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CategoryFormPrpos } from "../_types/form.types";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICONS_CATEGORY_TYPES } from "../_constants";

export const CategoryForm = ({ category }: CategoryFormPrpos) => {
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category ? category.name : "",
      icon: category ? category.icon : ICONS_CATEGORY_TYPES[0].value,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome:</FormLabel>
              <FormControl>
                <Input placeholder="Digite um nome para categoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria do ícone:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ICONS_CATEGORY_TYPES.map((iconType) => (
                    <SelectItem key={iconType.value} value={iconType.value}>
                      {iconType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
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
    </Form>
  );
};
