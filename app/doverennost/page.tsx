import type { Metadata } from "next";
import Link from "next/link";
import PowerOfAttorneyClient from "@/components/PowerOfAttorneyClient";

export const metadata: Metadata = {
  title: "Доверенность от ИП онлайн — шаблон PDF бесплатно",
  description:
    "Бесплатный генератор доверенности для ИП: уполномочьте представителя подписывать документы и скачайте PDF. Без регистрации.",
  keywords:
    "доверенность ИП, доверенность шаблон, доверенность на подписание документов, доверенность PDF онлайн",
  alternates: { canonical: "https://biznes-ip.ru/doverennost/" },
  openGraph: {
    title: "Доверенность от ИП — PDF онлайн | СчётИП",
    description: "Составьте простую доверенность и скачайте PDF бесплатно.",
    url: "https://biznes-ip.ru/doverennost/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function DoverennostPage() {
  return (
    <div>
      <PowerOfAttorneyClient />

      <section className="mx-auto max-w-3xl px-4 pb-16 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Когда нужна доверенность</h2>
        <p className="mt-3">
          Если документы подписывает не сам ИП, а сотрудник, бухгалтер или партнёр — удобно выдать
          письменную доверенность. После этого можно оформлять{" "}
          <Link href="/dogovor/" className="text-blue-600 hover:underline">
            договор
          </Link>
          ,{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            счёт
          </Link>{" "}
          и{" "}
          <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
            акт
          </Link>
          .
        </p>
        <p className="mt-3 text-slate-500">
          Шаблон носит справочный характер. Для нотариальной формы, суда или банка уточните
          требования у принимающей стороны.
        </p>
      </section>
    </div>
  );
}
