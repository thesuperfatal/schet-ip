import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Закрывающие документы для ИП: счёт, акт, УПД",
  description:
    "Какие закрывающие документы нужны ИП: счёт, акт, накладная, УПД, договор. Когда какой документ и как оформить онлайн.",
  keywords:
    "закрывающие документы ИП, закрывающие документы для бухгалтерии, акт и счёт, комплект документов для клиента",
  alternates: { canonical: "https://biznes-ip.ru/articles/zakryvayushchie-dokumenty/" },
  openGraph: {
    title: "Закрывающие документы для ИП",
    description: "Какой комплект документов собрать для клиента и бухгалтерии.",
    url: "https://biznes-ip.ru/articles/zakryvayushchie-dokumenty/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function ZakryvayushchieDokumentyArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Закрывающие документы для ИП: счёт, акт, УПД
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        «Закрыть сделку» значит дать клиенту понятный комплект бумаг: за что платили и что получили.
        Набор зависит от услуг или товара.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Типичный набор для услуг</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>
              <Link href="/dogovor/" className="text-blue-600 hover:underline">
                Договор
              </Link>{" "}
              — если нужен (не всегда обязателен для мелких сделок, но часто удобен).
            </li>
            <li>
              <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
                Счёт
              </Link>{" "}
              — просьба об оплате.
            </li>
            <li>
              <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
                Акт
              </Link>{" "}
              — подтверждение, что работы/услуги выполнены.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Если продаёте товар</h2>
          <p className="mt-2">
            Вместо или вместе с актом часто нужна{" "}
            <Link href="/nakladnaya/" className="text-blue-600 hover:underline">
              накладная или УПД
            </Link>
            . Подробнее — в статье{" "}
            <Link href="/articles/chto-takoe-upd/" className="text-blue-600 hover:underline">
              «Что такое УПД»
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">До продажи</h2>
          <p className="mt-2">
            Иногда клиенту сначала отправляют{" "}
            <Link href="/kp/" className="text-blue-600 hover:underline">
              коммерческое предложение
            </Link>
            , потом договор и счёт. В СчётИП данные можно переносить по цепочке КП → договор → счёт
            → акт.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Если не платят</h2>
          <p className="mt-2">
            Сначала посчитайте просрочку в{" "}
            <Link href="/srok-oplaty/" className="text-blue-600 hover:underline">
              калькуляторе срока оплаты
            </Link>
            , затем при необходимости оформите{" "}
            <Link href="/pretenziya/" className="text-blue-600 hover:underline">
              претензию
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что хранить у себя</h2>
          <p className="mt-2">
            Копии счетов, актов, договоров и подтверждения оплаты. Для УСН это помогает вести учёт и
            КУДиР — см.{" "}
            <Link href="/articles/kudir-dlya-ip/" className="text-blue-600 hover:underline">
              статью про КУДиР
            </Link>
            .
          </p>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Собрать документы онлайн</p>
          <p className="mt-2 text-sm">
            Каталог инструментов:{" "}
            <Link href="/tools/" className="font-medium text-blue-700 hover:underline">
              все инструменты СчётИП
            </Link>
            . Счёт и акт —{" "}
            <Link href="/create/?type=schet" className="font-medium text-blue-700 hover:underline">
              создать документ
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
