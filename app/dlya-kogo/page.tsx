import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Для кого СчётИП — фрилансеры, услуги, торговля, новички",
  description:
    "Кому подойдёт СчётИП: фрилансерам, ИП на услугах, торговле и тем, кто только открыл ИП. Готовые сценарии со ссылками на инструменты.",
  keywords:
    "инструменты для ИП, счёт для фрилансера, документы для ИП услуги, с чего начать ИП",
  alternates: { canonical: "https://biznes-ip.ru/dlya-kogo/" },
  openGraph: {
    title: "Для кого СчётИП",
    description: "Три сценария: услуги, товар, только открыл ИП.",
    url: "https://biznes-ip.ru/dlya-kogo/",
    locale: "ru_RU",
    type: "website",
  },
};

const SCENARIOS = [
  {
    id: "services",
    title: "Услуги и фриланс",
    blurb: "Дизайн, разработка, консультации, маркетинг — без склада и накладных.",
    steps: [
      { href: "/kp/", label: "КП", hint: "Отправить цены клиенту" },
      { href: "/dogovor/", label: "Договор", hint: "Зафиксировать условия" },
      { href: "/create/?type=schet", label: "Счёт", hint: "Получить оплату" },
      { href: "/rekvizity/", label: "Реквизиты", hint: "Карточка для перевода" },
      { href: "/create/?type=akt", label: "Акт", hint: "Закрыть работы" },
    ],
    extras: [
      { href: "/summa-propisyu/", label: "Сумма прописью" },
      { href: "/doverennost/", label: "Доверенность" },
      { href: "/articles/zakryvayushchie-dokumenty/", label: "Закрывающие документы" },
    ],
  },
  {
    id: "trade",
    title: "Товар и отгрузка",
    blurb: "Продажа товара, доставка, когда клиент просит накладную или УПД.",
    steps: [
      { href: "/create/?type=schet", label: "Счёт", hint: "Выставить оплату" },
      { href: "/nakladnaya/", label: "Накладная / УПД", hint: "Оформить отгрузку" },
      { href: "/create/?type=akt", label: "Акт", hint: "Если есть услуги" },
    ],
    extras: [
      { href: "/articles/chto-takoe-upd/", label: "Что такое УПД" },
      { href: "/nds/", label: "Калькулятор НДС" },
      { href: "/pretenziya/", label: "Претензия при просрочке" },
    ],
  },
  {
    id: "newbie",
    title: "Только открыл ИП",
    blurb: "Ещё не ясно, с чего начать: налоги, взносы, первый счёт.",
    steps: [
      { href: "/otkryl-ip/", label: "Чек-лист", hint: "Пошаговый список дел" },
      { href: "/patent-usn/", label: "Патент или УСН", hint: "Сравнить режимы" },
      { href: "/usn/", label: "Калькулятор УСН", hint: "Сколько откладывать" },
      { href: "/vznosy/", label: "Взносы", hint: "Фикс + 1%" },
      { href: "/sroki/", label: "Календарь", hint: "Когда платить" },
      { href: "/create/?type=schet", label: "Первый счёт", hint: "PDF за пару минут" },
    ],
    extras: [
      { href: "/articles/patent-ili-usn/", label: "Статья: патент или УСН" },
      { href: "/articles/kudir-dlya-ip/", label: "Статья: КУДиР" },
      { href: "/faq/", label: "FAQ" },
    ],
  },
] as const;

export default function DlyaKogoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">СчётИП</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Для кого этот сайт
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        Выберите свой сценарий — откроются нужные инструменты по порядку. Всё бесплатно, без
        регистрации.
      </p>

      <div className="mt-10 space-y-8">
        {SCENARIOS.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{s.blurb}</p>

            <ol className="mt-5 space-y-2">
              {s.steps.map((step, i) => (
                <li key={step.href}>
                  <Link
                    href={step.href}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:border-blue-300"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-medium text-blue-700">{step.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{step.hint}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            {s.extras.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {s.extras.map((e) => (
                  <Link
                    key={e.href}
                    href={e.href}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-blue-300 hover:text-blue-700"
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-slate-600">
        Полный список:{" "}
        <Link href="/tools/" className="text-blue-600 hover:underline">
          все инструменты
        </Link>
        . О проекте:{" "}
        <Link href="/about/" className="text-blue-600 hover:underline">
          кто мы и зачем сайт
        </Link>
        .
      </p>
    </div>
  );
}
