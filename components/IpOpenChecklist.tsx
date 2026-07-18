"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { IP_OPEN_CHECKLIST, allChecklistIds } from "@/lib/ipChecklist";

const STORAGE_KEY = "schet-ip-open-checklist";

export default function IpOpenChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const ids = useMemo(() => allChecklistIds(), []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        setDone(parsed);
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done, ready]);

  const completed = ids.filter((id) => done[id]).length;
  const total = ids.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  function toggle(id: string) {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setDone({});
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-700">Прогресс</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {completed} из {total}
              <span className="ml-2 text-base font-medium text-slate-600">({percent}%)</span>
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Сбросить
          </button>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-slate-600">
          Отметки сохраняются в браузере на этом устройстве.
        </p>
      </div>

      {IP_OPEN_CHECKLIST.map((section) => (
        <section
          key={section.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
          <ul className="mt-4 space-y-3">
            {section.items.map((item) => {
              const checked = Boolean(done[item.id]);
              return (
                <li
                  key={item.id}
                  className={`rounded-xl border px-4 py-3 ${
                    checked ? "border-green-200 bg-green-50" : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <label className="flex cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(item.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-medium ${
                          checked ? "text-green-900 line-through" : "text-slate-900"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                        {item.detail}
                      </span>
                      {item.href && (
                        <Link
                          href={item.href}
                          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.hrefLabel || "Открыть инструмент"} →
                        </Link>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
