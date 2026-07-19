import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Патент или УСН: что выбрать ИП",
  description:
    "Патент фиксирует сумму заранее, УСН пляшет от выручки и расходов. Как сравнить режимы и не забыть про взносы.",
  keywords: "патент или УСН, что выбрать ИП патент УСН, патентная система или упрощёнка",
  alternates: { canonical: "https://biznes-ip.ru/articles/patent-ili-usn/" },
  openGraph: {
    title: "Патент или УСН: что выбрать ИП",
    description: "Сравнение без лозунгов — цифры и ограничения.",
    url: "https://biznes-ip.ru/articles/patent-ili-usn/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function PatentIliUsnArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Патент или УСН: что выбрать ИП
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Оба режима легче общей системы. Но «что выгоднее» зависит не от красивой картинки в
        рекламе банка, а от вашего ОК, региона, выручки и того, сколько вы реально тратите.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">В двух словах</h2>
          <p className="mt-2">
            <strong>УСН</strong> — налог от живых доходов (6%) или от доходов минус расходы (15%,
            но не ниже минимума). Гибко, привычно многим услугам и торговле в рамках лимитов.
          </p>
          <p className="mt-2">
            <strong>Патент</strong> — заранее известная стоимость на вид деятельности и срок. Не
            скачет от каждого платежа клиента, зато список видов жёсткий, и «что угодно» на него не
            повесишь.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Когда патент реально смотрят</h2>
          <p className="mt-2">
            Ваш ОК есть в перечне региона, выручка не космическая, расходов мало — патент иногда
            выходит дешевле «шестёрки». Стоимость берите из калькулятора ФНС / региона, а УСН
            прикиньте рядом — иначе сравниваете яблоки с грушами.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Когда чаще остаётся УСН</h2>
          <p className="mt-2">
            Деятельность не влезает в патент, услуг много и разных, на 15% куча подтверждаемых
            затрат, или просто хочется запаса по росту в рамках лимитов упрощёнки. Сравнить 6 и 15 —
            в{" "}
            <Link href="/articles/usn-6-ili-15/" className="text-blue-600 hover:underline">
              отдельной заметке
            </Link>{" "}
            и в{" "}
            <Link href="/usn/" className="text-blue-600 hover:underline">
              калькуляторе УСН
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Взносы никто не отменял</h2>
          <p className="mt-2">
            Фикс «за себя» и 1% свыше 300 тысяч сидят в любой раскладке. На УСН «доходы» взносы ещё
            и налог уменьшают. Их удобно глянуть отдельно в{" "}
            <Link href="/vznosy/" className="text-blue-600 hover:underline">
              калькуляторе взносов
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Как не выбрать глазами</h2>
          <p className="mt-2">
            Возьмите ожидаемую выручку, посчитайте УСН с взносами, рядом положите стоимость
            патента. Цифры почти равны — смотрите на отчётность и ограничения патента, а не на
            «сэкономил тысячу». Быстрый свод трёх вариантов — в{" "}
            <Link href="/patent-usn/" className="text-blue-600 hover:underline">
              калькуляторе «патент или УСН»
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
