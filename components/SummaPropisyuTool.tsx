"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { amountToWords, formatMoney } from "@/lib/amountToWords";

function parseAmount(value: string): number {
  const normalized = String(value).replace(/\s/g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function SummaPropisyuTool() {
  const [amount, setAmount] = useState("123456.78");
  const [copied, setCopied] = useState(false);

  const value = parseAmount(amount);
  const words = useMemo(() => capitalize(amountToWords(value)), [value]);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(words);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-5 text-sm text-slate-600">
          Введите сумму — получите текст «прописью» для договора, счёта или акта. Работает в браузере,
          без отправки данных на сервер.
        </p>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Сумма, ₽</span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg outline-none focus:border-blue-500"
            placeholder="0.00"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {["1000", "10000", "100000", "1000000"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-blue-300 hover:text-blue-700"
            >
              {Number(preset).toLocaleString("ru-RU")} ₽
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-300 bg-white p-5 shadow-sm ring-2 ring-blue-100">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Числом</p>
        <p className="mt-1 text-2xl font-bold text-slate-900">{formatMoney(value)} ₽</p>

        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">Прописью</p>
        <p className="mt-2 text-lg font-medium leading-snug text-slate-900">{words}</p>

        <button
          type="button"
          onClick={copyText}
          className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {copied ? "Скопировано" : "Скопировать текст"}
        </button>

        <Link
          href="/create/?type=schet"
          className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Вставить в счёт на оплату
        </Link>
        <p className="mt-2 text-center text-xs text-slate-500">
          В счёте и акте сумма прописью считается автоматически по итогу позиций.
        </p>
      </div>

      <details className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-900">Зачем сумма прописью</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>В договорах, счетах и актах сумму часто дублируют словами — так меньше ошибок.</li>
          <li>Формат: рубли словами + копейки цифрами (например, «00 коп.»).</li>
          <li>Инструмент бесплатный, без регистрации.</li>
        </ul>
      </details>
    </div>
  );
}
