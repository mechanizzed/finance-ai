"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInSchema, SignInFormValues } from "../_schemas/form.schema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function FormSign() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: () => {
          router.replace("/dashboard");
        },
        onError: () => {
          toast.error("Login ou senha inválidos");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email" className="mb-1">
          E-mail
        </Label>
        <Input id="email" {...register("email")} />
        {errors && errors.email && (
          <span className="text-destructive text-sm font-extralight">
            {errors.email.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="password" className="mb-1">
          Senha
        </Label>
        <Input type="password" id="password" {...register("password")} />
        {errors && errors.password && (
          <span className="text-destructive text-sm font-extralight">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button type="submit" className="mt-3 w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="animate-spin" />}
        ENTRAR
      </Button>
    </form>
  );
}
