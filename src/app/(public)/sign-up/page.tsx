"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUp() {
  const onRegister = async () => {
    await authClient.signUp.email(
      {
        email: "himbrasil@gmail.com",
        password: "",
        name: "Luciano J Guerra",
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          //show loading
        },
        onSuccess: () => {
          alert("success");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-8 py-4">
      <div className="w-full space-y-3 lg:max-w-[640px] xl:max-w-[640px] 2xl:max-w-[640px]">
        <Card>
          <CardContent className="space-y-3">
            <Button type="button" className="mt-3 w-full" onClick={onRegister}>
              CADASTRAR
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
