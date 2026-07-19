import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Что такое УПД и чем отличается от накладной",
  description:
    "УПД для ИП простыми словами: зачем нужен универсальный передаточный документ, чем отличается от товарной накладной и когда достаточно акта.",
  keywords: "что такое УПД, УПД для ИП, товарная накладная или УПД, универсальный передаточный документ",
  alternates: { canonical: "https://biznes-ip.ru/articles/chto-takoe-upd/" },
  openGraph: {
    title: "Что такое УПД",
    description: "Простое объяснение: УПД, накладная и акт — когда какой документ.",
    url: "https://biznes-ip.ru/articles/chto-takoe-upd/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function ChtoTakoeUpdArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Что такое УПД и чем отличается от накладной
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        УПД — универсальный передаточный документ. Им часто закрывают отгрузку товара: и передачу,
        и (при необходимости) сведения для НДС в одном бланке.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Простыми словами</h2>
          <p className="mt-2">
            Товарная накладная фиксирует, что товар передан покупателю. УПД может совмещать роль
            накладной и счёта-фактуры (в зависимости от статуса документа). Для малого ИП на
            практике важно другое: клиент просит «накладную или УПД» — значит, нужен документ на
            отгрузку, а не только счёт.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Когда достаточно акта</h2>
          <p className="mt-2">
            Если вы оказываете услуги (дизайн, разработка, консультации), обычно хватает{" "}
            <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
              акта выполненных работ
            </Link>
            . Накладная/УПД чаще нужны при продаже товара или материальных ценностей.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Счёт, акт, накладная — связка</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Счёт</strong> — попросить оплату;
            </li>
            <li>
              <strong>Акт</strong> — подтвердить, что услуга оказана;
            </li>
            <li>
              <strong>Накладная / УПД</strong> — подтвердить передачу товара.
            </li>
          </ul>
          <p className="mt-3">
            Подробнее про счёт и акт — в статье{" "}
            <Link href="/articles/schet-i-akt/" className="text-blue-600 hover:underline">
              «Счёт и акт: чем отличаются»
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что указать в документе</h2>
          <p className="mt-2">
            Стороны (продавец и покупатель), наименование товара, количество, цену, сумму, дату
            отгрузки. Если работаете с НДС — проверьте ставку и формулировку в документе. Для
            расчёта удобен{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              калькулятор НДС
            </Link>
            .
          </p>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Сделать накладную / УПД онлайн</p>
          <p className="mt-2 text-sm">
            В СчётИП есть простой генератор:{" "}
            <Link href="/nakladnaya/" className="font-medium text-blue-700 hover:underline">
              накладная или УПД в PDF
            </Link>
            . Бесплатно, без регистрации.
          </p>
        </div>
      </div>
    </article>
  );
}
