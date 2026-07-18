import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Счёт и акт для ИП: чем отличаются и когда нужны",
  description:
    "Чем счёт на оплату отличается от акта выполненных работ, в каком порядке их выставлять ИП и как оформить документы онлайн.",
  keywords: "счёт и акт для ИП, чем отличается счёт от акта, акт выполненных работ, счёт на оплату",
  alternates: { canonical: "https://biznes-ip.ru/articles/schet-i-akt/" },
  openGraph: {
    title: "Счёт и акт для ИП: чем отличаются",
    description: "Когда выставлять счёт, когда акт, и как оформить оба документа бесплатно.",
    url: "https://biznes-ip.ru/articles/schet-i-akt/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function SchetIAktArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Счёт и акт для ИП: чем отличаются и когда нужны
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Два самых частых документа у ИП при работе с клиентами — счёт на оплату и акт. Их часто
        путают, хотя задачи разные.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Счёт на оплату</h2>
          <p className="mt-2">
            Счёт показывает, <strong>сколько и за что нужно заплатить</strong>. Его отправляют
            клиенту до оплаты или вместе с договором. В счёте обычно указывают реквизиты ИП,
            наименование услуги/товара, количество, цену, итоговую сумму и примечание про НДС.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Акт выполненных работ</h2>
          <p className="mt-2">
            Акт фиксирует, что работы или услуги <strong>уже выполнены</strong> и заказчик их
            принимает. Это важно для закрытия сделки, учёта и споров. Часто акт делают после оплаты
            или одновременно с ней — по договорённости сторон.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Типовой порядок</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>Договорились об услуге (иногда оформляют договор).</li>
            <li>Выставили счёт.</li>
            <li>Клиент оплатил.</li>
            <li>Сделали работу и подписали акт.</li>
          </ol>
          <p className="mt-2">
            Порядок может меняться: предоплата, постоплата, частичные акты по этапам.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что указать в обоих документах</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Реквизиты ИП и покупателя (ИНН, адрес).</li>
            <li>Номер и дату документа.</li>
            <li>Понятное наименование услуги.</li>
            <li>Сумму цифрами и желательно прописью.</li>
            <li>Фразу про НДС («Без НДС» или ставка/сумма).</li>
          </ul>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Оформить онлайн</p>
          <p className="mt-2 text-sm">
            В СчётИП можно бесплатно{" "}
            <Link href="/create/?type=schet" className="font-medium text-blue-700 hover:underline">
              создать счёт
            </Link>{" "}
            или{" "}
            <Link href="/create/?type=akt" className="font-medium text-blue-700 hover:underline">
              акт в PDF
            </Link>
            . Реквизиты сохраняются в браузере. Нужен договор — есть{" "}
            <Link href="/dogovor/" className="font-medium text-blue-700 hover:underline">
              шаблон договора оказания услуг
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
