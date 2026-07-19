import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "НДС на УСН в 2026 году: что важно знать ИП",
  description:
    "Когда на упрощёнке вдруг появляется НДС, зачем ставки 5% и 7%, и что писать в счёте клиенту.",
  keywords: "НДС на УСН 2026, НДС 5%, НДС 7%, НДС для ИП на упрощенке, калькулятор НДС",
  alternates: { canonical: "https://biznes-ip.ru/articles/nds-na-usn-2026/" },
  openGraph: {
    title: "НДС на УСН в 2026 году",
    description: "Пороги, спецставки и фраза для счёта — без паники.",
    url: "https://biznes-ip.ru/articles/nds-na-usn-2026/",
    locale: "ru_RU",
    type: "article",
  },
};

export default function NdsUsnArticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>{" "}
        · 19 июля 2026
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        НДС на УСН в 2026 году: что важно знать ИП
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Раньше многие на упрощёнке жили с мыслью «НДС — это не про меня». В 2026 тема стала ближе:
        доход вырос — и вот уже в счёте нужна не только строка «Без НДС».
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Откуда вообще берётся НДС на УСН</h2>
          <p className="mt-2">
            Грубо говоря, когда доходы переваливают за порог порядка{" "}
            <strong>20 млн ₽</strong> (цифру всегда сверяйте под свой период — лимиты живут своей
            жизнью), упрощенец может оказаться в зоне НДС. Это не «наказание», а другой режим
            работы со счетами и отчётностью. Точные условия лучше один раз проговорить с
            бухгалтером, чем ловить сюрприз в декларации.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Пять и семь процентов — не страшилки</h2>
          <p className="mt-2">
            Для части УСН-щиков как раз и придумали спецставки <strong>5%</strong> и{" "}
            <strong>7%</strong>. Часто без привычных вычетов «как на общей системе». Рядом по-прежнему
            существует общая картина со ставками вроде <strong>22%</strong> и 10% на отдельные
            операции. Какая ваша — зависит от дохода и того, как вы встали на учёт по НДС.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что видит клиент в счёте</h2>
          <p className="mt-2">
            Нет НДС — пишете честно: «Без НДС». Есть — не стесняйтесь ясной фразы: «В том числе НДС
            …% — … ₽». Клиенту всё равно, как вы это считали внутри; ему важно понять итоговую сумму
            к оплате.
          </p>
          <p className="mt-2">
            Чтобы не считать на салфетке, откройте{" "}
            <Link href="/nds/" className="text-blue-600 hover:underline">
              калькулятор НДС
            </Link>
            : можно начислить или выделить налог и сразу забрать текст для счёта. Сам налог УСН —
            рядом, в{" "}
            <Link href="/usn/" className="text-blue-600 hover:underline">
              калькуляторе УСН
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Рабочий порядок на неделю</h2>
          <p className="mt-2">
            Прикинули годовой доход → поняли, нужна ли ставка → посчитали сумму для клиента →
            выставили{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              счёт
            </Link>{" "}
            с правильной строкой про НДС. Всё. Остальное — уже про отчётность и сроки, не про
            «красивый PDF».
          </p>
        </section>

        <p className="text-sm text-slate-500">
          Текст справочный. Перед сменой ставки и декларацией сверьтесь с НК / ФНС или с тем, кто
          сдаёт за вас отчёты.
        </p>
      </div>
    </article>
  );
}
