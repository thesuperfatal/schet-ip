import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "КУДиР для ИП на УСН: зачем нужна и что писать",
  description:
    "КУДиР для ИП на УСН простыми словами: зачем вести книгу учёта доходов и расходов, что фиксировать и как не запутаться в суммах.",
  keywords: "КУДиР для ИП, книга учёта доходов и расходов УСН, как вести КУДиР",
  alternates: { canonical: "https://biznes-ip.ru/articles/kudir-dlya-ip/" },
  openGraph: {
    title: "КУДиР для ИП на УСН",
    description: "Зачем нужна книга учёта и что в неё писать.",
    url: "https://biznes-ip.ru/articles/kudir-dlya-ip/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function KudirDlyaIpArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        КУДиР для ИП на УСН: зачем нужна и что писать
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        КУДиР — книга учёта доходов и расходов. На упрощёнке она нужна, чтобы считать налог и
        подтверждать цифры при проверке.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Простыми словами</h2>
          <p className="mt-2">
            Это журнал операций за год: когда пришли деньги, сколько, от кого (и расходы — если УСН
            15%). Форму утверждает ФНС; вести можно в Excel, сервисе или на бумаге по правилам.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что обычно заносят</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>дату и сумму поступления на расчётный счёт / в кассу;</li>
            <li>основание (счёт, договор, акт — по смыслу операции);</li>
            <li>на УСН 15% — подтверждаемые расходы;</li>
            <li>итоги за квартал и год для авансов и декларации.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Связь со счетами и актами</h2>
          <p className="mt-2">
            Для учёта удобно хранить цепочку:{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              счёт
            </Link>{" "}
            → оплата →{" "}
            <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
              акт
            </Link>
            . Тогда проще восстановить, откуда взялась сумма в КУДиР.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Налог и сроки</h2>
          <p className="mt-2">
            По итогам кварталов платят авансы УСН, по году — налог и декларацию. Ориентиры дат — в{" "}
            <Link href="/sroki/" className="text-blue-600 hover:underline">
              календаре сроков ИП
            </Link>
            . Сумму налога оцените в{" "}
            <Link href="/usn/" className="text-blue-600 hover:underline">
              калькуляторе УСН
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Частая ошибка</h2>
          <p className="mt-2">
            Путать «выставленный счёт» и «оплату». В доходы УСН обычно попадает факт оплаты (кассовый
            метод), а не только выписанный документ. Уточняйте правила под свой случай.
          </p>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Посчитать налог УСН</p>
          <p className="mt-2 text-sm">
            Откройте{" "}
            <Link href="/usn/" className="font-medium text-blue-700 hover:underline">
              калькулятор УСН
            </Link>{" "}
            и{" "}
            <Link href="/vznosy/" className="font-medium text-blue-700 hover:underline">
              взносы ИП
            </Link>
            — ориентир, сколько откладывать. Бесплатно.
          </p>
        </div>
      </div>
    </article>
  );
}
