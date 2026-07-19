import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Патент или УСН: что выбрать ИП",
  description:
    "Патент или УСН для ИП: чем отличаются, когда патент выгоднее, как считать налог на упрощёнке и какие ограничения учесть.",
  keywords: "патент или УСН, что выбрать ИП патент УСН, патентная система или упрощёнка",
  alternates: { canonical: "https://biznes-ip.ru/articles/patent-ili-usn/" },
  openGraph: {
    title: "Патент или УСН: что выбрать ИП",
    description: "Сравнение режимов простыми словами + ссылка на калькулятор УСН.",
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
        Оба режима упрощают жизнь по сравнению с общей системой. Выбор зависит от вида
        деятельности, региона, выручки и расходов.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Коротко о разнице</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>УСН</strong> — налог от реальных доходов (6%) или от доходов минус расходы
              (15%, не ниже минимального налога). Подходит большинству услуг и торговли в рамках
              лимитов.
            </li>
            <li>
              <strong>Патент (ПСН)</strong> — фиксированная стоимость патента на вид деятельности и
              срок. Налог не «пляшет» от каждой оплаты клиента, но есть жёсткие ограничения по
              видам работ и лимитам.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Когда чаще смотрят на патент</h2>
          <p className="mt-2">
            Если ваш вид деятельности есть в перечне региона, выручка умеренная, а расходы небольшие
            — патент может выйти дешевле УСН 6%. Имеет смысл сравнить стоимость патента на сайте
            ФНС / калькуляторе региона с ориентировочным налогом на УСН.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Когда обычно выбирают УСН</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>деятельность не подходит под патент;</li>
            <li>нужна гибкость по разным услугам и клиентам;</li>
            <li>на «доходы минус расходы» много подтверждаемых затрат;</li>
            <li>проще совмещать с ростом бизнеса в рамках лимитов УСН.</li>
          </ul>
          <p className="mt-3">
            Сравнить 6% и 15% можно в статье{" "}
            <Link href="/articles/usn-6-ili-15/" className="text-blue-600 hover:underline">
              «УСН 6% или 15%»
            </Link>{" "}
            и в{" "}
            <Link href="/patent-usn/" className="text-blue-600 hover:underline">
              калькуляторе «Патент или УСН»
            </Link>{" "}
            и в{" "}
            <Link href="/usn/" className="text-blue-600 hover:underline">
              калькуляторе УСН
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Не забудьте про взносы</h2>
          <p className="mt-2">
            Фиксированные страховые взносы ИП и 1% свыше 300 000 ₽ дохода влияют на итоговую
            нагрузку. На УСН «доходы» взносы часто уменьшают налог. Посчитайте их отдельно в{" "}
            <Link href="/vznosy/" className="text-blue-600 hover:underline">
              калькуляторе взносов
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Практичный совет</h2>
          <p className="mt-2">
            Возьмите ожидаемую выручку за год, посчитайте УСН (с взносами) и сравните со стоимостью
            патента по вашему ОК и региону. Если цифры близкие — смотрите на удобство отчётности и
            ограничения патента, а не только на «красивую» сумму.
          </p>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Сравнить патент и УСН онлайн</p>
          <p className="mt-2 text-sm">
            Откройте{" "}
            <Link href="/patent-usn/" className="font-medium text-blue-700 hover:underline">
              калькулятор «Патент или УСН»
            </Link>
            : укажите доход и стоимость патента — увидите, что выгоднее с учётом взносов.
            Бесплатно, без регистрации.
          </p>
        </div>
      </div>
    </article>
  );
}
