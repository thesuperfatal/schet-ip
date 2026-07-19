import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как выставить счёт ИП клиенту",
  description:
    "Клиент просит счёт — что туда писать, куда смотреть реквизиты и как не запутаться с НДС. Без лекций, по делу.",
  keywords: "как выставить счёт ИП, счёт на оплату онлайн, реквизиты в счёте, счёт PDF",
  alternates: { canonical: "https://biznes-ip.ru/articles/kak-vystavit-schet/" },
  openGraph: {
    title: "Как выставить счёт ИП клиенту",
    description: "Реквизиты, сумма, НДС и PDF — без Word и лишней теории.",
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
        Как выставить счёт ИП клиенту
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Знакомая ситуация: работа сделана или вот-вот начнётся, а клиент пишет — «скиньте счёт».
        Не обязательно лезть в 1С или ковырять старый Word. Достаточно нормального PDF с вашими
        реквизитами и понятной суммой.
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Сначала соберите «куда платить»</h2>
          <p className="mt-2">
            В счёте ждут не поэзию, а железо: ФИО или название ИП, ИНН, адрес, банк, БИК, расчётный
            и корр. счёт. Обычно всё это лежит в договоре с банком или в личном кабинете — раз
            скопировали, дальше живёт у вас в браузере, если пользуетесь{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              формой на СчётИП
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Кому и за что</h2>
          <p className="mt-2">
            Укажите покупателя так, как он сам себя пишет в договорах. А в позиции — человеческим
            языком: не «услуги по договору», а «дизайн лендинга» или «сопровождение сайта, июль».
            Бухгалтерия клиента потом меньше звонит уточнять.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">НДС — не забудьте строку</h2>
          <p className="mt-2">
            Работаете без НДС — так и напишите: «Без НДС». Появилась ставка (5%, 7%, 22% — смотря
            по вашей ситуации) — сначала посчитайте цифру, потом вставьте фразу в счёт. Для этого
            есть{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              калькулятор НДС
            </Link>
            : на выходе и сумма, и готовая формулировка.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Отправили — и номер не теряйте</h2>
          <p className="mt-2">
            PDF ушёл в почту или Telegram — отлично. Номер и дату лучше вести подряд: потом, когда
            клиент спросит «а где счёт за май», вы не будете рыться по папкам «финал_финал2».
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">После оплаты — акт</h2>
          <p className="mt-2">
            Счёт просит деньги. Акт говорит: работа принята. Их часто делают парой — подробнее в{" "}
            <Link href="/articles/schet-i-akt/" className="text-blue-600 hover:underline">
              заметке про счёт и акт
            </Link>
            .
          </p>
        </section>

        <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
          Если нужно прямо сейчас:{" "}
          <Link href="/create/?type=schet" className="font-medium text-blue-700 hover:underline">
            откройте форму счёта
          </Link>
          , заполните поля, гляньте предпросмотр и скачайте PDF. Можно даже подставить пример и
          потом поменять на свои данные.
        </p>
      </div>
    </article>
  );
}
