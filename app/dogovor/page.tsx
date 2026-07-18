import type { Metadata } from "next";
import Link from "next/link";
import ContractPageClient from "@/components/ContractPageClient";

export const metadata: Metadata = {
  title: "Договор оказания услуг онлайн — шаблон PDF бесплатно",
  description:
    "Бесплатный генератор договора возмездного оказания услуг для ИП: заполните стороны, предмет и сумму — скачайте PDF. Без регистрации.",
  keywords:
    "договор оказания услуг, договор услуг шаблон, договор для ИП, договор PDF онлайн, возмездное оказание услуг",
  alternates: { canonical: "https://biznes-ip.ru/dogovor/" },
  openGraph: {
    title: "Договор оказания услуг — PDF онлайн | СчётИП",
    description: "Составьте простой договор оказания услуг и скачайте PDF бесплатно.",
    url: "https://biznes-ip.ru/dogovor/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function DogovorPage() {
  return (
    <div>
      <ContractPageClient />

      <section className="mx-auto max-w-3xl px-4 pb-16 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Договор услуг для ИП</h2>
        <p className="mt-3">
          Шаблон подходит для типовых услуг: консультации, разработка, маркетинг, подрядные работы.
          После подписания договора удобно{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            выставить счёт
          </Link>{" "}
          и{" "}
          <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
            акт
          </Link>
          . Сумма в договоре пишется прописью автоматически — или воспользуйтесь{" "}
          <Link href="/summa-propisyu/" className="text-blue-600 hover:underline">
            отдельным инструментом
          </Link>
          .
        </p>
        <p className="mt-3 text-slate-500">
          Документ носит справочный характер и не заменяет юридическую консультацию. При сложных
          сделках лучше согласовать текст с юристом.
        </p>
      </section>
    </div>
  );
}
