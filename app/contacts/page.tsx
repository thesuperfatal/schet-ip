import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты — СчётИП",
  description: "Контакты проекта СчётИП (biznes-ip.ru) — инструменты для ИП.",
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Контакты</h1>
      <p className="mt-4 text-lg text-slate-600">
        Сервис <strong>СчётИП</strong> — бесплатные онлайн-инструменты для индивидуальных
        предпринимателей: счета, акты, калькуляторы.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-700">
          <span className="font-medium text-slate-900">Сайт:</span>{" "}
          <a href="https://biznes-ip.ru" className="text-blue-600 hover:underline">
            https://biznes-ip.ru
          </a>
        </p>
        <p className="text-slate-700">
          <span className="font-medium text-slate-900">Email:</span>{" "}
          <a href="mailto:Tismojesh@yandex.ru" className="text-blue-600 hover:underline">
            Tismojesh@yandex.ru
          </a>
        </p>
        <p className="text-sm text-slate-500">
          По вопросам работы сервиса, ошибок и предложений — напишите на почту. Отвечаем в разумные
          сроки.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
        <Link href="/about/" className="text-blue-600 hover:underline">
          О проекте
        </Link>
        <Link href="/privacy/" className="text-blue-600 hover:underline">
          Политика конфиденциальности
        </Link>
        <Link href="/articles/" className="text-blue-600 hover:underline">
          Статьи
        </Link>
      </div>
    </div>
  );
}
