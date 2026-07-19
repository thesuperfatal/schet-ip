"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import { navTools } from "@/lib/tools";

export default function Header() {
  const items = navTools();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold text-slate-900"
          title="СчётИП — бесплатные инструменты для ИП"
          onClick={() => setOpen(false)}
        >
          Счёт<span className="text-blue-600">ИП</span>
        </Link>

        <nav
          className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm lg:flex"
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

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 bg-white lg:hidden"
          role="dialog"
          aria-label="Меню сайта"
        >
          <p className="px-4 pt-3 text-xs text-slate-500">
            Выберите инструмент — кратко, что он делает, написано под названием.
          </p>
          <ul className="max-h-[70vh] space-y-1 overflow-y-auto px-2 py-3">
            {items.map((item) => (
              <li key={item.href + item.title}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 hover:bg-blue-50"
                >
                  <span className="font-medium text-slate-900">
                    {item.navLabel || item.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">{item.tip}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/faq/"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 hover:bg-blue-50"
              >
                <span className="font-medium text-slate-900">FAQ</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Частые вопросы о СчётИП
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/otkryl-ip/"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 hover:bg-blue-50"
              >
                <span className="font-medium text-slate-900">Открыл ИП</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Чек-лист первых шагов
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
