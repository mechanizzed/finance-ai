import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

const getRaleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finace AI",
  description: "Finance AI Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${getRaleway.variable} antialiased`}>
        <Suspense fallback={<Loading />}>
          <main>
            {children}
            <Toaster />
          </main>
        </Suspense>
      </body>
    </html>
  );
}
