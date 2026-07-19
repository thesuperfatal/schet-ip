import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Что такое УПД и чем отличается от накладной",
  description:
    "Клиент просит УПД или накладную — что это вообще и когда вместо них хватает обычного акта.",
  keywords: "что такое УПД, УПД для ИП, товарная накладная или УПД, универсальный передаточный документ",
  alternates: { canonical: "https://biznes-ip.ru/articles/chto-takoe-upd/" },
  openGraph: {
    title: "Что такое УПД",
    description: "Накладная, УПД и акт — когда какой документ, без бюрократического тумана.",
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
        Расшифровка звучит грозно: «универсальный передаточный документ». На практике клиент просто
        хочет бумажку, что товар уехал к нему — иногда ещё и с заделом под НДС.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Без учебника</h2>
          <p className="mt-2">
            Накладная говорит: товар передан. УПД умеет быть и накладной, и чем-то вроде
            счёта-фактуры — в зависимости от того, какой статус документу присвоили. Мелкому ИП
            важнее другое: если пишут «нужна накладная или УПД», одного счёта на оплату мало. Нужен
            документ именно на отгрузку.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Делаете услуги — чаще хватит акта</h2>
          <p className="mt-2">
            Дизайн, код, консультации, маркетинг — тут обычно просят{" "}
            <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
              акт
            </Link>
            . Накладная с УПД чаще про коробки, материалы, физический товар.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Кто за что отвечает</h2>
          <p className="mt-2">
            Счёт — «заплатите». Акт — «услугу приняли». Накладная / УПД — «товар отдали». Про счёт
            и акт отдельно расписал{" "}
            <Link href="/articles/schet-i-akt/" className="text-blue-600 hover:underline">
              здесь
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что писать внутри</h2>
          <p className="mt-2">
            Кто продавец и покупатель, что за товар, сколько штук, по какой цене, какая сумма, когда
            отгрузили. С НДС — не забудьте ставку. Посчитать сумму можно в{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              калькуляторе НДС
            </Link>
            , а сам документ — в{" "}
            <Link href="/nakladnaya/" className="text-blue-600 hover:underline">
              генераторе накладной / УПД
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
