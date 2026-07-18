import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Инструменты для ИП: счёт, акт, калькуляторы УСН и НДС",
  description:
    "Бесплатный портал для ИП: счёт и акт в PDF, калькулятор УСН 6%/15%, калькулятор НДС 5%/7%/22%. Без регистрации.",
  alternates: { canonical: "https://biznes-ip.ru/" },
};

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Бесплатно · Без регистрации · Для ИП
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Инструменты для ИП онлайн
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Счета и акты в PDF, калькуляторы УСН и НДС — посчитайте налоги и оформите документ за
          несколько минут.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create/?type=schet"
            className="w-full rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 sm:w-auto"
          >
            Создать счёт
          </Link>
          <Link
            href="/nds/"
            className="w-full rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-800 hover:bg-slate-50 sm:w-auto"
          >
            Калькулятор НДС
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">Полностью бесплатно · без лимитов</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Что умеет сайт</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/create/?type=schet",
              title: "Счёт на оплату",
              text: "PDF за пару минут. Реквизиты сохраняются в браузере.",
            },
            {
              href: "/create/?type=akt",
              title: "Акт выполненных работ",
              text: "Тот же удобный формат, что и счёт.",
            },
            {
              href: "/usn/",
              title: "Калькулятор УСН",
              text: "6% и 15%, взносы, сравнение, «откладывай в месяц».",
            },
            {
              href: "/nds/",
              title: "Калькулятор НДС",
              text: "Начислить и выделить НДС, ставки 5%/7%/22%, подсказка для УСН.",
            },
            {
              href: "/summa-propisyu/",
              title: "Сумма прописью",
              text: "Перевод суммы в текст для договора, счёта и акта.",
            },
          ].map((item) => (
            <Link
              key={item.href + item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Для кого этот сервис</h2>
        <p className="mt-3">
          СчётИП — бесплатный набор онлайн-инструментов для индивидуальных предпринимателей:
          выставить счёт на оплату, подготовить акт, посчитать налог УСН и НДС. Всё работает в
          браузере, без регистрации и без отправки документов на сервер.{" "}
          <Link href="/about/" className="text-blue-600 hover:underline">
            Подробнее о проекте
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">Статьи</h2>
          <Link href="/articles/" className="text-sm text-blue-600 hover:underline">
            Все статьи
          </Link>
        </div>
        <ul className="space-y-3">
          <li>
            <Link
              href="/articles/usn-6-ili-15/"
              className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:border-blue-300"
            >
              УСН 6% или 15%: что выгоднее ИП
            </Link>
          </li>
          <li>
            <Link
              href="/articles/nds-na-usn-2026/"
              className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:border-blue-300"
            >
              НДС на УСН в 2026 году
            </Link>
          </li>
        </ul>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 sm:grid-cols-3">
        {[
          {
            title: "Быстро",
            text: "Не нужен Word и Excel — всё в браузере.",
          },
          {
            title: "Для ИП",
            text: "Документы и налоги в одном месте — без регистрации.",
          },
          {
            title: "Бесплатно",
            text: "Без оплаты и без лимита на количество документов.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
