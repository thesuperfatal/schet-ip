import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "КУДиР для ИП на УСН: зачем нужна и что писать",
  description:
    "КУДиР — не страшная аббревиатура, а журнал денег за год. Что туда заносят и почему счёт ≠ доход.",
  keywords: "КУДиР для ИП, книга учёта доходов и расходов УСН, как вести КУДиР",
  alternates: { canonical: "https://biznes-ip.ru/articles/kudir-dlya-ip/" },
  openGraph: {
    title: "КУДиР для ИП на УСН",
    description: "Зачем книга учёта и что в неё писать, без канцелярита.",
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
        Книга учёта доходов и расходов. На упрощёнке по ней считают налог и, если что, показывают
        проверяющим, откуда цифры. Звучит официально — по сути это аккуратный дневник денег.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что это на пальцах</h2>
          <p className="mt-2">
            Журнал за год: когда пришли деньги, сколько, откуда. На УСН 15% рядом ещё расходы. Форму
            задаёт ФНС, а вести можно в Excel, сервисе или на бумаге — как вам спокойнее, лишь бы
            по правилам.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что обычно туда попадает</h2>
          <p className="mt-2">
            Дата и сумма на счёт или в кассу. Основание — счёт, договор, акт, платёжка, смотря что
            есть. На «доходы минус расходы» — подтверждённые траты. Раз в квартал и в конце года
            удобно сводить итоги под авансы и декларацию.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Зачем хранить счета и акты</h2>
          <p className="mt-2">
            Цепочка{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              счёт
            </Link>{" "}
            → оплата →{" "}
            <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
              акт
            </Link>{" "}
            потом спасает, когда в книге висит сумма, а вы не помните, откуда она. Не обязательно
            быть идеальным архивариусом — достаточно не выбрасывать PDF.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Налоги и календарь</h2>
          <p className="mt-2">
            Кварталы — авансы, год — налог и декларация. Даты удобно смотреть в{" "}
            <Link href="/sroki/" className="text-blue-600 hover:underline">
              календаре сроков
            </Link>
            , а сколько примерно откладывать — в{" "}
            <Link href="/usn/" className="text-blue-600 hover:underline">
              калькуляторе УСН
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Частая путаница</h2>
          <p className="mt-2">
            Выписали счёт — ещё не доход. На УСН обычно смотрят на оплату (кассовый метод), а не на
            красивый PDF. Исключения бывают, поэтому свой случай лучше один раз уточнить, чем
            править книгу задним числом.
          </p>
        </section>

        <p className="text-sm text-slate-500">
          Взносы «за себя» тоже влияют на картину — их можно прикинуть в{" "}
          <Link href="/vznosy/" className="text-blue-600 hover:underline">
            калькуляторе взносов
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
