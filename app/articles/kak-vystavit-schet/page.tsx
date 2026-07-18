import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как выставить счёт ИП клиенту: пошагово",
  description:
    "Как ИП выставить счёт на оплату клиенту: какие реквизиты указать, что писать про НДС, как отправить PDF и когда нужен акт.",
  keywords: "как выставить счёт ИП, счёт на оплату онлайн, реквизиты в счёте, счёт PDF",
  alternates: { canonical: "https://biznes-ip.ru/articles/kak-vystavit-schet/" },
  openGraph: {
    title: "Как выставить счёт ИП клиенту",
    description: "Пошаговая инструкция: реквизиты, сумма, НДС и PDF без Word.",
    url: "https://biznes-ip.ru/articles/kak-vystavit-schet/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function KakVystavitSchetArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Как выставить счёт ИП клиенту: пошагово
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Чтобы получить оплату, клиенту нужен понятный счёт с вашими реквизитами и суммой. Ниже —
        простой порядок без сложных программ.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Подготовьте реквизиты</h2>
          <p className="mt-2">
            Нужны ФИО / название ИП, ИНН, адрес, банк, БИК, расчётный и корреспондентский счета.
            Эти данные обычно есть в договоре с банком или в личном кабинете.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Укажите покупателя и услугу</h2>
          <p className="mt-2">
            Напишите, кому выставляете счёт, и что именно оплачивается: наименование, количество,
            цену. Чем понятнее формулировка, тем меньше вопросов у бухгалтерии клиента.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Проверьте НДС</h2>
          <p className="mt-2">
            Если вы без НДС — так и напишите: «Без НДС». Если ставка есть (например 5%, 7% или
            22%), посчитайте сумму заранее. Удобно сделать это в{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              калькуляторе НДС
            </Link>{" "}
            и сразу перейти к созданию счёта.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Сформируйте PDF и отправьте</h2>
          <p className="mt-2">
            Скачайте счёт в PDF и отправьте клиенту по email или мессенджеру. Номер и дату лучше
            вести последовательно — так проще искать документы потом.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Закройте сделку актом</h2>
          <p className="mt-2">
            После выполнения работ оформите акт. Подробнее — в статье{" "}
            <Link href="/articles/schet-i-akt/" className="text-blue-600 hover:underline">
              «Счёт и акт: чем отличаются»
            </Link>
            .
          </p>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Сделать счёт за пару минут</p>
          <p className="mt-2 text-sm">
            Откройте{" "}
            <Link href="/create/?type=schet" className="font-medium text-blue-700 hover:underline">
              генератор счетов СчётИП
            </Link>
            : заполните поля, посмотрите предпросмотр и скачайте PDF. Бесплатно, без регистрации.
          </p>
        </div>
      </div>
    </article>
  );
}
