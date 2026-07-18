import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Пользовательское соглашение — СчётИП",
  description:
    "Условия использования бесплатных инструментов СчётИП на сайте biznes-ip.ru.",
  alternates: { canonical: "https://biznes-ip.ru/terms/" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Пользовательское соглашение</h1>
      <p className="mt-4 text-slate-600">Дата публикации: 19 июля 2026 г.</p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Общие условия</h2>
          <p className="mt-2">
            Сайт <strong>biznes-ip.ru</strong> (сервис «СчётИП») предоставляет бесплатные
            онлайн-инструменты для индивидуальных предпринимателей. Используя сайт, вы принимаете
            условия этого соглашения и{" "}
            <Link href="/privacy/" className="text-blue-600 hover:underline">
              политики конфиденциальности
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Назначение сервиса</h2>
          <p className="mt-2">
            Сервис помогает составлять типовые документы (счёт, акт, договор) и выполнять расчёты
            (УСН, НДС, сумма прописью). Материалы носят справочный характер и не являются
            юридической, налоговой или бухгалтерской консультацией.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Ответственность пользователя</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Вы самостоятельно проверяете корректность реквизитов, сумм и формулировок.</li>
            <li>Вы несёте ответственность за использование сформированных документов.</li>
            <li>Запрещено использовать сервис для мошенничества и иных незаконных целей.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Ограничение ответственности</h2>
          <p className="mt-2">
            Сервис предоставляется «как есть». Мы не гарантируем бесперебойную работу и не отвечаем
            за убытки, связанные с использованием или невозможностью использования инструментов.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Реклама</h2>
          <p className="mt-2">
            На сайте может размещаться реклама партнёрских сетей, в том числе Рекламной сети Яндекса
            (РСЯ). Реклама не влияет на расчёты и содержимое ваших документов.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Контакты</h2>
          <p className="mt-2">
            По вопросам сервиса:{" "}
            <Link href="/contacts/" className="text-blue-600 hover:underline">
              страница контактов
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
