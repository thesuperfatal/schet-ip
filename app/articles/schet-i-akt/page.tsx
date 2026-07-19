import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Счёт и акт для ИП: в чём разница",
  description:
    "Счёт просит оплатить, акт закрывает работу. Когда какой документ нужен и что в них писать — без канцелярита.",
  keywords: "счёт и акт для ИП, чем отличается счёт от акта, акт выполненных работ, счёт на оплату",
  alternates: { canonical: "https://biznes-ip.ru/articles/schet-i-akt/" },
  openGraph: {
    title: "Счёт и акт для ИП: в чём разница",
    description: "Когда слать счёт, когда акт, и зачем оба.",
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
        Счёт и акт для ИП: в чём разница
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Эти два файла путают чаще всего. Звучат похоже, а смысл разный — как «чек в кафе» и
        «расписка, что обед съели».
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Счёт — «заплатите вот столько»</h2>
          <p className="mt-2">
            Его шлют, когда нужно получить деньги: до старта, по предоплате или как напоминание.
            Внутри — ваши реквизиты, что оплачивают, количество, цена, итог и пометка про НДС. Без
            счёта крупный клиент часто просто не проведёт платёж через свою бухгалтерию.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Акт — «работу приняли»</h2>
          <p className="mt-2">
            Акт уже про факт: услуга оказана, стороны согласны. Его любят за то, что потом меньше
            споров «а вы вообще что-то делали?». Подписывают после сдачи, иногда вместе с оплатой —
            как договоритесь.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Как это обычно идёт по жизни</h2>
          <p className="mt-2">
            Поговорили → (иногда) договор → счёт → оплата → сделали → акт. Но жизнь ломает схемы:
            кто-то платит после акта, кто-то берёт предоплату 50/50, кто-то закрывает проект
            несколькими актами по этапам. Главное — чтобы цифры и названия в счёте и акте не
            разъезжались.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что не забыть в обоих</h2>
          <p className="mt-2">
            Кто вы и кто клиент (ИНН, адрес), номер и дата, нормальное название услуги, сумма.
            Прописью — приятный бонус, особенно если документ потом смотрит банк или юрист.
            Про НДС — либо «Без НДС», либо ставка и сумма, без туманных «в т.ч. налог».
          </p>
        </section>

        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
          На СчётИП можно сделать{" "}
          <Link href="/create/?type=schet" className="font-medium text-blue-700 hover:underline">
            счёт
          </Link>{" "}
          и{" "}
          <Link href="/create/?type=akt" className="font-medium text-blue-700 hover:underline">
            акт
          </Link>{" "}
          в PDF. Реквизиты запоминаются в браузере. Если нужен ещё и{" "}
          <Link href="/dogovor/" className="font-medium text-blue-700 hover:underline">
            договор
          </Link>
          — он тоже рядом.
        </p>
      </div>
    </article>
  );
}
