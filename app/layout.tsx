import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import YandexMetrika from "@/components/YandexMetrika";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — счета, акты и калькуляторы для ИП онлайн`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Бесплатные инструменты для ИП: счёт и акт в PDF, калькулятор УСН и НДС. Без регистрации и без лимитов.",
  keywords: [
    "счёт на оплату ИП",
    "акт выполненных работ",
    "калькулятор УСН",
    "калькулятор НДС",
    "генератор счетов онлайн",
    "НДС для ИП",
    "УСН 6%",
    "УСН 15%",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — инструменты для ИП`,
    description:
      "Счета и акты в PDF, калькуляторы УСН и НДС. Бесплатно, без регистрации.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <JsonLd />
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
              <Link href="/nds/" className="hover:text-blue-600">
                НДС
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
