import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import RsyaLoader from "@/components/RsyaLoader";
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
  other: {
    "verify-admitad": "98472b7307",
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
        <RsyaLoader />
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-sm text-slate-500 print:hidden">
          <div className="mx-auto max-w-5xl space-y-4 px-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Другие проекты
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href="https://biznes-ip.ru/memory/"
                  className="rounded-full bg-white px-4 py-2 font-medium text-emerald-700 ring-1 ring-slate-200 hover:ring-emerald-400"
                >
                  Память10 — тренировки памяти
                </a>
                <a
                  href="https://biznes-ip.ru/sad/"
                  className="rounded-full bg-white px-4 py-2 font-medium text-lime-800 ring-1 ring-slate-200 hover:ring-lime-600"
                >
                  Грядка10 — сад и огород
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p>СчётИП — бесплатные инструменты для ИП</p>
              <nav className="flex flex-wrap justify-center gap-4">
                <Link href="/articles/" className="hover:text-blue-600">
                  Статьи
                </Link>
                <Link href="/tools/" className="hover:text-blue-600">
                  Все инструменты
                </Link>
                <Link href="/faq/" className="hover:text-blue-600">
                  FAQ
                </Link>
                <Link href="/otkryl-ip/" className="hover:text-blue-600">
                  Открыл ИП
                </Link>
                <Link href="/dlya-kogo/" className="hover:text-blue-600">
                  Для кого
                </Link>
                <Link href="/about/" className="hover:text-blue-600">
                  О проекте
                </Link>
                <Link href="/privacy/" className="hover:text-blue-600">
                  Конфиденциальность
                </Link>
                <Link href="/terms/" className="hover:text-blue-600">
                  Соглашение
                </Link>
                <Link href="/contacts/" className="hover:text-blue-600">
                  Контакты
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
