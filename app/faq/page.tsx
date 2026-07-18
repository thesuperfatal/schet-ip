import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Частые вопросы — СчётИП",
  description:
    "Ответы на частые вопросы о сервисе СчётИП: счета и акты PDF, договор, калькуляторы УСН и НДС, конфиденциальность.",
  alternates: { canonical: "https://biznes-ip.ru/faq/" },
};

const FAQ = [
  {
    q: "Что такое СчётИП?",
    a: "Бесплатный онлайн-портал инструментов для ИП: счёт и акт в PDF, договор оказания услуг, калькуляторы УСН и НДС, сумма прописью. Без регистрации и без лимитов.",
  },
  {
    q: "Нужна ли регистрация?",
    a: "Нет. Все инструменты работают в браузере сразу. Реквизиты можно сохранить локально в браузере (localStorage), чтобы не вводить их каждый раз.",
  },
  {
    q: "Куда сохраняются мои данные и PDF?",
    a: "Документы формируются на вашем устройстве. Мы не храним ваши счета и акты на сервере. Подробнее — в политике конфиденциальности.",
  },
  {
    q: "Документы подходят для реальной работы с клиентами?",
    a: "Шаблоны подходят для типовых ситуаций ИП. Юридическую силу даёт ваше подписание и договорённости сторон. Для сложных сделок лучше уточнить текст у бухгалтера или юриста.",
  },
  {
    q: "Чем счёт отличается от акта?",
    a: "Счёт — просьба оплатить услуги/товары. Акт — подтверждение, что работы или услуги выполнены. Часто выставляют оба документа по одной сделке.",
  },
  {
    q: "Как посчитать налог УСН?",
    a: "Откройте калькулятор УСН: сравните 6% и 15%, учтите взносы и посмотрите, сколько удобно откладывать каждый месяц.",
  },
  {
    q: "Как посчитать НДС для счёта?",
    a: "В калькуляторе НДС можно начислить или выделить налог по ставкам 5%, 7% или 22%, затем перейти к созданию счёта с уже подставленной суммой.",
  },
  {
    q: "Сервис платный?",
    a: "Нет, инструменты бесплатные. Сайт может показывать рекламу партнёрских сетей (например, РСЯ) для поддержки проекта.",
  },
  {
    q: "Я только открыл ИП — с чего начать?",
    a: "Пройдите чек-лист «Открыл ИП»: регистрация, режим УСН, взносы, расчётный счёт, документы и первый цикл с клиентом.",
  },
  {
    q: "Как связаться с автором?",
    a: "Напишите на email со страницы контактов — ответим по работе сервиса, ошибкам и предложениям.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Частые вопросы
      </h1>
      <p className="mt-3 text-slate-600">
        Коротко о том, как устроен СчётИП и чем полезны инструменты для ИП.
      </p>

      <div className="mt-8 space-y-4">
        {FAQ.map((item) => (
          <section
            key={item.q}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{item.q}</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{item.a}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link href="/otkryl-ip/" className="text-blue-600 hover:underline">
          Чек-лист «Открыл ИП»
        </Link>
        <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
          Создать счёт
        </Link>
        <Link href="/dogovor/" className="text-blue-600 hover:underline">
          Договор
        </Link>
        <Link href="/usn/" className="text-blue-600 hover:underline">
          Калькулятор УСН
        </Link>
        <Link href="/contacts/" className="text-blue-600 hover:underline">
          Контакты
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
