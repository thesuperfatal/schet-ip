"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Hint from "@/components/Hint";
import { formatMoney } from "@/lib/amountToWords";
import {
  EXTRA_1PCT_MAX_2026,
  EXTRA_THRESHOLD,
  FIXED_CONTRIBUTIONS_2026,
  USN_YEAR,
  calcExtraContributions,
  suggestedContributions,
} from "@/lib/usnCalculate";

function parseAmount(value: string): number {
  const normalized = String(value).replace(/\s/g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export default function VznosyCalculator() {
  const [income, setIncome] = useState("1200000");
  const [months, setMonths] = useState("12");

  const result = useMemo(() => {
    const incomeNum = parseAmount(income);
    const monthsNum = Math.min(12, Math.max(1, Math.round(parseAmount(months)) || 12));
    const fixed = FIXED_CONTRIBUTIONS_2026;
    const extra = calcExtraContributions(incomeNum);
    const total = suggestedContributions(incomeNum);
    const monthly = Math.round((total / monthsNum) * 100) / 100;
    const overThreshold = Math.max(0, incomeNum - EXTRA_THRESHOLD);
    const extraUncapped = overThreshold * 0.01;
    const capped = extraUncapped > EXTRA_1PCT_MAX_2026;

    return {
      incomeNum,
      monthsNum,
      fixed,
      extra,
      total,
      monthly,
      overThreshold,
      capped,
    };
  }, [income, months]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-5 text-sm text-slate-600">
          Ориентир по взносам ИП «за себя» на {USN_YEAR} год: фиксированная часть + 1% с дохода
          свыше {formatMoney(EXTRA_THRESHOLD)} ₽. Без отправки данных на сервер.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
              Доход за год, ₽
              <Hint text="Доход для расчёта 1% свыше 300 000 ₽ (ориентир)" />
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg outline-none focus:border-blue-500"
              placeholder="0"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
              На сколько месяцев делить
              <Hint text="Чтобы понять, сколько откладывать каждый месяц" />
            </span>
            <input
              type="number"
              min={1}
              max={12}
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["300000", "300 тыс."],
            ["1000000", "1 млн"],
            ["3000000", "3 млн"],
            ["10000000", "10 млн"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setIncome(value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-blue-300 hover:text-blue-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-300 bg-white p-5 shadow-sm ring-2 ring-blue-100">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Взносы ИП за себя · {USN_YEAR}
        </p>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-slate-600">Фиксированные взносы</dt>
            <dd className="font-semibold text-slate-900">{formatMoney(result.fixed)} ₽</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-slate-600">
              1% свыше {formatMoney(EXTRA_THRESHOLD)} ₽
              {result.capped ? " (с лимитом)" : ""}
            </dt>
            <dd className="font-semibold text-slate-900">{formatMoney(result.extra)} ₽</dd>
          </div>
          <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between gap-4">
            <dt className="text-base font-medium text-slate-900">Итого за год</dt>
            <dd className="text-2xl font-bold text-blue-700">{formatMoney(result.total)} ₽</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-slate-600">Откладывать в месяц</dt>
            <dd className="text-lg font-semibold text-slate-900">
              ≈ {formatMoney(result.monthly)} ₽
            </dd>
          </div>
        </dl>

        {result.incomeNum <= EXTRA_THRESHOLD && (
          <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Доход не превышает {formatMoney(EXTRA_THRESHOLD)} ₽ — платится только фиксированная
            часть.
          </p>
        )}

        {result.capped && (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
            1% ограничен максимумом {formatMoney(EXTRA_1PCT_MAX_2026)} ₽ на {USN_YEAR} год.
          </p>
        )}

        <Link
          href="/usn/"
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
        >
          Посчитать налог УСН с этими взносами
        </Link>
        <p className="mt-2 text-center text-xs text-slate-500">
          В калькуляторе УСН взносы уменьшают налог (вычет).
        </p>
      </div>

      <details className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-900">Как считается</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Фиксированная часть на {USN_YEAR}: {formatMoney(FIXED_CONTRIBUTIONS_2026)} ₽ (ориентир).
          </li>
          <li>
            Дополнительно: 1% от дохода свыше {formatMoney(EXTRA_THRESHOLD)} ₽, но не больше{" "}
            {formatMoney(EXTRA_1PCT_MAX_2026)} ₽.
          </li>
          <li>
            Расчёт справочный. Точные сроки и реквизиты смотрите на сайте ФНС / в личном кабинете
            налогоплательщика.
          </li>
        </ul>
      </details>
    </div>
  );
}
