import type { Metadata } from "next";
import Link from "next/link";
import NdsCalculator from "@/components/NdsCalculator";

export const metadata: Metadata = {
  title: "Калькулятор НДС онлайн 2026 — начислить и выделить, НДС для ИП на УСН",
  description:
    "Бесплатный калькулятор НДС: начислить или выделить налог, ставки 0%, 5%, 7%, 10%, 22%. Подсказка для ИП на УСН и фраза для счёта.",
  keywords:
    "калькулятор НДС, выделить НДС, начислить НДС, НДС 22%, НДС 5%, НДС 7%, НДС УСН, НДС для ИП",
  alternates: { canonical: "https://biznes-ip.ru/nds/" },
  openGraph: {
    title: "Калькулятор НДС онлайн 2026 — СчётИП",
    description: "Начислить и выделить НДС, подсказка для УСН, фраза для счёта.",
    url: "https://biznes-ip.ru/nds/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function NdsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Инструменты для ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Калькулятор НДС онлайн
        </h1>
        <p className="mt-3 text-slate-600">
          Начислите или выделите НДС, получите сумму для счёта и ориентир для ИП на УСН в 2026 году.
        </p>
      </div>

      <NdsCalculator />

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Когда нужен калькулятор НДС</h2>
        <p>
          Инструмент помогает быстро посчитать налог для договора, счёта или акта: сколько НДС в
          сумме «с налогом» и какой итог выставить клиенту. Для ИП на УСН в 2026 году тема особенно
          актуальна: при росте дохода может появиться обязанность платить НДС, в том числе по
          спецставкам 5% и 7%.
        </p>
        <p>
          После расчёта оформите документ в{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            генераторе счетов
          </Link>{" "}
          или посчитайте налог УСН в{" "}
          <Link href="/usn/" className="text-blue-600 hover:underline">
            калькуляторе УСН
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
