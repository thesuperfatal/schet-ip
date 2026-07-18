import type { Metadata } from "next";
import Link from "next/link";
import PaymentDeadlineCalculator from "@/components/PaymentDeadlineCalculator";

export const metadata: Metadata = {
  title: "Калькулятор срока оплаты и пени — бесплатно",
  description:
    "Бесплатный калькулятор: дата счёта + отсрочка = срок оплаты. Дни просрочки и ориентировочные пени (1/300 или 1/360 ставки ЦБ либо своя ставка).",
  keywords:
    "калькулятор срока оплаты, калькулятор пени, просрочка оплаты, пени по договору, 1/300 ключевой ставки",
  alternates: { canonical: "https://biznes-ip.ru/srok-oplaty/" },
  openGraph: {
    title: "Срок оплаты и пени — СчётИП",
    description: "Когда платить по счёту и сколько пени при просрочке.",
    url: "https://biznes-ip.ru/srok-oplaty/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function SrokOplatyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Инструменты для ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Срок оплаты и пени
        </h1>
        <p className="mt-3 text-slate-600">
          Посчитайте дату оплаты по счёту с отсрочкой и ориентировочные пени при просрочке.
        </p>
      </div>

      <PaymentDeadlineCalculator />

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Зачем это ИП</h2>
        <p>
          В договоре и счёте часто пишут «оплата в течение N дней». Калькулятор сразу показывает
          крайнюю дату и, если платёж опоздал, примерную сумму пеней. Для выставления счёта
          клиенту используйте{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            генератор счетов
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
