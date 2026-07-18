import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "НДС на УСН в 2026 году: ставки 5% и 7% для ИП",
  description:
    "Когда ИП на УСН платит НДС в 2026 году, чем отличаются ставки 5% и 7%, как начислить НДС в счёте и что проверить.",
  keywords: "НДС на УСН 2026, НДС 5%, НДС 7%, НДС для ИП на упрощенке, калькулятор НДС",
  alternates: { canonical: "https://biznes-ip.ru/articles/nds-na-usn-2026/" },
  openGraph: {
    title: "НДС на УСН в 2026 году",
    description: "Пороги, спецставки 5% и 7% и как посчитать НДС для счёта.",
    url: "https://biznes-ip.ru/articles/nds-na-usn-2026/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function NdsUsnArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        НДС на УСН в 2026 году: что важно знать ИП
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        С 2026 года тема НДС для упрощенцев стала заметно актуальнее: при росте дохода налог может
        появиться даже на УСН.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Когда НДС обычно «включается»</h2>
          <p className="mt-2">
            Ориентир: если доходы ИП на УСН превышают порог около{" "}
            <strong>20 млн ₽</strong> (проверяйте актуальный лимит под свой период), появляется
            обязанность работать с НДС. Точные условия зависят от года и вашей ситуации — это
            ориентир, не юридическое заключение.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Ставки 5% и 7%</h2>
          <p className="mt-2">
            Для части плательщиков УСН доступны спецставки <strong>5%</strong> и{" "}
            <strong>7%</strong> (часто без права на вычеты). Также остаются общие ставки, в том числе{" "}
            <strong>22%</strong> и 10% для отдельных операций. Какую ставку применять — зависит от
            дохода и выбранного порядка.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что писать в счёте</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              Если НДС нет — обычно указывают «Без НДС».
            </li>
            <li>
              Если НДС есть — сумму налога и ставку: «В том числе НДС …% — … ₽».
            </li>
            <li>
              Итог для клиента = сумма без НДС + НДС (при начислении) либо исходная сумма «с НДС»
              при выделении.
            </li>
          </ul>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Посчитайте за 30 секунд</p>
          <p className="mt-2 text-sm">
            В{" "}
            <Link href="/nds/" className="font-medium text-blue-700 hover:underline">
              калькуляторе НДС
            </Link>{" "}
            можно начислить или выделить налог, выбрать ставку 5%/7%/22% и получить фразу для счёта.
            Налог УСН отдельно — в{" "}
            <Link href="/usn/" className="font-medium text-blue-700 hover:underline">
              калькуляторе УСН
            </Link>
            .
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Практичный порядок</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>Оцените годовой доход и нужна ли вам ставка НДС.</li>
            <li>Посчитайте сумму для клиента в калькуляторе НДС.</li>
            <li>
              Оформите{" "}
              <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
                счёт на оплату
              </Link>{" "}
              с правильной фразой про НДС.
            </li>
          </ol>
        </section>

        <p className="text-sm text-slate-500">
          Материал справочный. Перед сменой ставки и заполнением декларации сверьтесь с НК РФ / ФНС
          или бухгалтером.
        </p>
      </div>
    </article>
  );
}
