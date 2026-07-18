import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О проекте СчётИП — бесплатные инструменты для ИП",
  description:
    "О проекте СчётИП (biznes-ip.ru): бесплатные онлайн-инструменты для ИП — счета, акты, калькуляторы УСН и НДС. Без регистрации.",
  alternates: { canonical: "https://biznes-ip.ru/about/" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">О проекте</h1>
      <p className="mt-4 text-lg text-slate-600">
        <strong>СчётИП</strong> — бесплатный портал онлайн-инструментов для индивидуальных
        предпринимателей. Сайт:{" "}
        <a href="https://biznes-ip.ru" className="text-blue-600 hover:underline">
          biznes-ip.ru
        </a>
        .
      </p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Зачем мы сделали сервис</h2>
          <p className="mt-2">
            ИП часто нужно быстро выставить счёт, оформить акт или прикинуть налоги — без сложных
            бухгалтерских программ и регистрации. СчётИП решает эти задачи в браузере: бесплатно и
            без лимитов.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Что уже есть</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
                Счёт на оплату
              </Link>{" "}
              и{" "}
              <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
                акт
              </Link>{" "}
              в PDF
            </li>
            <li>
              <Link href="/dogovor/" className="text-blue-600 hover:underline">
                Договор оказания услуг
              </Link>{" "}
              в PDF
            </li>
            <li>
              <Link href="/nakladnaya/" className="text-blue-600 hover:underline">
                Товарная накладная / УПД
              </Link>{" "}
              в PDF
            </li>
            <li>
              <Link href="/kp/" className="text-blue-600 hover:underline">
                Коммерческое предложение
              </Link>{" "}
              в PDF
            </li>
            <li>
              <Link href="/usn/" className="text-blue-600 hover:underline">
                Калькулятор УСН
              </Link>
            </li>
            <li>
              <Link href="/vznosy/" className="text-blue-600 hover:underline">
                Калькулятор страховых взносов ИП
              </Link>
            </li>
            <li>
              <Link href="/srok-oplaty/" className="text-blue-600 hover:underline">
                Срок оплаты и пени
              </Link>
            </li>
            <li>
              <Link href="/nds/" className="text-blue-600 hover:underline">
                Калькулятор НДС
              </Link>
            </li>
            <li>
              <Link href="/summa-propisyu/" className="text-blue-600 hover:underline">
                Сумма прописью
              </Link>
            </li>
            <li>
              <Link href="/articles/" className="text-blue-600 hover:underline">
                Статьи для ИП
              </Link>
            </li>
            <li>
              <Link href="/faq/" className="text-blue-600 hover:underline">
                Частые вопросы (FAQ)
              </Link>
            </li>
            <li>
              <Link href="/otkryl-ip/" className="text-blue-600 hover:underline">
                Чек-лист «Открыл ИП»
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Как обрабатываются данные</h2>
          <p className="mt-2">
            Документы формируются на вашем устройстве. Реквизиты могут сохраняться в localStorage
            браузера. Мы не требуем аккаунт и не храним ваши PDF на сервере. Подробнее — в{" "}
            <Link href="/privacy/" className="text-blue-600 hover:underline">
              политике конфиденциальности
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Связь</h2>
          <p className="mt-2">
            Вопросы и предложения:{" "}
            <Link href="/contacts/" className="text-blue-600 hover:underline">
              страница контактов
            </Link>
            .
          </p>
        </section>

        <p className="text-sm text-slate-500">
          Материалы и калькуляторы носят справочный характер и не заменяют консультацию бухгалтера
          или юриста.
        </p>
      </div>
    </article>
  );
}
