"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import FormField from "@/components/FormField";
import {
  FIXED_CONTRIBUTIONS_2026,
  USN_YEAR,
  suggestedContributions,
} from "@/lib/usnCalculate";
import {
  comparePatentUsn,
  formatMoney,
} from "@/lib/patentUsnCalculate";

function parseNum(value: string): number {
  return Number(String(value).replace(/\s/g, "").replace(",", ".")) || 0;
}

export default function PatentUsnCalculator() {
  const [income, setIncome] = useState("1200000");
  const [expenses, setExpenses] = useState("200000");
  const [patentCost, setPatentCost] = useState("45000");
  const [contributions, setContributions] = useState(String(FIXED_CONTRIBUTIONS_2026));
  const [autoContrib, setAutoContrib] = useState(true);
  const [hasEmployees, setHasEmployees] = useState(false);
  const [months, setMonths] = useState("12");

  const incomeNum = parseNum(income);
  const expensesNum = parseNum(expenses);
  const patentNum = parseNum(patentCost);
  const monthsNum = Math.min(12, Math.max(1, parseNum(months) || 12));

  const contribNum = useMemo(() => {
    if (autoContrib) return suggestedContributions(incomeNum);
    return parseNum(contributions);
  }, [autoContrib, incomeNum, contributions]);

  const result = useMemo(
    () =>
      comparePatentUsn({
        income: incomeNum,
        expenses: expensesNum,
        patentCost: patentNum,
        contributions: contribNum,
        hasEmployees,
        months: monthsNum,
      }),
    [incomeNum, expensesNum, patentNum, contribNum, hasEmployees, monthsNum]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-5 text-sm text-slate-600">
          Сравнение для ИП за {USN_YEAR} год: патент, УСН 6% и УСН 15% с учётом взносов. Стоимость
          патента возьмите в калькуляторе ФНС по вашему региону и виду деятельности — это ориентир,
          не замена консультации.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Ожидаемый доход за период, ₽"
            value={income}
            onChange={setIncome}
            type="number"
            min={0}
            hint="Выручка / доходы, которые сравниваете"
          />
          <FormField
            label="Расходы за период, ₽"
            value={expenses}
            onChange={setExpenses}
            type="number"
            min={0}
            hint="Нужны для УСН 15%. На патент и УСН 6% не влияют"
          />
          <FormField
            label="Стоимость патента, ₽"
            value={patentCost}
            onChange={setPatentCost}
            type="number"
            min={0}
            hint="Сумма патента за тот же период (из ФНС / региона)"
          />
          <FormField
            label="Месяцев в периоде"
            value={months}
            onChange={setMonths}
            type="number"
            min={1}
            hint="Обычно 12 — чтобы увидеть «откладывать в месяц»"
          />
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              checked={autoContrib}
              onChange={(e) => setAutoContrib(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <span className="text-sm text-slate-700">
              <span className="font-medium">Взносы автоматически</span>
              <span className="mt-0.5 block text-slate-500">
                Фикс {formatMoney(FIXED_CONTRIBUTIONS_2026)} ₽ + 1% свыше 300 000 ₽
              </span>
            </span>
          </label>

          {!autoContrib && (
            <FormField
              label="Взносы за период, ₽"
              value={contributions}
              onChange={setContributions}
              type="number"
              min={0}
            />
          )}

          {autoContrib && (
            <p className="text-sm text-slate-600">
              Взносы в расчёте: <strong>{formatMoney(contribNum)} ₽</strong>
            </p>
          )}

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              type="checkbox"
              checked={hasEmployees}
              onChange={(e) => setHasEmployees(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <span className="text-sm text-slate-700">
              <span className="font-medium">Есть наёмные работники</span>
              <span className="mt-0.5 block text-slate-500">
                Вычет взносов из патента/УСН 6% ограничен 50%
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm font-medium text-blue-800">Выгоднее по сумме налога + взносов</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{result.winnerLabel}</p>
        {result.winner !== "tie" && result.savingsVsSecond >= 1 && (
          <p className="mt-1 text-sm text-slate-700">
            Экономия примерно {formatMoney(result.savingsVsSecond)} ₽ за период относительно
            следующего варианта
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          title="Патент"
          highlight={result.winner === "patent"}
          taxLabel="Патент к уплате"
          tax={result.patent.patentPayable}
          contrib={result.patent.contributions}
          total={result.patent.totalBurden}
          monthly={result.patent.monthlySetAside}
          note={
            result.patent.deductionApplied > 0
              ? `Вычет взносов: ${formatMoney(result.patent.deductionApplied)} ₽`
              : undefined
          }
        />
        <ResultCard
          title="УСН 6%"
          highlight={result.winner === "income6"}
          taxLabel="Налог к уплате"
          tax={result.income6.taxPayable}
          contrib={result.income6.contributions}
          total={result.income6.totalBurden}
          monthly={result.income6.monthlySetAside}
        />
        <ResultCard
          title="УСН 15%"
          highlight={result.winner === "profit15"}
          taxLabel="Налог к уплате"
          tax={result.profit15.taxPayable}
          contrib={result.profit15.contributions}
          total={result.profit15.totalBurden}
          monthly={result.profit15.monthlySetAside}
          note={result.profit15.usedMinTax ? "Сработал минимальный налог 1%" : undefined}
        />
      </div>

      <p className="text-sm text-slate-600">
        Подробнее про режимы — в статье{" "}
        <Link href="/articles/patent-ili-usn/" className="text-blue-600 hover:underline">
          «Патент или УСН»
        </Link>
        . Детальный разбор упрощёнки:{" "}
        <Link href="/usn/" className="text-blue-600 hover:underline">
          калькулятор УСН
        </Link>
        . Только взносы:{" "}
        <Link href="/vznosy/" className="text-blue-600 hover:underline">
          калькулятор взносов
        </Link>
        .
      </p>
    </div>
  );
}

function ResultCard(props: {
  title: string;
  highlight: boolean;
  taxLabel: string;
  tax: number;
  contrib: number;
  total: number;
  monthly: number;
  note?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        props.highlight
          ? "border-blue-400 bg-white shadow-md ring-2 ring-blue-100"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm font-semibold text-slate-900">{props.title}</p>
      <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
        <div className="flex justify-between gap-2">
          <dt>{props.taxLabel}</dt>
          <dd className="font-medium text-slate-900">{formatMoney(props.tax)} ₽</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Взносы</dt>
          <dd className="font-medium text-slate-900">{formatMoney(props.contrib)} ₽</dd>
        </div>
        <div className="flex justify-between gap-2 border-t border-slate-100 pt-1.5">
          <dt className="font-medium text-slate-800">Итого нагрузка</dt>
          <dd className="font-bold text-slate-900">{formatMoney(props.total)} ₽</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>В месяц</dt>
          <dd className="font-medium text-slate-900">{formatMoney(props.monthly)} ₽</dd>
        </div>
      </dl>
      {props.note && <p className="mt-2 text-xs text-slate-500">{props.note}</p>}
    </div>
  );
}
