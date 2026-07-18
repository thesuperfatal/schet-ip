import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import YandexMetrika from "@/components/YandexMetrika";
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
        <YandexMetrika />
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-sm text-slate-500">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
            <p>СчётИП — бесплатные инструменты для ИП</p>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link href="/usn/" className="hover:text-blue-600">
                УСН
              </Link>
              <Link href="/privacy/" className="hover:text-blue-600">
                Конфиденциальность
              </Link>
              <Link href="/contacts/" className="hover:text-blue-600">
                Контакты
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
