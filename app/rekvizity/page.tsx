import type { Metadata } from "next";
import Link from "next/link";
import RekvizityClient from "@/components/RekvizityClient";

export const metadata: Metadata = {
  title: "Реквизиты для оплаты ИП — карточка PDF бесплатно",
  description:
    "Сформируйте карточку банковских реквизитов ИП для клиента: PDF, печать или копирование. БИК подставляет банк автоматически.",
  keywords:
    "реквизиты для оплаты ИП, карточка реквизитов, банковские реквизиты PDF, куда платить ИП",
  alternates: { canonical: "https://biznes-ip.ru/rekvizity/" },
  openGraph: {
    title: "Реквизиты для оплаты — PDF | СчётИП",
    description: "Карточка реквизитов ИП для клиента бесплатно.",
    url: "https://biznes-ip.ru/rekvizity/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RekvizityPage() {
  return (
    <div>
      <RekvizityClient />

      <section className="mx-auto max-w-3xl px-4 pb-16 text-sm leading-relaxed text-slate-700 print:hidden">
        <h2 className="text-xl font-semibold text-slate-900">Зачем это нужно</h2>
        <p className="mt-3">
          Иногда клиенту достаточно реквизитов без полного счёта — например, для перевода «по
          договорённости». Карточку можно отправить в мессенджер или распечатать. Для формального
          счёта с позициями используйте{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            генератор счетов
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
