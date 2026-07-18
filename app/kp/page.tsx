import type { Metadata } from "next";
import Link from "next/link";
import KpPageClient from "@/components/KpPageClient";

export const metadata: Metadata = {
  title: "Коммерческое предложение онлайн — КП в PDF бесплатно",
  description:
    "Бесплатный генератор коммерческого предложения для ИП: позиции, сумма прописью, срок действия — скачайте КП в PDF. Без регистрации.",
  keywords:
    "коммерческое предложение онлайн, КП PDF, сделать КП, шаблон коммерческого предложения, КП для ИП",
  alternates: { canonical: "https://biznes-ip.ru/kp/" },
  openGraph: {
    title: "Коммерческое предложение — PDF онлайн | СчётИП",
    description: "Составьте КП и скачайте PDF бесплатно.",
    url: "https://biznes-ip.ru/kp/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function KpPage() {
  return (
    <div>
      <KpPageClient />

      <section className="mx-auto max-w-3xl px-4 pb-16 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">КП для ИП</h2>
        <p className="mt-3">
          Коммерческое предложение помогает согласовать состав работ и цену до договора. Когда
          клиент согласен — оформите{" "}
          <Link href="/dogovor/" className="text-blue-600 hover:underline">
            договор
          </Link>{" "}
          и{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            счёт на оплату
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
