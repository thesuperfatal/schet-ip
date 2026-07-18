"use client";

import { useState } from "react";

export default function UsnCalculator() {
  const [income, setIncome] = useState("500000");
  const [contributions, setContributions] = useState("50000");

  const incomeNum = Number(income.replace(",", ".")) || 0;
  const contribNum = Number(contributions.replace(",", ".")) || 0;
  const taxRaw = incomeNum * 0.06;
  const tax = Math.max(0, taxRaw - contribNum);
  const total = incomeNum - tax - contribNum;

  const fmt = (n: number) =>
    n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">
        Упрощённый расчёт для ИП на УСН «Доходы» 6%. Взносы уменьшают налог (без сотрудников).
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Доход за период, ₽</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Уплаченные взносы, ₽
          </span>
          <input
            type="number"
            value={contributions}
            onChange={(e) => setContributions(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </label>
      </div>

      <div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
        <p>
          <span className="text-slate-600">Налог 6% (до вычета):</span>{" "}
          <strong>{fmt(taxRaw)} ₽</strong>
        </p>
        <p>
          <span className="text-slate-600">Налог к уплате:</span>{" "}
          <strong>{fmt(tax)} ₽</strong>
        </p>
        <p>
          <span className="text-slate-600">Чистыми после налога и взносов:</span>{" "}
          <strong>{fmt(total)} ₽</strong>
        </p>
      </div>
    </div>
  );
}
