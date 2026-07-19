import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как заполнить акт выполненных работ ИП",
  description:
    "Что писать в акте, чтобы его приняли: стороны, услуги нормальным языком, сумма, НДС и подписи.",
  keywords:
    "как заполнить акт выполненных работ, акт оказанных услуг ИП, акт выполненных работ образец",
  alternates: { canonical: "https://biznes-ip.ru/articles/kak-zapolnit-akt/" },
  openGraph: {
    title: "Как заполнить акт выполненных работ",
    description: "Без нумерации «как в методичке» — что реально спрашивают.",
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
        Как заполнить акт выполненных работ
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Акт — это «мы сошлись, что работа сделана». Его просят в конце месяца, после оплаты или
        когда бухгалтерия клиента закрывает период. Ниже — что туда кладут, чтобы не гоняли на
        правки.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Кто кому</h2>
          <p className="mt-2">
            Вы — исполнитель: ФИО/название, ИНН, адрес. Клиент — заказчик с теми же полями. Если
            уже был счёт или договор, копируйте реквизиты один в один. Расхождения в ИНН —
            классика возвратов документа.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Номер и дата</h2>
          <p className="mt-2">
            Номер ведите как у счетов — по порядку, без магии. Дата — когда работы приняли или
            когда подписали, как договорились. Не обязательно ставить «вчера», если по факту
            сдавали сегодня.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что именно сделали</h2>
          <p className="mt-2">
            Название, единица, количество, цена, сумма. Пишите так, чтобы человек со стороны понял:
            не «работы по ТЗ», а «вёрстка главной страницы» или «консультация 4 часа». Внутренний
            сленг оставляйте в чате, не в акте.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Итого и НДС</h2>
          <p className="mt-2">
            Сумма внизу и честная пометка: «Без НДС» или сколько налога. Если ставка нужна —
            сначала{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              посчитайте
            </Link>
            , потом вставляйте.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Подписи</h2>
          <p className="mt-2">
            Обе стороны. Если от вашего имени подписывает кто-то другой — чаще нужна{" "}
            <Link href="/doverennost/" className="text-blue-600 hover:underline">
              доверенность
            </Link>
            , иначе клиент может завернуть.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Счёт уже был?</h2>
          <p className="mt-2">
            Нормальная связка: сначала счёт, потом акт. Зачем оба — в{" "}
            <Link href="/articles/schet-i-akt/" className="text-blue-600 hover:underline">
              заметке про счёт и акт
            </Link>
            . На СчётИП данные со счёта можно перекинуть в акт, чтобы не набирать дважды —{" "}
            <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
              форма акта
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
