import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Назначение платежа по счёту: что писать ИП",
  description:
    "Что писать в назначении платежа при оплате по счёту ИП: готовые формулировки, номер, дата, НДС. Как скопировать текст для банка.",
  keywords:
    "назначение платежа по счёту, что писать в назначении платежа, оплата по счёту ИП, формулировка для банка",
  alternates: { canonical: "https://biznes-ip.ru/articles/naznachenie-platezha/" },
  openGraph: {
    title: "Назначение платежа по счёту: что писать",
    description: "Готовые фразы для банка: номер счёта, дата, сумма и НДС.",
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
        Назначение платежа по счёту: что писать ИП
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        В банке нужно коротко и понятно объяснить, за что платёж. Ниже — рабочие формулировки,
        которые принимают большинство бухгалтерий.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Зачем это нужно</h2>
          <p className="mt-2">
            Назначение платежа помогает связать перевод со счётом: номер, дата, сумма. Если
            формулировка пустая («оплата» или «за услуги»), у клиента или у банка чаще возникают
            вопросы.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Базовая формулировка</h2>
          <p className="mt-2">Самый простой и надёжный вариант:</p>
          <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900">
            Оплата по счёту №12 от 19.07.2026 на сумму 15 000,00 руб. Без НДС.
          </p>
          <p className="mt-3">
            Подставьте свой номер, дату и сумму. Если в счёте указан НДС — напишите ставку или
            фразу из счёта (например «В т.ч. НДС 22%: …»).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что обязательно указать</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>номер счёта;</li>
            <li>дату счёта;</li>
            <li>сумму (желательно);</li>
            <li>про НДС: «Без НДС» или сумму/ставку налога.</li>
          </ul>
          <p className="mt-3">
            Название услуги можно добавить коротко, если место позволяет: «за консультационные
            услуги». Главное — не раздувать текст до лимита банка.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Если платят по акту</h2>
          <p className="mt-2">
            Иногда клиент платит уже после работ. Тогда логично писать: «Оплата по акту №… от …».
            Если был и счёт, и акт — можно указать оба или тот документ, на который ссылается
            договор.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Готовый текст в СчётИП</h2>
          <p className="mt-2">
            В{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              генераторе счетов
            </Link>{" "}
            назначение платежа собирается автоматически по номеру, дате и сумме. Нажмите
            «Скопировать» и вставьте в банк или отправьте клиенту.
          </p>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Сделать счёт и скопировать назначение</p>
          <p className="mt-2 text-sm">
            Откройте{" "}
            <Link href="/create/?type=schet" className="font-medium text-blue-700 hover:underline">
              создание счёта
            </Link>
            , заполните поля — текст для банка появится под итогом. Бесплатно, без регистрации.
          </p>
        </div>
      </div>
    </article>
  );
}
