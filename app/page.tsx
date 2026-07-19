import type { Metadata } from "next";
import Link from "next/link";
import { TOOL_CATEGORIES, toolsByCategory, type ToolCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Инструменты для ИП: счёт, акт, договор, калькуляторы УСН и НДС",
  description:
    "Бесплатный портал для ИП: счёт, акт и договор в PDF, калькулятор УСН 6%/15%, калькулятор НДС 5%/7%/22%. Без регистрации.",
  alternates: { canonical: "https://biznes-ip.ru/" },
};

const CATEGORY_ORDER: ToolCategory[] = ["documents", "calculators", "guides"];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Бесплатно · Без регистрации · Для ИП
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Счета, налоги и документы — просто
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Выберите инструмент ниже: заполните поля и скачайте PDF или сразу увидите расчёт. Ничего
          отправлять на сервер не нужно.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create/?type=schet"
            className="w-full rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 sm:w-auto"
          >
            Создать счёт
          </Link>
          <Link
            href="/otkryl-ip/"
            className="w-full rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-800 hover:bg-slate-50 sm:w-auto"
          >
            Я только открыл ИП
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Не знаете, что выбрать? Смотрите{" "}
          <Link href="/faq/" className="text-blue-600 hover:underline">
            частые вопросы
          </Link>
          . Наведите на пункты меню сверху — там короткие подсказки.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Как это работает</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Откройте инструмент",
              text: "Счёт, акт, калькулятор — из меню или с этой страницы.",
            },
            {
              step: "2",
              title: "Заполните поля",
              text: "Непонятное поле — нажмите «?» рядом с названием.",
            },
            {
              step: "3",
              title: "Скачайте или посчитайте",
              text: "PDF на вашем устройстве. Расчёты — сразу на экране.",
            },
          ].map((item) => (
            <li
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
            >
              <p className="text-sm font-semibold text-blue-600">Шаг {item.step}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {CATEGORY_ORDER.map((category) => {
        const meta = TOOL_CATEGORIES[category];
        const tools = toolsByCategory(category);
        return (
          <section key={category} className="mx-auto max-w-5xl px-4 pb-12">
            <div className="mb-4 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900">{meta.title}</h2>
              <p className="mt-1 text-slate-600">{meta.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((item) => (
                <Link
                  key={item.href + item.title}
                  href={item.href}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.short}</p>
                  <p className="mt-3 text-sm font-medium text-blue-600">Открыть →</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-3xl px-4 pb-12 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Для кого этот сервис</h2>
        <p className="mt-3">
          СчётИП — для индивидуальных предпринимателей, которым нужно быстро выставить счёт,
          оформить акт или прикинуть налоги. Без бухгалтера «на каждый клик» и без регистрации.{" "}
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
          {[
            ["/articles/kak-vystavit-schet/", "Как выставить счёт ИП клиенту"],
            ["/articles/schet-i-akt/", "Счёт и акт: чем отличаются"],
            ["/articles/usn-6-ili-15/", "УСН 6% или 15%: что выгоднее ИП"],
            ["/articles/nds-na-usn-2026/", "НДС на УСН в 2026 году"],
          ].map(([href, title]) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:border-blue-300"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 sm:grid-cols-3">
        {[
          { title: "Понятно", text: "Подсказки в меню и у полей — без лишней теории." },
          { title: "В браузере", text: "Не нужен Word и Excel. PDF скачивается сразу." },
          { title: "Бесплатно", text: "Без оплаты и без лимита на документы." },
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
