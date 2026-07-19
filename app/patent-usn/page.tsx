import type { Metadata } from "next";
import Link from "next/link";
import PatentUsnCalculator from "@/components/PatentUsnCalculator";

export const metadata: Metadata = {
  title: "Патент или УСН — калькулятор сравнения для ИП",
  description:
    "Сравните патент, УСН 6% и УСН 15% с учётом страховых взносов. Узнайте, какой режим выгоднее и сколько откладывать в месяц.",
  keywords:
    "патент или УСН калькулятор, сравнить патент и УСН, что выгоднее патент или упрощёнка",
  alternates: { canonical: "https://biznes-ip.ru/patent-usn/" },
  openGraph: {
    title: "Патент или УСН — калькулятор для ИП",
    description: "Сравнение патента и УСН 6%/15% с взносами.",
    url: "https://biznes-ip.ru/patent-usn/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function PatentUsnPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Инструменты для ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Патент или УСН — что выгоднее
        </h1>
        <p className="mt-3 text-slate-600">
          Введите доход, расходы и стоимость патента — калькулятор сравнит три варианта с учётом
          взносов.
        </p>
      </div>

      <PatentUsnCalculator />

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Как пользоваться</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Посчитайте стоимость патента на сайте ФНС по своему региону и ОК.</li>
          <li>Укажите ожидаемый доход (и расходы — если смотрите УСН 15%).</li>
          <li>Сравните итоговую нагрузку: налог/патент + взносы.</li>
        </ol>
        <p>
          Если цифры близкие — читайте{" "}
          <Link href="/articles/patent-ili-usn/" className="text-blue-600 hover:underline">
            статью «Патент или УСН»
          </Link>
          : ограничения патента часто важнее небольшой разницы в сумме.
        </p>
      </section>
    </div>
  );
}
