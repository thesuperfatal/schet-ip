import type { Metadata } from "next";
import Link from "next/link";
import TaxCalendar from "@/components/TaxCalendar";

export const metadata: Metadata = {
  title: "Календарь сроков ИП 2026 — УСН, взносы, декларация",
  description:
    "Календарь налоговых сроков для ИП: авансы УСН, фиксированные взносы, 1% свыше 300 тыс., декларация. Ближайшие даты и напоминания.",
  keywords:
    "календарь ИП, сроки уплаты УСН, когда платить взносы ИП, декларация УСН срок, налоговый календарь ИП 2026",
  alternates: { canonical: "https://biznes-ip.ru/sroki/" },
  openGraph: {
    title: "Календарь сроков ИП 2026 — СчётИП",
    description: "Авансы УСН, взносы и декларация — ближайшие даты.",
    url: "https://biznes-ip.ru/sroki/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function SrokiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Инструменты для ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Календарь сроков ИП
        </h1>
        <p className="mt-3 text-slate-600">
          Когда платить авансы УСН и взносы, когда сдавать декларацию — список с ближайшей датой.
        </p>
      </div>

      <TaxCalendar />

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Важно</h2>
        <p>
          Сроки — ориентир для типичного ИП на УСН без работников. Если у вас патент, ОСНО, НДС или
          сотрудники — сверьте даты в личном кабинете налогоплательщика. Суммы посчитайте в{" "}
          <Link href="/usn/" className="text-blue-600 hover:underline">
            калькуляторе УСН
          </Link>{" "}
          и{" "}
          <Link href="/vznosy/" className="text-blue-600 hover:underline">
            калькуляторе взносов
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
