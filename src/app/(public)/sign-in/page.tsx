import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import { FormSign } from "./_components/form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-8 py-4">
      <div className="w-full space-y-3 lg:max-w-[640px] xl:max-w-[640px] 2xl:max-w-[640px]">
        <Card>
          <CardHeader>
            <Image
              src="/logo-finance.png"
              width={250}
              height={62}
              alt="FinanceAI"
              className="mx-auto mb-2"
            />
            <CardTitle className="text-center">
              Digite seu e-mail e senha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormSign />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
