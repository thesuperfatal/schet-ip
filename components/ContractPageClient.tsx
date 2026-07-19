"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ContractPreview from "@/components/ContractPreview";
import BikBankFields from "@/components/BikBankFields";
import DealNextSteps from "@/components/DealNextSteps";
import { amountToWords } from "@/lib/amountToWords";
import { emptyContract, type ContractData } from "@/lib/contractTypes";
import { buildDealUrl, readDealParams } from "@/lib/dealFlow";
import { downloadPdfFromElement } from "@/lib/generatePdf";
import { loadSeller, saveSeller } from "@/lib/storage";
import type { BuyerInfo, SellerInfo } from "@/lib/types";

export default function ContractPageClient() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ContractData>(emptyContract());
  const [requireFields, setRequireFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fromSource, setFromSource] = useState("");

  useEffect(() => {
    const saved = loadSeller();
    if (saved) {
      setData((prev) => ({ ...prev, executor: saved }));
    }

    const deal = readDealParams(new URLSearchParams(window.location.search));
    if (deal.from) setFromSource(deal.from);

    setData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        name: deal.buyer?.trim() || prev.customer.name,
        inn: deal.buyerInn?.trim() || prev.customer.inn,
        address: deal.buyerAddress?.trim() || prev.customer.address,
      },
      subject: deal.subject?.trim() || deal.item?.trim() || prev.subject,
      amount:
        deal.amount !== undefined
          ? deal.amount
          : deal.price !== undefined
            ? deal.price * (deal.qty && deal.qty > 0 ? deal.qty : 1)
            : prev.amount,
      vatNote: deal.vat?.trim() || prev.vatNote,
    }));
  }, []);

  function setExecutor(patch: Partial<SellerInfo>) {
    setData((prev) => ({ ...prev, executor: { ...prev.executor, ...patch } }));
  }

  function setCustomer(patch: Partial<BuyerInfo>) {
    setData((prev) => ({ ...prev, customer: { ...prev.customer, ...patch } }));
  }

  const schetHref = buildDealUrl(
    "/create/",
    "dogovor",
    {
      buyer: data.customer.name,
      buyerInn: data.customer.inn,
      buyerAddress: data.customer.address,
      item: data.subject,
      price: data.amount,
      qty: 1,
      unit: "усл",
      vat: data.vatNote,
      subject: data.subject,
      amount: data.amount,
    },
    { type: "schet" }
  );

  const aktHref = buildDealUrl(
    "/create/",
    "dogovor",
    {
      buyer: data.customer.name,
      buyerInn: data.customer.inn,
      buyerAddress: data.customer.address,
      item: data.subject,
      price: data.amount,
      qty: 1,
      unit: "усл",
      vat: data.vatNote,
      amount: data.amount,
    },
    { type: "akt" }
  );

  async function handleDownload() {
    setMessage("");

    if (
      requireFields &&
      (!data.executor.name || !data.customer.name || !data.subject.trim() || data.amount <= 0)
    ) {
      setMessage(
        "Заполните исполнителя, заказчика, предмет и сумму — или снимите галочку проверки."
      );
      return;
    }

    if (!pdfRef.current) return;

    setLoading(true);
    try {
      saveSeller(data.executor);
      await downloadPdfFromElement(
        pdfRef.current,
        `dogovor-${data.number || "1"}-${data.date}.pdf`
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
        <h1 className="text-3xl font-bold text-slate-900">Договор оказания услуг</h1>
        <p className="mt-2 text-slate-600">
          Простой шаблон в PDF · бесплатно · без регистрации
        </p>
      </div>

      {fromSource === "kp" && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Подставлено из КП: заказчик, предмет и сумма. Проверьте текст договора.
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Договор</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Номер" value={data.number} onChange={(v) => setData({ ...data, number: v })} />
              <Field label="Дата" value={data.date} onChange={(v) => setData({ ...data, date: v })} type="date" />
              <Field
                label="Город"
                value={data.city}
                onChange={(v) => setData({ ...data, city: v })}
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Исполнитель (ваши реквизиты)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Название / ФИО" value={data.executor.name} onChange={(v) => setExecutor({ name: v })} className="sm:col-span-2" />
              <Field label="ИНН" value={data.executor.inn} onChange={(v) => setExecutor({ inn: v })} />
              <Field label="КПП" value={data.executor.kpp} onChange={(v) => setExecutor({ kpp: v })} />
              <Field label="Адрес" value={data.executor.address} onChange={(v) => setExecutor({ address: v })} className="sm:col-span-2" />
              <BikBankFields
                bik={data.executor.bik}
                bank={data.executor.bank}
                corrAccount={data.executor.corrAccount}
                onChange={(patch) => setExecutor(patch)}
              />
              <Field label="Расчётный счёт" value={data.executor.account} onChange={(v) => setExecutor({ account: v })} />
              <Field label="Телефон" value={data.executor.phone} onChange={(v) => setExecutor({ phone: v })} />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Заказчик</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Название / ФИО" value={data.customer.name} onChange={(v) => setCustomer({ name: v })} className="sm:col-span-2" />
              <Field label="ИНН" value={data.customer.inn} onChange={(v) => setCustomer({ inn: v })} />
              <Field label="КПП" value={data.customer.kpp} onChange={(v) => setCustomer({ kpp: v })} />
              <Field label="Адрес" value={data.customer.address} onChange={(v) => setCustomer({ address: v })} className="sm:col-span-2" />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Услуги и оплата</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-slate-600">Предмет (какие услуги)</span>
                <textarea
                  value={data.subject}
                  onChange={(e) => setData({ ...data, subject: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  placeholder="например: консультационные услуги по ведению учёта"
                />
              </label>
              <Field
                label="Сумма, ₽"
                value={String(data.amount || "")}
                onChange={(v) => setData({ ...data, amount: Number(v) || 0 })}
                type="number"
              />
              <Field
                label="Оплата в течение (банковских дней)"
                value={String(data.paymentDays)}
                onChange={(v) => setData({ ...data, paymentDays: Number(v) || 0 })}
                type="number"
              />
              <Field
                label="Срок с"
                value={data.startDate}
                onChange={(v) => setData({ ...data, startDate: v })}
                type="date"
              />
              <Field
                label="Срок по"
                value={data.endDate}
                onChange={(v) => setData({ ...data, endDate: v })}
                type="date"
              />
              <Field
                label="НДС"
                value={data.vatNote}
                onChange={(v) => setData({ ...data, vatNote: v })}
                className="sm:col-span-2"
              />
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  Доп. условия (необязательно)
                </span>
                <textarea
                  value={data.extraTerms}
                  onChange={(e) => setData({ ...data, extraTerms: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  placeholder="например: результат передаётся по акту"
                />
              </label>
            </div>

            <p className="mt-4 text-right text-lg font-semibold">
              Сумма: {data.amount.toLocaleString("ru-RU", { minimumFractionDigits: 2 })} ₽
            </p>
            <p className="mt-1 text-right text-sm capitalize text-slate-600">
              {amountToWords(data.amount)}
            </p>
            <p className="mt-1 text-right text-xs text-slate-500">
              <Link href="/summa-propisyu/" className="text-blue-600 hover:underline">
                Сумма прописью
              </Link>
              {" · "}
              <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
                Выставить счёт
              </Link>
            </p>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                checked={requireFields}
                onChange={(e) => setRequireFields(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              <span className="text-sm text-slate-700">
                <span className="font-medium">Проверять заполнение полей</span>
                <span className="mt-0.5 block text-slate-500">
                  Снимите галочку, чтобы скачать PDF даже с пустыми полями
                </span>
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
                className={`mt-3 text-sm ${message.includes("успешно") ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
          </section>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4">
          <p className="mb-3 text-sm font-medium text-slate-600">Предпросмотр</p>
          <div className="inline-block origin-top-left scale-[0.55] sm:scale-[0.65] lg:scale-[0.7]">
            <ContractPreview data={data} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DealNextSteps
          steps={[
            {
              href: schetHref,
              label: "Выставить счёт",
              hint: "Сумма и заказчик из договора",
            },
            {
              href: aktHref,
              label: "Сделать акт",
              hint: "После выполнения работ",
            },
            {
              href: "/kp/",
              label: "Коммерческое предложение",
              hint: "Если нужно согласовать цены заново",
            },
          ]}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed overflow-hidden"
        style={{ left: "-10000px", top: 0, width: 794 }}
      >
        <ContractPreview data={data} previewRef={pdfRef} />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />
    </label>
  );
}
