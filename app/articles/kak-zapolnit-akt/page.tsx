import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как заполнить акт выполненных работ ИП",
  description:
    "Как ИП заполнить акт выполненных работ: стороны, услуги, сумма, НДС, дата. Пошагово и со ссылкой на генератор PDF.",
  keywords:
    "как заполнить акт выполненных работ, акт оказанных услуг ИП, акт выполненных работ образец",
  alternates: { canonical: "https://biznes-ip.ru/articles/kak-zapolnit-akt/" },
  openGraph: {
    title: "Как заполнить акт выполненных работ",
    description: "Пошагово: стороны, позиции, сумма и PDF без Word.",
    url: "https://biznes-ip.ru/articles/kak-zapolnit-akt/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function KakZapolnitAktArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Как заполнить акт выполненных работ ИП
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Акт подтверждает, что услуга оказана. Его обычно просят после оплаты или вместе с закрытием
        месяца. Ниже — что указать, чтобы документ приняли.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Стороны</h2>
          <p className="mt-2">
            Исполнитель — вы (ИП): ФИО/название, ИНН, адрес. Заказчик — клиент с теми же полями.
            Лучше совпадать со счётом и договором, если они уже были.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Номер и дата</h2>
          <p className="mt-2">
            Номер удобно вести по порядку (как у счетов). Дата — день, когда работы фактически
            приняты, или дата подписания по согласованию сторон.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Что сделано</h2>
          <p className="mt-2">
            Перечислите услуги: наименование, единица, количество, цена, сумма. Формулировки должны
            быть понятны бухгалтерии клиента — без внутренних жаргонизмов.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Итого и НДС</h2>
          <p className="mt-2">
            Укажите итоговую сумму и пометку про НДС («Без НДС» или сумма налога). Если ставка
            нужна — сначала посчитайте в{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              калькуляторе НДС
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Подписи</h2>
          <p className="mt-2">
            Обе стороны подписывают акт. Если подписывает не сам ИП — может понадобиться{" "}
            <Link href="/doverennost/" className="text-blue-600 hover:underline">
              доверенность
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Связка со счётом</h2>
          <p className="mt-2">
            Часто сначала выставляют счёт, потом акт. Чем отличаются документы — в статье{" "}
            <Link href="/articles/schet-i-akt/" className="text-blue-600 hover:underline">
              «Счёт и акт»
            </Link>
            . В СчётИП данные со счёта можно перенести в акт одной кнопкой.
          </p>
        </section>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="font-medium text-slate-900">Сделать акт за пару минут</p>
          <p className="mt-2 text-sm">
            Откройте{" "}
            <Link href="/create/?type=akt" className="font-medium text-blue-700 hover:underline">
              генератор акта СчётИП
            </Link>
            : заполните поля и скачайте PDF. Бесплатно, без регистрации.
          </p>
        </div>
      </div>
    </article>
  );
}
