import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Закрывающие документы для ИП: счёт, акт, УПД",
  description:
    "Какой комплект бумаг собрать клиенту: услуги, товар, предоплата и что делать, если не платят.",
  keywords:
    "закрывающие документы ИП, закрывающие документы для бухгалтерии, акт и счёт, комплект документов для клиента",
  alternates: { canonical: "https://biznes-ip.ru/articles/zakryvayushchie-dokumenty/" },
  openGraph: {
    title: "Закрывающие документы для ИП",
    description: "Комплект под услуги и товар — без лишней бюрократии.",
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
        Закрывающие документы для ИП
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        «Закрыть сделку» по-человечески — отдать клиенту понятный набор: за что платили и что
        получили. Набор разный для услуг и для товара, универсальной папки на все случаи нет.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Услуги</h2>
          <p className="mt-2">
            Часто хватает{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              счёта
            </Link>{" "}
            и{" "}
            <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
              акта
            </Link>
            .{" "}
            <Link href="/dogovor/" className="text-blue-600 hover:underline">
              Договор
            </Link>{" "}
            — по желанию: на мелких сделках многие обходятся без него, на крупных клиент почти
            всегда попросит.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Товар</h2>
          <p className="mt-2">
            Тут чаще нужна{" "}
            <Link href="/nakladnaya/" className="text-blue-600 hover:underline">
              накладная или УПД
            </Link>
            — чтобы зафиксировать отгрузку. Зачем УПД и чем он не акт — в{" "}
            <Link href="/articles/chto-takoe-upd/" className="text-blue-600 hover:underline">
              отдельной заметке
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">До того, как попросили счёт</h2>
          <p className="mt-2">
            Иногда сначала уходит{" "}
            <Link href="/kp/" className="text-blue-600 hover:underline">
              коммерческое предложение
            </Link>
            , потом договор и уже счёт. На СчётИП данные можно тащить по цепочке, чтобы не
            перебивать ФИО клиента четыре раза.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Если тишина вместо оплаты</h2>
          <p className="mt-2">
            Сначала прикиньте просрочку в{" "}
            <Link href="/srok-oplaty/" className="text-blue-600 hover:underline">
              калькуляторе срока и пеней
            </Link>
            . Если нужно официально напомнить — есть{" "}
            <Link href="/pretenziya/" className="text-blue-600 hover:underline">
              претензия
            </Link>
            . Это не «суд завтра», а нормальный шаг, когда чат уже не помогает.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что оставить себе</h2>
          <p className="mt-2">
            Копии счетов, актов, договоров и подтверждения оплаты. На УСН это ещё и топливо для
            КУДиР — про книгу учёта писал{" "}
            <Link href="/articles/kudir-dlya-ip/" className="text-blue-600 hover:underline">
              здесь
            </Link>
            .
          </p>
        </section>

        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
          Весь набор инструментов лежит в{" "}
          <Link href="/tools/" className="font-medium text-blue-700 hover:underline">
            каталоге
          </Link>
          . Если не знаете, с чего начать под ваш случай — зайдите в{" "}
          <Link href="/dlya-kogo/" className="font-medium text-blue-700 hover:underline">
            «Для кого»
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
