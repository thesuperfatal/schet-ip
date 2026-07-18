import type { Metadata } from "next";
import UsnCalculator from "@/components/UsnCalculator";

export const metadata: Metadata = {
  title: "Калькулятор УСН для ИП 2026 — 6% и 15%, сколько откладывать",
  description:
    "Бесплатный калькулятор УСН для ИП: налог 6% и 15%, взносы, вычет, минимальный налог 1%, сравнение режимов и сумма «откладывать в месяц».",
  keywords:
    "калькулятор УСН, УСН 6%, УСН 15%, налог ИП, сколько откладывать на налог, взносы ИП 2026",
};

export default function UsnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Инструменты для ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Калькулятор УСН для ИП
        </h1>
        <p className="mt-3 text-slate-600">
          Сравните УСН 6% и 15%, учтите страховые взносы и узнайте, сколько откладывать каждый
          месяц.
        </p>
      </div>
      <UsnCalculator />
    </div>
  );
}
