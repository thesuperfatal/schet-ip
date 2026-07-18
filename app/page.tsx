import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Бесплатно · Без регистрации · PDF за 2 минуты
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Счёт и акт для ИП — онлайн
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Заполните реквизиты, добавьте услуги и скачайте готовый PDF.
          Реквизиты сохраняются в браузере — в следующий раз быстрее.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/create/?type=schet"
            className="w-full rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 sm:w-auto"
          >
            Создать счёт
          </Link>
          <Link
            href="/create/?type=akt"
            className="w-full rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-800 hover:bg-slate-50 sm:w-auto"
          >
            Создать акт
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">3 документа бесплатно в месяц</p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 sm:grid-cols-3">
        {[
          {
            title: "Быстро",
            text: "Не нужен Word и Excel — всё в браузере, результат сразу в PDF.",
          },
          {
            title: "Для ИП",
            text: "Реквизиты ИП, покупатель, позиции, сумма прописью — как в настоящем документе.",
          },
          {
            title: "Бесплатно",
            text: "Первые 3 документа в месяц без оплаты и без регистрации.",
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
