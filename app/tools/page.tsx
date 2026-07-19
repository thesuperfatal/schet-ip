import type { Metadata } from "next";
import Link from "next/link";
import { SITE_TOOLS, TOOL_CATEGORIES, toolsByCategory, type ToolCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Все инструменты для ИП — каталог СчётИП",
  description:
    "Полный список бесплатных инструментов СчётИП: счета, акты, договор, КП, калькуляторы УСН, НДС, взносов и пени.",
  alternates: { canonical: "https://biznes-ip.ru/tools/" },
};

const ORDER: ToolCategory[] = ["documents", "calculators", "guides"];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Все инструменты
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Один каталог всего, что умеет СчётИП. Выберите нужное — без регистрации.
      </p>

      <p className="mt-4 text-sm text-slate-500">
        Типичная сделка:{" "}
        <Link href="/kp/" className="text-blue-600 hover:underline">
          КП
        </Link>{" "}
        →{" "}
        <Link href="/dogovor/" className="text-blue-600 hover:underline">
          договор
        </Link>{" "}
        →{" "}
        <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
          счёт
        </Link>{" "}
        →{" "}
        <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
          акт
        </Link>
        . Данные можно переносить кнопками «Что дальше».
      </p>

      {ORDER.map((category) => {
        const meta = TOOL_CATEGORIES[category];
        const tools = toolsByCategory(category);
        return (
          <section key={category} className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">{meta.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{meta.blurb}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tools.map((tool) => (
                <li key={tool.href + tool.title}>
                  <Link
                    href={tool.href}
                    className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300"
                  >
                    <span className="font-semibold text-slate-900">{tool.title}</span>
                    <span className="mt-1 block text-sm text-slate-600">{tool.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="mt-10 text-sm text-slate-500">
        Всего инструментов: {SITE_TOOLS.length}.{" "}
        <Link href="/faq/" className="text-blue-600 hover:underline">
          FAQ
        </Link>
      </p>
    </div>
  );
}
