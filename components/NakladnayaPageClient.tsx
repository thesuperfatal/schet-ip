"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NakladnayaPreview from "@/components/NakladnayaPreview";
import { amountToWords } from "@/lib/amountToWords";
import { downloadPdfFromElement } from "@/lib/generatePdf";
import { emptyNakladnaya, type NakladnayaData, type NakladnayaKind } from "@/lib/nakladnayaTypes";
import { loadSeller, saveSeller } from "@/lib/storage";
import { emptyItem, type BuyerInfo, type LineItem, type SellerInfo } from "@/lib/types";

export default function NakladnayaPageClient() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<NakladnayaData>(emptyNakladnaya());
  const [requireFields, setRequireFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = loadSeller();
    if (saved) {
      setData((prev) => ({ ...prev, seller: saved }));
    }
  }, []);

  function setSeller(patch: Partial<SellerInfo>) {
    setData((prev) => ({ ...prev, seller: { ...prev.seller, ...patch } }));
  }

  function setBuyer(patch: Partial<BuyerInfo>) {
    setData((prev) => ({ ...prev, buyer: { ...prev.buyer, ...patch } }));
  }

  function setKind(kind: NakladnayaKind) {
    setData((prev) => ({ ...prev, kind }));
  }

  function updateItem(id: string, patch: Partial<LineItem>) {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    setData((prev) => ({ ...prev, items: [...prev.items, emptyItem()] }));
  }

  function removeItem(id: string) {
    setData((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }));
  }

  const total = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  async function handleDownload() {
    setMessage("");

    if (
      requireFields &&
      (!data.seller.name || !data.buyer.name || data.items.some((i) => !i.name))
    ) {
      setMessage(
        "Заполните поставщика, покупателя и все позиции — или снимите галочку проверки."
      );
      return;
    }

    if (!pdfRef.current) return;

    setLoading(true);
    try {
      saveSeller(data.seller);
      const prefix = data.kind === "upd" ? "upd" : "nakladnaya";
      await downloadPdfFromElement(
        pdfRef.current,
        `${prefix}-${data.number || "1"}-${data.date}.pdf`
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
        <h1 className="text-3xl font-bold text-slate-900">Товарная накладная / УПД</h1>
        <p className="mt-2 text-slate-600">
          Простой PDF для отгрузки товара · бесплатно · без регистрации
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <KindButton
          active={data.kind === "nakladnaya"}
          onClick={() => setKind("nakladnaya")}
          label="Товарная накладная"
        />
        <KindButton active={data.kind === "upd"} onClick={() => setKind("upd")} label="УПД" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Поставщик (ваши реквизиты)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Название / ФИО" value={data.seller.name} onChange={(v) => setSeller({ name: v })} className="sm:col-span-2" />
              <Field label="ИНН" value={data.seller.inn} onChange={(v) => setSeller({ inn: v })} />
              <Field label="КПП" value={data.seller.kpp} onChange={(v) => setSeller({ kpp: v })} />
              <Field label="Адрес" value={data.seller.address} onChange={(v) => setSeller({ address: v })} className="sm:col-span-2" />
              <Field label="Банк" value={data.seller.bank} onChange={(v) => setSeller({ bank: v })} className="sm:col-span-2" />
              <Field label="БИК" value={data.seller.bik} onChange={(v) => setSeller({ bik: v })} />
              <Field label="Расчётный счёт" value={data.seller.account} onChange={(v) => setSeller({ account: v })} />
              <Field label="Корр. счёт" value={data.seller.corrAccount} onChange={(v) => setSeller({ corrAccount: v })} />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Покупатель / грузополучатель</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Название / ФИО" value={data.buyer.name} onChange={(v) => setBuyer({ name: v })} className="sm:col-span-2" />
              <Field label="ИНН" value={data.buyer.inn} onChange={(v) => setBuyer({ inn: v })} />
              <Field label="КПП" value={data.buyer.kpp} onChange={(v) => setBuyer({ kpp: v })} />
              <Field label="Адрес" value={data.buyer.address} onChange={(v) => setBuyer({ address: v })} className="sm:col-span-2" />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Документ и товары</h2>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <Field label="Номер" value={data.number} onChange={(v) => setData({ ...data, number: v })} />
              <Field label="Дата" value={data.date} onChange={(v) => setData({ ...data, date: v })} type="date" />
              <Field
                label="Основание (договор / счёт)"
                value={data.basis}
                onChange={(v) => setData({ ...data, basis: v })}
                className="sm:col-span-2"
              />
            </div>

            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="mb-2 text-sm font-medium text-slate-700">Товар {index + 1}</p>
                  <div className="grid gap-2 sm:grid-cols-4">
                    <Field
                      label="Наименование"
                      value={item.name}
                      onChange={(v) => updateItem(item.id, { name: v })}
                      className="sm:col-span-4"
                    />
                    <Field label="Ед." value={item.unit} onChange={(v) => updateItem(item.id, { unit: v })} />
                    <Field
                      label="Кол-во"
                      value={String(item.qty)}
                      onChange={(v) => updateItem(item.id, { qty: Number(v) || 0 })}
                      type="number"
                    />
                    <Field
                      label="Цена"
                      value={String(item.price)}
                      onChange={(v) => updateItem(item.id, { price: Number(v) || 0 })}
                      type="number"
                    />
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-full rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-3 rounded-lg border border-blue-200 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
            >
              + Добавить товар
            </button>

            <div className="mt-4">
              <Field label="НДС" value={data.vatNote} onChange={(v) => setData({ ...data, vatNote: v })} />
              <p className="mt-1 text-xs text-slate-500">
                <Link href="/nds/" className="text-blue-600 hover:underline">
                  Рассчитать НДС
                </Link>
              </p>
            </div>

            <p className="mt-4 text-right text-lg font-semibold">
              Итого: {total.toLocaleString("ru-RU", { minimumFractionDigits: 2 })} ₽
            </p>
            <p className="mt-1 text-right text-sm capitalize text-slate-600">{amountToWords(total)}</p>

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
            <NakladnayaPreview data={data} />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed overflow-hidden"
        style={{ left: "-10000px", top: 0, width: 794 }}
      >
        <NakladnayaPreview data={data} previewRef={pdfRef} />
      </div>
    </div>
  );
}

function KindButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-medium ${
        active
          ? "bg-blue-600 text-white"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
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
