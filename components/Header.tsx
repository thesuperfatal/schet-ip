import Link from "next/link";
import NavLink from "@/components/NavLink";
import { navTools } from "@/lib/tools";

export default function Header() {
  const items = navTools();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold text-slate-900"
          title="СчётИП — бесплатные инструменты для ИП"
        >
          Счёт<span className="text-blue-600">ИП</span>
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm"
          aria-label="Основные инструменты"
        >
          {items.map((item) => (
            <NavLink
              key={item.href + item.title}
              href={item.href}
              label={item.navLabel || item.title}
              tip={item.tip}
            />
          ))}
          <NavLink href="/faq/" label="FAQ" tip="Частые вопросы о СчётИП" />
        </nav>
      </div>
    </header>
  );
}
