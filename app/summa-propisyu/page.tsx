import type { Metadata } from "next";
import Link from "next/link";
import SummaPropisyuTool from "@/components/SummaPropisyuTool";

export const metadata: Metadata = {
  title: "Сумма прописью онлайн — рубли и копейки бесплатно",
  description:
    "Бесплатный перевод суммы в текст прописью: рубли и копейки для договора, счёта и акта. Без регистрации.",
  keywords:
    "сумма прописью, сумма прописью онлайн, рубли прописью, число прописью, сумма прописью калькулятор",
  alternates: { canonical: "https://biznes-ip.ru/summa-propisyu/" },
  openGraph: {
    title: "Сумма прописью онлайн — СчётИП",
    description: "Переведите сумму в рубли прописью для договора, счёта или акта.",
    url: "https://biznes-ip.ru/summa-propisyu/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function SummaPropisyuPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Инструменты для ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Сумма прописью онлайн
        </h1>
        <p className="mt-3 text-slate-600">
          Переведите число в текст: сколько рублей и копеек писать в договоре, счёте или акте.
        </p>
      </div>

      <SummaPropisyuTool />

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Сумма прописью в документах ИП</h2>
        <p>
          Сервис подходит для счетов на оплату, актов выполненных работ и простых договоров. Нужен
          готовый PDF?{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            Создайте счёт
          </Link>{" "}
          — итоговая сумма там тоже выводится прописью автоматически.
        </p>
      </section>
    </div>
  );
}
