import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "УСН 6% или 15%: что выгоднее ИП",
  description:
    "Не сравнивайте голые проценты. Как прикинуть УСН 6% и 15% с взносами и расходами — и не промахнуться с минимумом 1%.",
  keywords: "УСН 6 или 15, что выгоднее УСН, УСН доходы минус расходы, калькулятор УСН ИП",
  alternates: { canonical: "https://biznes-ip.ru/articles/usn-6-ili-15/" },
  openGraph: {
    title: "УСН 6% или 15%: что выгоднее ИП",
    description: "Сравниваем режимы с учётом взносов, а не только ставку.",
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
        Если смотреть только на цифру «6» и «15», можно легко выбрать не тот режим. В реальной
        жизни рядом ещё взносы, расходы и иногда неприятный минимальный налог.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Шесть процентов от дохода</h2>
          <p className="mt-2">
            Берёте всё, что пришло, умножаете на 6%. Звучит просто — так и есть, пока не вспомните
            про взносы. ИП без сотрудников часто может вычесть уплаченные взносы из этого налога
            почти полностью. С работниками вычет обычно режут (часто до половины налога).
          </p>
          <p className="mt-2">
            Режим хорошо ложится на услуги, где расходов мало или их лень / сложно собирать
            чеками.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Пятнадцать процентов от «доход минус расход»</h2>
          <p className="mt-2">
            Тут важна разница: сколько заработали минус сколько потратили по правилам. Взносы за
            себя обычно сидят в расходах. Но есть подвох —{" "}
            <strong>минимальный налог 1% от дохода</strong>. Если «красивый» расчёт вышел меньше
            минимума, платите минимум. Люди про него забывают и удивляются в конце года.
          </p>
          <p className="mt-2">
            Имеет смысл, когда расходов реально много и они подтверждаемые: закупки, аренда,
            подрядчики.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Как решить, не гадая на кофейной гуще</h2>
          <p className="mt-2">
            Прикиньте доход и долю расходов. Добавьте фикс взносов и 1% свыше 300 тысяч. Смотрите не
            «какой налог», а «сколько всего уйдёт: налог плюс взносы». И уже от этой суммы —
            сколько комфортно откладывать каждый месяц.
          </p>
          <p className="mt-2">
            Быстрее всего это делается в{" "}
            <Link href="/usn/" className="text-blue-600 hover:underline">
              калькуляторе УСН
            </Link>
            : там как раз сравнение 6% и 15% на одних цифрах.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Если доход растёт</h2>
          <p className="mt-2">
            На упрощёнке может нарисоваться НДС — это отдельная история, про неё есть{" "}
            <Link href="/articles/nds-na-usn-2026/" className="text-blue-600 hover:underline">
              заметка про НДС на УСН
            </Link>{" "}
            и{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              калькулятор
            </Link>
            .
          </p>
        </section>

        <p className="text-sm text-slate-500">
          Это ориентир, не замена бухгалтеру. Перед сменой режима лучше свериться с актуальными
          правилами или человеком, который ведёт вашу отчётность.
        </p>
      </div>
    </article>
  );
}
