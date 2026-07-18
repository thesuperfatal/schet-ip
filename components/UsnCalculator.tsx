"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FIXED_CONTRIBUTIONS_2026,
  USN_YEAR,
  calcUsn15,
  calcUsn6,
  compareUsn,
  formatMoney,
  suggestedContributions,
  type UsnBreakdown,
  type UsnMode,
} from "@/lib/usnCalculate";

function parseNum(value: string): number {
  return Number(String(value).replace(/\s/g, "").replace(",", ".")) || 0;
}

export default function UsnCalculator() {
  const [mode, setMode] = useState<UsnMode>("compare");
  const [income, setIncome] = useState("1200000");
  const [expenses, setExpenses] = useState("400000");
  const [contributions, setContributions] = useState(String(FIXED_CONTRIBUTIONS_2026));
  const [autoContrib, setAutoContrib] = useState(true);
  const [hasEmployees, setHasEmployees] = useState(false);
  const [months, setMonths] = useState("12");

  const incomeNum = parseNum(income);
  const expensesNum = parseNum(expenses);
  const monthsNum = Math.min(12, Math.max(1, parseNum(months) || 12));

  const contribNum = useMemo(() => {
    if (autoContrib) return suggestedContributions(incomeNum);
    return parseNum(contributions);
  }, [autoContrib, incomeNum, contributions]);

  const input = {
    income: incomeNum,
    expenses: expensesNum,
    contributions: contribNum,
    hasEmployees,
    months: monthsNum,
  };

  const result6 = useMemo(() => calcUsn6(input), [incomeNum, contribNum, hasEmployees, monthsNum]);
  const result15 = useMemo(
    () => calcUsn15(input),
    [incomeNum, expensesNum, contribNum, monthsNum],
  );
  const compare = useMemo(
    () => compareUsn(input),
    [incomeNum, expensesNum, contribNum, hasEmployees, monthsNum],
  );

  function applySuggestedContrib() {
    setAutoContrib(true);
    setContributions(String(suggestedContributions(incomeNum)));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["compare", "Сравнить 6% и 15%"],
            ["income6", "УСН 6%"],
            ["profit15", "УСН 15%"],
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
          Расчёт для ИП на УСН за {USN_YEAR} год: налог, взносы, вычет и сколько откладывать в месяц.
          Это ориентир, не замена бухгалтеру.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Доход за период, ₽"
            value={income}
            onChange={setIncome}
            hint="Выручка / доходы, учитываемые на УСН"
          />
          {(mode === "profit15" || mode === "compare") && (
            <Field
              label="Расходы (без взносов), ₽"
              value={expenses}
              onChange={setExpenses}
              hint="Для УСН 15%. Взносы учтём отдельно"
            />
          )}
          <Field
            label="Период, месяцев"
            value={months}
            onChange={setMonths}
            hint="Для расчёта «откладывать в месяц»"
          />
          <div className="space-y-2">
            <Field
              label="Страховые взносы за себя, ₽"
              value={autoContrib ? String(Math.round(contribNum)) : contributions}
              onChange={(v) => {
                setAutoContrib(false);
                setContributions(v);
              }}
              hint={
                autoContrib
                  ? `Авто: фикс ${formatMoney(FIXED_CONTRIBUTIONS_2026)} + 1% свыше 300 тыс.`
                  : "Можно указать фактически уплаченные"
              }
              disabled={autoContrib}
            />
            <div className="flex flex-wrap gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  checked={autoContrib}
                  onChange={(e) => {
                    setAutoContrib(e.target.checked);
                    if (e.target.checked) applySuggestedContrib();
                  }}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                Считать взносы автоматически
              </label>
              {!autoContrib && (
                <button
                  type="button"
                  onClick={applySuggestedContrib}
                  className="text-blue-600 hover:underline"
                >
                  Подставить расчётные
                </button>
              )}
            </div>
          </div>
        </div>

        {(mode === "income6" || mode === "compare") && (
          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              checked={hasEmployees}
              onChange={(e) => setHasEmployees(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <span className="text-sm text-slate-700">
              <span className="font-medium">Есть наёмные сотрудники</span>
              <span className="mt-0.5 block text-slate-500">
                На УСН 6% вычет взносов ограничен 50% налога (без сотрудников — до 100%)
              </span>
            </span>
          </label>
        )}
      </div>

      {mode === "income6" && <ResultCard title="УСН «Доходы» 6%" result={result6} highlight />}
      {mode === "profit15" && (
        <ResultCard title="УСН «Доходы минус расходы» 15%" result={result15} highlight />
      )}
      {mode === "compare" && (
        <div className="space-y-4">
          <div
            className={`rounded-2xl border p-5 ${
              compare.better === "equal"
                ? "border-slate-200 bg-slate-50"
                : "border-green-200 bg-green-50"
            }`}
          >
            <p className="text-sm font-medium text-slate-800">Рекомендация</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {compare.better === "equal" && "Нагрузка почти одинаковая"}
              {compare.better === "income6" &&
                `Выгоднее УСН 6% — экономия ~${formatMoney(compare.savings)} ₽`}
              {compare.better === "profit15" &&
                `Выгоднее УСН 15% — экономия ~${formatMoney(compare.savings)} ₽`}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Сравниваем налог + взносы (общую налоговую нагрузку за период).
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <ResultCard
              title="УСН 6%"
              result={compare.income6}
              highlight={compare.better === "income6"}
            />
            <ResultCard
              title="УСН 15%"
              result={compare.profit15}
              highlight={compare.better === "profit15"}
            />
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Связка с документами</p>
        <p className="mt-2">
          Посчитали нагрузку — оформите оплату клиенту:{" "}
          <Link href="/create/?type=schet" className="font-medium text-blue-700 hover:underline">
            создать счёт
          </Link>{" "}
          или{" "}
          <Link href="/create/?type=akt" className="font-medium text-blue-700 hover:underline">
            акт
          </Link>
          . Нужен НДС в сумме?{" "}
          <Link href="/nds/" className="font-medium text-blue-700 hover:underline">
            калькулятор НДС
          </Link>
          . Только взносы —{" "}
          <Link href="/vznosy/" className="font-medium text-blue-700 hover:underline">
            отдельно
          </Link>
          .
        </p>
      </div>

      <details className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-900">Как считается</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            УСН 6%: налог = доход × 6%, минус взносы (до 100% без сотрудников, до 50% с
            сотрудниками).
          </li>
          <li>
            УСН 15%: база = доход − расходы − взносы, налог = база × 15%. Если меньше —{" "}
            <strong>минимальный налог 1% от дохода</strong>.
          </li>
          <li>
            Фиксированные взносы ИП в {USN_YEAR} г.: {formatMoney(FIXED_CONTRIBUTIONS_2026)} ₽ + 1%
            с дохода свыше 300 000 ₽.
          </li>
          <li>«Откладывать в месяц» = (налог к уплате + взносы) ÷ число месяцев.</li>
        </ul>
      </details>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50"
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

function ResultCard({
  title,
  result,
  highlight,
}: {
  title: string;
  result: UsnBreakdown;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        highlight ? "border-blue-300 bg-white ring-2 ring-blue-100" : "border-slate-200 bg-white"
      }`}
    >
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>

      <div className="mt-4 rounded-xl bg-blue-600 px-4 py-4 text-white">
        <p className="text-sm text-blue-100">Откладывай в месяц</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">
          {formatMoney(result.monthlySetAside)} ₽
        </p>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <Row label="Налог до вычета / расчётный" value={`${formatMoney(result.taxBeforeDeduction)} ₽`} />
        {result.mode === "income6" && (
          <Row label="Вычет взносов" value={`${formatMoney(result.deductionApplied)} ₽`} />
        )}
        {result.mode === "profit15" && (
          <Row
            label={result.usedMinTax ? "Минимальный налог 1% (к уплате)" : "Налог 15%"}
            value={`${formatMoney(result.taxPayable)} ₽`}
          />
        )}
        {result.mode === "income6" && (
          <Row label="Налог к уплате" value={`${formatMoney(result.taxPayable)} ₽`} strong />
        )}
        {result.mode === "profit15" && !result.usedMinTax && (
          <Row label="Налог к уплате" value={`${formatMoney(result.taxPayable)} ₽`} strong />
        )}
        <Row label="Взносы" value={`${formatMoney(result.contributions)} ₽`} />
        <Row label="Итого нагрузка" value={`${formatMoney(result.totalBurden)} ₽`} strong />
        <Row
          label="Остаток после налога и взносов"
          value={`${formatMoney(result.netAfterTaxAndContrib)} ₽`}
        />
      </dl>

      {result.usedMinTax && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Расчётный налог меньше минимума — платится минимальный налог 1% от дохода (
          {formatMoney(result.minTax)} ₽).
        </p>
      )}
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
