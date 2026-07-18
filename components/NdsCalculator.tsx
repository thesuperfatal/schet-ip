"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  NDS_RATES,
  NDS_STANDARD_RATE,
  NDS_YEAR,
  calcNds,
  formatMoney,
  formatMoneyShort,
  hintUsnNds,
  type NdsCalcMode,
} from "@/lib/ndsCalculate";

function parseNum(value: string): number {
  return Number(String(value).replace(/\s/g, "").replace(",", ".")) || 0;
}

export default function NdsCalculator() {
  const [mode, setMode] = useState<NdsCalcMode>("charge");
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState(NDS_STANDARD_RATE);
  const [usnIncome, setUsnIncome] = useState("");
  const [showUsnHint, setShowUsnHint] = useState(false);

  const amountNum = parseNum(amount);
  const result = useMemo(() => calcNds(mode, amountNum, rate), [mode, amountNum, rate]);
  const usnHint = useMemo(() => {
    if (!showUsnHint || !usnIncome.trim()) return null;
    return hintUsnNds(parseNum(usnIncome));
  }, [showUsnHint, usnIncome]);

  const createHref = `/create/?type=schet`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["charge", "Начислить НДС"],
            ["extract", "Выделить НДС"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              mode === value
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-5 text-sm text-slate-600">
          Калькулятор НДС {NDS_YEAR}: начислить к сумме или выделить из суммы «с НДС». Готовая фраза
          для счёта и акта. Это ориентир, не консультация.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              {mode === "charge" ? "Сумма без НДС, ₽" : "Сумма с НДС, ₽"}
            </span>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Ставка НДС</span>
            <select
              value={String(rate)}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              {NDS_RATES.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                  {item.value === NDS_STANDARD_RATE ? " (общая)" : ""}
                  {item.value === 0.05 ? " (спец. УСН)" : ""}
                  {item.value === 0.07 ? " (спец. УСН)" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
          <input
            type="checkbox"
            checked={showUsnHint}
            onChange={(e) => setShowUsnHint(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
          />
          <span className="text-sm text-slate-700">
            <span className="font-medium">Я на УСН — подсказать, нужен ли НДС</span>
            <span className="mt-0.5 block text-slate-500">
              По доходу за год (ориентир порогов {NDS_YEAR} г.)
            </span>
          </span>
        </label>

        {showUsnHint && (
          <label className="mt-3 block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Доход за год (или ожидаемый), ₽
            </span>
            <input
              type="number"
              min={0}
              value={usnIncome}
              onChange={(e) => setUsnIncome(e.target.value)}
              placeholder="Например 25000000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </label>
        )}
      </div>

      {usnHint && (
        <div
          className={`rounded-2xl border p-5 ${
            usnHint.level === "free"
              ? "border-green-200 bg-green-50"
              : usnHint.level === "over_usn"
                ? "border-amber-200 bg-amber-50"
                : "border-blue-200 bg-blue-50"
          }`}
        >
          <p className="font-semibold text-slate-900">{usnHint.title}</p>
          <p className="mt-2 text-sm text-slate-700">{usnHint.text}</p>
          {usnHint.suggestedRate !== null && (
            <button
              type="button"
              onClick={() => setRate(usnHint.suggestedRate as number)}
              className="mt-3 text-sm font-medium text-blue-700 hover:underline"
            >
              Поставить ставку{" "}
              {usnHint.suggestedRate === 0
                ? "0% (без НДС)"
                : `${Math.round(usnHint.suggestedRate * 100)}%`}{" "}
              в калькуляторе
            </button>
          )}
          <p className="mt-3 text-sm text-slate-600">
            Считаете налог УСН?{" "}
            <Link href="/usn/" className="font-medium text-blue-700 hover:underline">
              Калькулятор УСН
            </Link>
            {" · "}
            Нужен НДС в счёте?{" "}
            <Link href="/nds/" className="font-medium text-blue-700 hover:underline">
              Калькулятор НДС
            </Link>
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-blue-300 bg-white p-5 shadow-sm ring-2 ring-blue-100">
        <div className="rounded-xl bg-blue-600 px-4 py-4 text-white">
          <p className="text-sm text-blue-100">НДС</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            {formatMoney(result.ndsAmount)} ₽
          </p>
        </div>

        <dl className="mt-4 space-y-2 text-sm">
          <Row label="Сумма без НДС" value={`${formatMoney(result.amountWithoutNds)} ₽`} />
          <Row label="НДС" value={`${formatMoney(result.ndsAmount)} ₽`} strong />
          <Row label="Итого с НДС" value={`${formatMoney(result.amountWithNds)} ₽`} strong />
        </dl>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Фраза для счёта / акта
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900">{result.documentPhrase}</p>
        </div>

        <Link
          href={createHref}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
        >
          Создать счёт на оплату
        </Link>
        <p className="mt-2 text-center text-xs text-slate-500">
          В поле НДС на форме счёта вставьте фразу выше (или «Без НДС»).
        </p>
      </div>

      <details className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-900">Как считается</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Начислить:</strong> НДС = сумма без НДС × ставка; итог = сумма + НДС.
          </li>
          <li>
            <strong>Выделить:</strong> сумма без НДС = сумма с НДС ÷ (1 + ставка); НДС = разница.
          </li>
          <li>
            Общая ставка с {NDS_YEAR} г. часто берётся <strong>22%</strong>. Для УСН возможны
            спецставки <strong>5%</strong> и <strong>7%</strong> (без вычетов) при определённых
            доходах; порог «без НДС» для УСН ориентировочно до{" "}
            {formatMoneyShort(20_000_000)} ₽/год.
          </li>
          <li>Проверяйте актуальные нормы НК РФ / ФНС — калькулятор упрощает расчёт.</li>
        </ul>
      </details>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2 last:border-0">
      <dt className="text-slate-600">{label}</dt>
      <dd className={strong ? "font-semibold text-slate-900" : "font-medium text-slate-800"}>
        {value}
      </dd>
    </div>
  );
}
