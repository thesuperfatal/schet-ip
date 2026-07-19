import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Статьи для ИП — счета, УСН, НДС",
  description:
    "Статьи для ИП: акт, КУДиР, закрывающие документы, назначение платежа, УПД, патент или УСН, НДС.",
  alternates: { canonical: "https://biznes-ip.ru/articles/" },
};

export default function ArticlesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Статьи для ИП</h1>
      <p className="mt-3 text-slate-600">
        Короткие разборы по налогам и документам — с ссылками на бесплатные калькуляторы СчётИП.
      </p>

      <ul className="mt-8 space-y-4">
        {ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}/`}
              className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <p className="text-xs text-slate-500">
                {new Date(article.date).toLocaleDateString("ru-RU")}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">{article.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
