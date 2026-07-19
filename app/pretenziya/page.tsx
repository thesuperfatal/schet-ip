import type { Metadata } from "next";
import Link from "next/link";
import ClaimLetterClient from "@/components/ClaimLetterClient";

export const metadata: Metadata = {
  title: "Претензия о просрочке оплаты — шаблон PDF для ИП",
  description:
    "Бесплатный генератор претензии о просрочке оплаты: дни просрочки, пени, требование погасить долг. Скачайте PDF без регистрации.",
  keywords:
    "претензия о просрочке оплаты, претензия должнику шаблон, письмо о задолженности ИП, претензия PDF",
  alternates: { canonical: "https://biznes-ip.ru/pretenziya/" },
  openGraph: {
    title: "Претензия о просрочке оплаты — PDF | СчётИП",
    description: "Составьте претензию с расчётом пеней и скачайте PDF.",
    url: "https://biznes-ip.ru/pretenziya/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function PretenziyaPage() {
  return (
    <div>
      <ClaimLetterClient />

      <section className="mx-auto max-w-3xl px-4 pb-16 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Как пользоваться</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Укажите стороны и реквизиты счёта.</li>
          <li>Проверьте срок оплаты и пени (или сначала посчитайте в калькуляторе).</li>
          <li>Скачайте PDF и направьте должнику.</li>
        </ol>
        <p className="mt-3">
          Калькулятор дней и пеней:{" "}
          <Link href="/srok-oplaty/" className="text-blue-600 hover:underline">
            срок оплаты и пени
          </Link>
          .
        </p>
        <p className="mt-3 text-slate-500">
          Шаблон носит справочный характер и не заменяет юридическую консультацию.
        </p>
      </section>
    </div>
  );
}
