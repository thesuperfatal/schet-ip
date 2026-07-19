"use client";

import type { DocHistoryEntry } from "@/lib/docHistory";
import { historyLabel, historyTotal } from "@/lib/docHistory";

interface DocHistoryProps {
  entries: DocHistoryEntry[];
  onOpen: (entry: DocHistoryEntry) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatSavedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function DocHistory({ entries, onOpen, onRemove, onClear }: DocHistoryProps) {
  if (entries.length === 0) return null;

  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm print:hidden">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Недавние документы</h2>
          <p className="text-xs text-slate-500">
            Сохраняются в этом браузере после скачивания PDF — можно открыть снова
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-red-600 hover:underline"
        >
          Очистить историю
        </button>
      </div>

      <ul className="space-y-2">
        {entries.map((entry) => {
          const total = historyTotal(entry);
          return (
            <li
              key={entry.id}
              className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
            >
              <button
                type="button"
                onClick={() => onOpen(entry)}
                className="min-w-0 flex-1 text-left"
              >
                <span className="block truncate text-sm font-medium text-slate-800">
                  {historyLabel(entry)}
                </span>
                <span className="block text-xs text-slate-500">
                  {entry.data.date}
                  {total > 0
                    ? ` · ${total.toLocaleString("ru-RU", { minimumFractionDigits: 2 })} ₽`
                    : ""}
                  {entry.savedAt ? ` · ${formatSavedAt(entry.savedAt)}` : ""}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onOpen(entry)}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
              >
                Открыть
              </button>
              <button
                type="button"
                onClick={() => onRemove(entry.id)}
                className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-500 hover:border-red-200 hover:text-red-600"
                aria-label="Удалить из истории"
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
