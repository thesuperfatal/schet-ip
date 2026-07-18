"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Hint from "@/components/Hint";
import { formatMoney } from "@/lib/amountToWords";
import {
  DEFAULT_KEY_RATE,
  calcDeadline,
  formatDateRu,
  type PenaltyMode,
} from "@/lib/paymentDeadline";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function parseAmount(value: string): number {
  const n = Number(String(value).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export default function PaymentDeadlineCalculator() {
  const [invoiceDate, setInvoiceDate] = useState(todayIso());
  const [deferralDays, setDeferralDays] = useState("5");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("100000");
  const [mode, setMode] = useState<PenaltyMode>("key_300");
  const [keyRatePct, setKeyRatePct] = useState(String(DEFAULT_KEY_RATE * 100));
  const [customDayPct, setCustomDayPct] = useState("0.1");

  const result = useMemo(() => {
    return calcDeadline({
      invoiceDate,
      deferralDays: Number(deferralDays) || 0,
      paymentDate,
      amount: parseAmount(amount),
      mode,
      customDailyRate: (Number(String(customDayPct).replace(",", ".")) || 0) / 100,
      keyRate: (Number(String(keyRatePct).replace(",", ".")) || 0) / 100,
    });
  }, [invoiceDate, deferralDays, paymentDate, amount, mode, keyRatePct, customDayPct]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-5 text-sm text-slate-600">
          Укажите дату счёта и отсрочку — получите срок оплаты. Если задать дату платежа и сумму,
          посчитаем дни просрочки и ориентировочные пени.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
              Дата счёта
              <Hint text="Дата, от которой считаем отсрочку" />
            </span>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
              Отсрочка, дней
              <Hint text="Сколько дней на оплату от даты счёта (календарные)" />
            </span>
            <input
              type="number"
              min={0}
              value={deferralDays}
              onChange={(e) => setDeferralDays(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
              Дата оплаты
              <Hint text="Необязательно: если указать позже срока — посчитаем пени" />
            </span>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
              Сумма долга, ₽
              <Hint text="Сумма, с которой считаются пени при просрочке" />
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </label>
        </div>

        <div className="mt-4">
          <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
            Как считать пени
            <Hint text="1/300 — часто для налоговых пеней; 1/360 — ориентир по ст. 395 ГК; или своя ставка из договора" />
          </span>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["key_300", "1/300 ставки ЦБ"],
                ["key_360", "1/360 ставки ЦБ"],
                ["custom_day", "Своя %/день"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`rounded-lg px-3 py-1.5 text-sm ${
                  mode === value
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-blue-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {(mode === "key_300" || mode === "key_360") && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Ключевая ставка ЦБ, %
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={keyRatePct}
                onChange={(e) => setKeyRatePct(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
          )}
          {mode === "custom_day" && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Ставка пени, % в день
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={customDayPct}
                onChange={(e) => setCustomDayPct(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-blue-300 bg-white p-5 shadow-sm ring-2 ring-blue-100">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Результат</p>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-slate-600">Срок оплаты</dt>
            <dd className="text-xl font-bold text-slate-900">
              {result.dueDateValid ? formatDateRu(result.dueDate) : "—"}
            </dd>
          </div>

          {!result.paymentDateValid && result.daysUntilDue !== null && !result.isOverdue && (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-slate-600">Осталось дней</dt>
              <dd className="font-semibold text-slate-900">{result.daysUntilDue}</dd>
            </div>
          )}

          {result.isPaidOnTime && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-green-800">
              Оплата в срок или раньше срока.
            </p>
          )}

          {result.isOverdue && (
            <>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-slate-600">Дней просрочки</dt>
                <dd className="font-semibold text-red-700">{result.overdueDays}</dd>
              </div>
              <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between gap-4">
                <dt className="text-base font-medium text-slate-900">Пени (ориентир)</dt>
                <dd className="text-2xl font-bold text-blue-700">
                  {formatMoney(result.penalty)} ₽
                </dd>
              </div>
              <p className="text-xs text-slate-500">
                {result.modeLabel}. Эффективная ставка в день:{" "}
                {(result.dailyRateUsed * 100).toLocaleString("ru-RU", {
                  maximumFractionDigits: 5,
                })}
                %
              </p>
            </>
          )}
        </dl>

        <Link
          href="/create/?type=schet"
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
        >
          Создать счёт с этой суммой
        </Link>
      </div>

      <details className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-900">Как считается</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Срок оплаты = дата счёта + число дней отсрочки (календарные дни).</li>
          <li>
            Пени = сумма × ставка за день × число дней просрочки. Режим 1/300 часто используют для
            налоговых пеней; 1/360 — упрощённый ориентир по ст. 395 ГК РФ. В договоре может быть своя
            ставка.
          </li>
          <li>
            Ключевую ставку ЦБ проверяйте на сайте Банка России — в форме её можно изменить вручную.
          </li>
          <li>Расчёт справочный и не заменяет юридическую консультацию.</li>
        </ul>
      </details>
    </div>
  );
}
