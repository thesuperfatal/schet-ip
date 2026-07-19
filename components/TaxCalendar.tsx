"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  daysUntil,
  deadlineStatus,
  deadlinesForActivityYear,
  filterDeadlines,
  formatDeadlineDate,
  type DeadlineStatus,
  type TaxDeadline,
} from "@/lib/taxDeadlines";

const YEAR = 2026;

const STATUS_LABEL: Record<DeadlineStatus, string> = {
  overdue: "Прошло",
  soon: "Скоро",
  later: "Позже",
};

const STATUS_CLASS: Record<DeadlineStatus, string> = {
  overdue: "bg-slate-100 text-slate-600",
  soon: "bg-amber-100 text-amber-900",
  later: "bg-blue-50 text-blue-800",
};

export default function TaxCalendar() {
  const [usn, setUsn] = useState(true);
  const [vznosy, setVznosy] = useState(true);
  const [common, setCommon] = useState(true);
  const [onlyUpcoming, setOnlyUpcoming] = useState(false);

  const today = useMemo(() => new Date(), []);

  const items = useMemo(() => {
    const all = filterDeadlines(deadlinesForActivityYear(YEAR), { usn, vznosy, common });
    if (!onlyUpcoming) return all;
    return all.filter((d) => daysUntil(d.date, today) >= 0);
  }, [usn, vznosy, common, onlyUpcoming, today]);

  const nextUp = items.find((d) => daysUntil(d.date, today) >= 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-4 text-sm text-slate-600">
          Календарь на деятельность {YEAR} года (с переходящими сроками в {YEAR + 1}). Даты —
          ориентир для ИП без работников; сверьте с личным кабинетом ФНС.
        </p>

        <div className="flex flex-wrap gap-3">
          <Toggle checked={usn} onChange={setUsn} label="УСН" />
          <Toggle checked={vznosy} onChange={setVznosy} label="Взносы" />
          <Toggle checked={common} onChange={setCommon} label="Общее" />
          <Toggle checked={onlyUpcoming} onChange={setOnlyUpcoming} label="Только будущие" />
        </div>
      </div>

      {nextUp && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-900">Ближайший срок</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{nextUp.title}</p>
          <p className="mt-1 text-sm text-slate-700">
            {formatDeadlineDate(nextUp.date)}
            {" · "}
            {formatDaysLeft(daysUntil(nextUp.date, today))}
          </p>
          {nextUp.href && (
            <Link
              href={nextUp.href}
              className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
            >
              Открыть связанный инструмент →
            </Link>
          )}
        </div>
      )}

      <ul className="space-y-3">
        {items.map((item) => (
          <DeadlineRow key={item.id} item={item} today={today} />
        ))}
        {items.length === 0 && (
          <li className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
            Нет сроков по выбранным фильтрам
          </li>
        )}
      </ul>

      <p className="text-sm text-slate-600">
        Посчитать суммы:{" "}
        <Link href="/usn/" className="text-blue-600 hover:underline">
          УСН
        </Link>
        ,{" "}
        <Link href="/vznosy/" className="text-blue-600 hover:underline">
          взносы
        </Link>
        ,{" "}
        <Link href="/patent-usn/" className="text-blue-600 hover:underline">
          патент или УСН
        </Link>
        . Чек-лист старта:{" "}
        <Link href="/otkryl-ip/" className="text-blue-600 hover:underline">
          Открыл ИП
        </Link>
        .
      </p>
    </div>
  );
}

function Toggle(props: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-blue-600"
      />
      {props.label}
    </label>
  );
}

function DeadlineRow({ item, today }: { item: TaxDeadline; today: Date }) {
  const status = deadlineStatus(item.date, today);
  const days = daysUntil(item.date, today);

  return (
    <li className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{item.title}</p>
          <p className="mt-0.5 text-sm text-slate-600">{formatDeadlineDate(item.date)}</p>
          <p className="mt-1 text-sm text-slate-500">{item.hint}</p>
          {item.href && (
            <Link href={item.href} className="mt-1 inline-block text-sm text-blue-600 hover:underline">
              Подробнее
            </Link>
          )}
        </div>
        <div className="text-right">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASS[status]}`}
          >
            {STATUS_LABEL[status]}
          </span>
          <p className="mt-1 text-xs text-slate-500">{formatDaysLeft(days)}</p>
        </div>
      </div>
    </li>
  );
}

function formatDaysLeft(days: number): string {
  if (days === 0) return "сегодня";
  if (days === 1) return "завтра";
  if (days === -1) return "вчера";
  if (days > 0) return `через ${days} дн.`;
  return `${Math.abs(days)} дн. назад`;
}
