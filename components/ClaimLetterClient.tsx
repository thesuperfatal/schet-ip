"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import BikBankFields from "@/components/BikBankFields";
import ClaimLetterPreview from "@/components/ClaimLetterPreview";
import FormField from "@/components/FormField";
import { formatMoney } from "@/lib/amountToWords";
import { claimPenalty, emptyClaimLetter, type ClaimLetterData } from "@/lib/claimLetterTypes";
import { downloadPdfFromElement } from "@/lib/generatePdf";
import { formatDateRu, type PenaltyMode } from "@/lib/paymentDeadline";
import { loadSeller, saveSeller } from "@/lib/storage";
import type { BuyerInfo, SellerInfo } from "@/lib/types";

function parseNum(value: string): number {
  return Number(String(value).replace(/\s/g, "").replace(",", ".")) || 0;
}

export default function ClaimLetterClient() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ClaimLetterData>(emptyClaimLetter());
  const [requireFields, setRequireFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [amountStr, setAmountStr] = useState("");
  const [keyRatePct, setKeyRatePct] = useState("16");
  const [customDayPct, setCustomDayPct] = useState("0.1");

  useEffect(() => {
    const saved = loadSeller();
    const params = new URLSearchParams(window.location.search);

    setData((prev) => {
      const next = { ...prev };
      if (saved) next.seller = saved;

      const buyer = params.get("buyer");
      const buyerInn = params.get("buyerInn");
      const buyerAddress = params.get("buyerAddress");
      if (buyer || buyerInn || buyerAddress) {
        next.buyer = {
          ...next.buyer,
          name: buyer?.trim() || next.buyer.name,
          inn: buyerInn?.trim() || next.buyer.inn,
          address: buyerAddress?.trim() || next.buyer.address,
        };
      }

      const num = params.get("num") || params.get("invoice");
      if (num) next.invoiceNumber = num;
      const invDate = params.get("date") || params.get("invoiceDate");
      if (invDate) next.invoiceDate = invDate;
      const deferral = params.get("deferral");
      if (deferral) next.deferralDays = Number(deferral) || next.deferralDays;
      const amount = params.get("amount") || params.get("price");
      if (amount) next.amount = parseNum(amount);
      return next;
    });

    const amount = params.get("amount") || params.get("price");
    if (amount) setAmountStr(amount);
  }, []);

  const result = useMemo(() => claimPenalty(data), [data]);

  function setSeller(patch: Partial<SellerInfo>) {
    setData((prev) => ({ ...prev, seller: { ...prev.seller, ...patch } }));
  }

  function setBuyer(patch: Partial<BuyerInfo>) {
    setData((prev) => ({ ...prev, buyer: { ...prev.buyer, ...patch } }));
  }

  async function handleDownload() {
    setMessage("");
    if (requireFields && (!data.seller.name.trim() || !data.buyer.name.trim() || data.amount <= 0)) {
      setMessage("Заполните отправителя, должника и сумму — или снимите галочку проверки.");
      return;
    }
    if (!pdfRef.current) return;

    setLoading(true);
    try {
      if (data.seller.name.trim()) saveSeller(data.seller);
      await downloadPdfFromElement(
        pdfRef.current,
        `pretenziya-${data.number || "1"}-${data.date}.pdf`
      );
      setMessage("PDF скачан успешно!");
    } catch {
      setMessage("Ошибка при создании PDF. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Претензия о просрочке оплаты</h1>
        <p className="mt-2 text-slate-600">
          Текст претензии с расчётом дней просрочки и пеней. Скачайте PDF и отправьте должнику.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Претензия</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Номер"
                value={data.number}
                onChange={(v) => setData({ ...data, number: v })}
              />
              <FormField
                label="Дата"
                value={data.date}
                onChange={(v) => setData({ ...data, date: v })}
                type="date"
              />
              <FormField
                label="Город"
                value={data.city}
                onChange={(v) => setData({ ...data, city: v })}
              />
              <FormField
                label="Срок на ответ, дней"
                value={String(data.demandDays)}
                onChange={(v) => setData({ ...data, demandDays: Number(v) || 0 })}
                type="number"
                hint="Сколько дней даёте на оплату после получения претензии"
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">От кого (ИП)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Название / ФИО"
                value={data.seller.name}
                onChange={(v) => setSeller({ name: v })}
                className="sm:col-span-2"
              />
              <FormField label="ИНН" value={data.seller.inn} onChange={(v) => setSeller({ inn: v })} />
              <FormField
                label="Телефон"
                value={data.seller.phone}
                onChange={(v) => setSeller({ phone: v })}
              />
              <FormField
                label="Адрес"
                value={data.seller.address}
                onChange={(v) => setSeller({ address: v })}
                className="sm:col-span-2"
              />
              <BikBankFields
                bik={data.seller.bik}
                bank={data.seller.bank}
                corrAccount={data.seller.corrAccount}
                onChange={(patch) => setSeller(patch)}
              />
              <FormField
                label="Расчётный счёт"
                value={data.seller.account}
                onChange={(v) => setSeller({ account: v })}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Кому (должник)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Название / ФИО"
                value={data.buyer.name}
                onChange={(v) => setBuyer({ name: v })}
                className="sm:col-span-2"
              />
              <FormField label="ИНН" value={data.buyer.inn} onChange={(v) => setBuyer({ inn: v })} />
              <FormField label="КПП" value={data.buyer.kpp} onChange={(v) => setBuyer({ kpp: v })} />
              <FormField
                label="Адрес"
                value={data.buyer.address}
                onChange={(v) => setBuyer({ address: v })}
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Счёт и просрочка</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Номер счёта"
                value={data.invoiceNumber}
                onChange={(v) => setData({ ...data, invoiceNumber: v })}
              />
              <FormField
                label="Дата счёта"
                value={data.invoiceDate}
                onChange={(v) => setData({ ...data, invoiceDate: v })}
                type="date"
              />
              <FormField
                label="Отсрочка, дней"
                value={String(data.deferralDays)}
                onChange={(v) => setData({ ...data, deferralDays: Number(v) || 0 })}
                type="number"
              />
              <FormField
                label="Считать просрочку на дату"
                value={data.asOfDate}
                onChange={(v) => setData({ ...data, asOfDate: v })}
                type="date"
              />
              <FormField
                label="Сумма долга, ₽"
                value={amountStr}
                onChange={(v) => {
                  setAmountStr(v);
                  setData((prev) => ({ ...prev, amount: parseNum(v) }));
                }}
                type="number"
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-slate-600">Расчёт пеней</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["key_300", "1/300 ставки ЦБ"],
                    ["key_360", "1/360 ставки ЦБ"],
                    ["custom_day", "Своя %/день"],
                  ] as const
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setData({ ...data, penaltyMode: mode as PenaltyMode })}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                      data.penaltyMode === mode
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {(data.penaltyMode === "key_300" || data.penaltyMode === "key_360") && (
                  <FormField
                    label="Ключевая ставка ЦБ, %"
                    value={keyRatePct}
                    onChange={(v) => {
                      setKeyRatePct(v);
                      setData((prev) => ({ ...prev, keyRate: parseNum(v) / 100 }));
                    }}
                    type="number"
                  />
                )}
                {data.penaltyMode === "custom_day" && (
                  <FormField
                    label="Ставка % в день"
                    value={customDayPct}
                    onChange={(v) => {
                      setCustomDayPct(v);
                      setData((prev) => ({ ...prev, customDailyRate: parseNum(v) / 100 }));
                    }}
                    type="number"
                  />
                )}
              </div>
            </div>

            {result.dueDateValid && (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                <p>
                  Срок оплаты: <strong>{formatDateRu(result.dueDate)}</strong>
                </p>
                {result.isOverdue ? (
                  <p className="mt-1">
                    Просрочка: <strong>{result.overdueDays} дн.</strong>
                    {result.penalty > 0
                      ? ` · пени ≈ ${formatMoney(result.penalty)} ₽`
                      : ""}
                  </p>
                ) : (
                  <p className="mt-1 text-slate-500">На выбранную дату просрочки нет</p>
                )}
              </div>
            )}

            <label className="mt-4 block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Дополнительный текст
              </span>
              <textarea
                value={data.extraText}
                onChange={(e) => setData({ ...data, extraText: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="Ссылка на договор, акт и т.п."
              />
            </label>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                checked={requireFields}
                onChange={(e) => setRequireFields(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              <span className="text-sm text-slate-700">
                <span className="font-medium">Проверять заполнение полей</span>
              </span>
            </label>

            <button
              type="button"
              onClick={handleDownload}
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Создаём PDF..." : "Скачать PDF"}
            </button>
            {message && (
              <p
                className={`mt-3 text-sm ${
                  message.includes("успешно") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </section>

          <p className="text-sm text-slate-600">
            Сначала посчитать пени:{" "}
            <Link href="/srok-oplaty/" className="text-blue-600 hover:underline">
              срок оплаты и пени
            </Link>
            . Выставить новый счёт:{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              генератор счетов
            </Link>
            .
          </p>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4">
          <p className="mb-3 text-sm font-medium text-slate-600">Предпросмотр</p>
          <div className="inline-block origin-top-left scale-[0.55] sm:scale-[0.65] lg:scale-[0.75]">
            <ClaimLetterPreview data={data} />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed overflow-hidden"
        style={{ left: "-10000px", top: 0, width: 794 }}
      >
        <ClaimLetterPreview data={data} previewRef={pdfRef} />
      </div>
    </div>
  );
}
