import type { Metadata } from "next";
import "./globals.css";

import { Kanit } from "next/font/google";

import { Navbar } from "@/components/Navbar";

const kanit = Kanit({
  weight: "400"
})

export const metadata: Metadata = {
  title: "YWC20 - kornavit",
  description: "This is homepage of kornavit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.className}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="mt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
