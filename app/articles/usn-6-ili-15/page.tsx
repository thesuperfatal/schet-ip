import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "УСН 6% или 15%: что выгоднее ИП в 2026 году",
  description:
    "Сравнение УСН «доходы» 6% и «доходы минус расходы» 15% для ИП: взносы, вычет, минимальный налог и когда какой режим выгоднее.",
  keywords: "УСН 6 или 15, что выгоднее УСН, УСН доходы минус расходы, калькулятор УСН ИП",
  alternates: { canonical: "https://biznes-ip.ru/articles/usn-6-ili-15/" },
  openGraph: {
    title: "УСН 6% или 15%: что выгоднее ИП",
    description: "Как сравнить режимы УСН с учётом взносов и выбрать выгодный вариант.",
    url: "https://biznes-ip.ru/articles/usn-6-ili-15/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function UsnArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        УСН 6% или 15%: что выгоднее ИП
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Коротко: сравнивать нужно не «голый процент», а налог вместе со страховыми взносами и
        реальными расходами.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">УСН «Доходы» 6%</h2>
          <p className="mt-2">
            Налог считается от доходов. ИП без сотрудников может уменьшить налог на уплаченные
            взносы почти до нуля (в пределах суммы налога). Если есть работники, вычет обычно
            ограничен 50% налога.
          </p>
          <p className="mt-2">
            Режим удобен, когда расходов немного или их сложно подтверждать документами.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">УСН «Доходы минус расходы» 15%</h2>
          <p className="mt-2">
            Налог считается с разницы между доходами и расходами. Взносы ИП за себя обычно входят в
            расходы. Важно помнить про{" "}
            <strong>минимальный налог 1% от дохода</strong>: если расчётный налог меньше минимума,
            платится минимум.
          </p>
          <p className="mt-2">
            Режим чаще выгоден при высокой доле подтверждённых расходов (закупки, аренда, подрядчики).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Как выбрать на практике</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>Оцените доход и долю расходов за год или квартал.</li>
            <li>Учтите фиксированные взносы и 1% свыше 300 000 ₽.</li>
            <li>Сравните итоговую нагрузку: налог + взносы.</li>
            <li>Посмотрите, сколько удобно откладывать каждый месяц.</li>
          </ol>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Посчитайте на калькуляторе</p>
          <p className="mt-2 text-sm">
            В{" "}
            <Link href="/usn/" className="font-medium text-blue-700 hover:underline">
              калькуляторе УСН
            </Link>{" "}
            можно сравнить 6% и 15%, учесть взносы и увидеть сумму «откладывать в месяц».
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Связанные инструменты</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <Link href="/nds/" className="text-blue-600 hover:underline">
                Калькулятор НДС
              </Link>{" "}
              — если доход растёт и появляется НДС
            </li>
            <li>
              <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
                Счёт на оплату
              </Link>{" "}
              — выставить оплату клиенту
            </li>
          </ul>
        </section>

        <p className="text-sm text-slate-500">
          Статья носит справочный характер и не заменяет консультацию бухгалтера. Условия УСН и
          вычетов проверяйте по актуальным нормам НК РФ.
        </p>
      </div>
    </article>
  );
}
