import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Назначение платежа по счёту: что писать",
  description:
    "Что вписать в банк, чтобы платёж не потерялся: номер счёта, дата, сумма и НДС. Готовая фраза и где её взять автоматически.",
  keywords:
    "назначение платежа по счёту, что писать в назначении платежа, оплата по счёту ИП, формулировка для банка",
  alternates: { canonical: "https://biznes-ip.ru/articles/naznachenie-platezha/" },
  openGraph: {
    title: "Назначение платежа по счёту: что писать",
    description: "Рабочая фраза для банка — без «оплата за услуги» на удачу.",
    url: "https://biznes-ip.ru/articles/naznachenie-platezha/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function NaznacheniePlatezhaArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Назначение платежа по счёту: что писать
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Поле в банке маленькое, а вопросов потом много. Написали «оплата» — и через неделю не
        поймёте, за какой счёт пришли деньги. Бухгалтерия клиента тоже любит конкретику.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Зачем мучиться</h2>
          <p className="mt-2">
            Назначение — это якорь: номер счёта, дата, сумма. По нему сходятся платёжка, ваша
            выписка и закрывающие документы. Пустая формулировка экономит пять секунд сейчас и
            отнимает полчаса потом.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Формула, которая почти всегда заходит</h2>
          <p className="mt-2">Я обычно шлю клиенту что-то вроде:</p>
          <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900">
            Оплата по счёту №12 от 19.07.2026 на сумму 15 000,00 руб. Без НДС.
          </p>
          <p className="mt-3">
            Подставьте свои цифры. Если в счёте есть НДС — не выдумывайте новое, берите ту же
            фразу, что уже стоит в документе («В т.ч. НДС …»).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Минимум, без которого лучше не слать</h2>
          <p className="mt-2">
            Номер счёта, дата, сумма, и про НДС — «без» или сколько. Название услуги можно
            втиснуть коротко, если банк не режет длинный текст. Длинные романы в назначении банки
            не любят.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Платят уже по акту?</h2>
          <p className="mt-2">
            Тогда логичнее: «Оплата по акту №… от …». Был и счёт, и акт — смотрите, на что
            ссылается договор, или укажите оба, если места хватает.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Чтобы не набирать руками</h2>
          <p className="mt-2">
            В{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              форме счёта
            </Link>{" "}
            текст назначения собирается сам из номера, даты и суммы — кнопка «Скопировать» рядом.
            Если клиенту нужны только реквизиты без позиций, есть{" "}
            <Link href="/rekvizity/" className="text-blue-600 hover:underline">
              карточка реквизитов
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
