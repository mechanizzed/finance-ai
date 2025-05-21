import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { AvatarSignOut } from "./_components/avatar-sign-out";
import { redirect } from "next/navigation";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <header className="bg-primary mb-5 w-full">
      <div className="m-auto flex min-h-14 max-w-11/12 items-center justify-between">
        <SidebarTrigger />
        <Image
          src="/logo-finance-white.png"
          width={110}
          height={21}
          alt="FinanceAI"
          className="visible md:hidden lg:hidden xl:hidden 2xl:hidden"
        />

        <AvatarSignOut user={session.user} />
      </div>
    </header>
  );
}
