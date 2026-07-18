import type { Metadata } from "next";
import Link from "next/link";
import IpOpenChecklist from "@/components/IpOpenChecklist";

export const metadata: Metadata = {
  title: "Чек-лист «Открыл ИП» — что сделать после регистрации",
  description:
    "Пошаговый чек-лист для нового ИП: регистрация, УСН, взносы, расчётный счёт, касса, документы. Отмечайте пункты — прогресс сохраняется в браузере.",
  keywords:
    "открыл ИП что делать, чек-лист ИП, после регистрации ИП, первые шаги ИП, УСН после регистрации",
  alternates: { canonical: "https://biznes-ip.ru/otkryl-ip/" },
  openGraph: {
    title: "Чек-лист «Открыл ИП» — СчётИП",
    description: "Пошаговый список дел после регистрации ИП с прогрессом в браузере.",
    url: "https://biznes-ip.ru/otkryl-ip/",
    locale: "ru_RU",
    type: "website",
  },
};

export default function OtkrylIpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Для начинающих ИП
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Чек-лист «Открыл ИП»
        </h1>
        <p className="mt-3 text-slate-600">
          Что сделать после регистрации: налоги, взносы, счёт, документы и первый цикл работы с
          клиентом. Отмечайте пункты — прогресс сохранится на устройстве.
        </p>
      </div>

      <IpOpenChecklist />

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-semibold text-slate-900">Зачем этот чек-лист</h2>
        <p>
          После записи в ЕГРИП легко потеряться: режим налогообложения, взносы, банк, касса,
          шаблоны документов. Список ниже — практичный порядок «что закрыть в первую очередь», без
          бюрократии ради галочки.
        </p>
        <p>
          Полезные инструменты СчётИП:{" "}
          <Link href="/usn/" className="text-blue-600 hover:underline">
            УСН
          </Link>
          ,{" "}
          <Link href="/vznosy/" className="text-blue-600 hover:underline">
            взносы
          </Link>
          ,{" "}
          <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
            счёт
          </Link>
          ,{" "}
          <Link href="/dogovor/" className="text-blue-600 hover:underline">
            договор
          </Link>
          ,{" "}
          <Link href="/nakladnaya/" className="text-blue-600 hover:underline">
            накладная
          </Link>
          .
        </p>
        <p className="text-slate-500">
          Материал справочный и не заменяет консультацию налоговой или бухгалтера. Сроки и формы
          заявлений уточняйте на сайте ФНС и в личном кабинете.
        </p>
      </section>
    </div>
  );
}
