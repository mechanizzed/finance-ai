import { Suspense } from "react";
import Loading from "../loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import { Header } from "./_components/Header";

export default function DashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Header />
          <div className="mx-auto max-w-11/12">{children}</div>
        </main>
      </SidebarProvider>
    </Suspense>
  );
}
