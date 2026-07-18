import type { Metadata } from "next";
import Link from "next/link";
import NakladnayaPageClient from "@/components/NakladnayaPageClient";

export const metadata: Metadata = {
  title: "Товарная накладная и УПД онлайн — PDF бесплатно",
  description:
    "Бесплатный генератор товарной накладной и УПД для ИП: заполните стороны и товары — скачайте PDF. Без регистрации.",
  keywords:
    "товарная накладная онлайн, УПД онлайн, накладная PDF, универсальный передаточный документ, ТОРГ-12",
  alternates: { canonical: "https://biznes-ip.ru/nakladnaya/" },
  openGraph: {
    title: "Товарная накладная / УПД — PDF онлайн | СчётИП",
    description: "Составьте накладную или УПД и скачайте PDF бесплатно.",
    url: "https://biznes-ip.ru/nakladnaya/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function NakladnayaPage() {
  return (
    <div>
      <NakladnayaPageClient />

      <section className="mx-auto max-w-3xl px-4 pb-16 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Накладная и УПД для ИП</h2>
        <p className="mt-3">
          Товарная накладная фиксирует передачу товара. УПД (универсальный передаточный документ)
          объединяет сведения о передаче и расчётах в одном шаблоне. Перед оплатой удобно{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            выставить счёт
          </Link>
          , а для услуг —{" "}
          <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
            акт
          </Link>{" "}
          или{" "}
          <Link href="/dogovor/" className="text-blue-600 hover:underline">
            договор
          </Link>
          .
        </p>
        <p className="mt-3 text-slate-500">
          Это упрощённые шаблоны для повседневной работы ИП. Если нужен строго формализованный
          документ по утверждённой форме — согласуйте с бухгалтером.
        </p>
      </section>
    </div>
  );
}
