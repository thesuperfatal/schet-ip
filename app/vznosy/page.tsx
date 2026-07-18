import type { Metadata } from "next";
import Link from "next/link";
import VznosyCalculator from "@/components/VznosyCalculator";

export const metadata: Metadata = {
  title: "Калькулятор страховых взносов ИП 2026 — фикс + 1%",
  description:
    "Бесплатный калькулятор взносов ИП за себя: фиксированная часть и 1% свыше 300 000 ₽ на 2026 год. Сколько откладывать в месяц.",
  keywords:
    "калькулятор страховых взносов ИП, взносы ИП 2026, фиксированные взносы ИП, 1% свыше 300000, сколько платить взносы ИП",
  alternates: { canonical: "https://biznes-ip.ru/vznosy/" },
  openGraph: {
    title: "Калькулятор страховых взносов ИП 2026 — СчётИП",
    description: "Фикс + 1% свыше 300 тыс. ₽: итого за год и сколько откладывать в месяц.",
    url: "https://biznes-ip.ru/vznosy/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function VznosyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Инструменты для ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Калькулятор страховых взносов ИП
        </h1>
        <p className="mt-3 text-slate-600">
          Посчитайте фиксированные взносы и 1% с дохода свыше 300 000 ₽ — и сколько удобно
          откладывать каждый месяц.
        </p>
      </div>

      <VznosyCalculator />

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Взносы ИП и налог УСН</h2>
        <p>
          Взносы «за себя» обычно уменьшают налог на УСН. После расчёта взносов откройте{" "}
          <Link href="/usn/" className="text-blue-600 hover:underline">
            калькулятор УСН
          </Link>{" "}
          — там можно сразу увидеть налог к уплате и общую нагрузку. Если доход высокий, проверьте
          также{" "}
          <Link href="/nds/" className="text-blue-600 hover:underline">
            калькулятор НДС
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
