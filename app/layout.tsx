import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "СчётИП — генератор счетов и актов для ИП онлайн",
  description:
    "Создайте счёт на оплату или акт выполненных работ для ИП за 2 минуты. Бесплатно, без регистрации, скачайте PDF.",
  keywords: "счёт на оплату ИП, акт выполненных работ, генератор счетов онлайн, счёт ИП бесплатно",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
          СчётИП — бесплатный генератор документов для ИП
        </footer>
      </body>
    </html>
  );
}
