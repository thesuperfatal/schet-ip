"use client";

import { useEffect, useRef, useState } from "react";
import DocumentPreview from "@/components/DocumentPreview";
import { downloadPdfFromElement } from "@/lib/generatePdf";
import {
  canCreateDocument,
  getRemainingDocs,
  incrementDocCount,
  loadSeller,
  saveSeller,
} from "@/lib/storage";
import {
  emptyBuyer,
  emptyItem,
  emptySeller,
  type BuyerInfo,
  type DocumentData,
  type DocumentType,
  type LineItem,
  type SellerInfo,
} from "@/lib/types";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function getTypeFromUrl(): DocumentType {
  if (typeof window === "undefined") return "schet";
  const value = new URLSearchParams(window.location.search).get("type");
  return value === "akt" ? "akt" : "schet";
}

export default function CreatePageClient() {
  const [type, setType] = useState<DocumentType>("schet");
  const pdfRef = useRef<HTMLDivElement>(null);

  const [seller, setSeller] = useState<SellerInfo>(emptySeller());
  const [buyer, setBuyer] = useState<BuyerInfo>(emptyBuyer());
  const [items, setItems] = useState<LineItem[]>([emptyItem()]);
  const [number, setNumber] = useState("1");
  const [date, setDate] = useState(todayIso());
  const [vatNote, setVatNote] = useState("Без НДС.");
  const [remaining, setRemaining] = useState(3);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setType(getTypeFromUrl());
    const saved = loadSeller();
    if (saved) setSeller(saved);
    setRemaining(getRemainingDocs());
  }, []);

  const documentData: DocumentData = {
    type,
    number,
    date,
    seller,
    buyer,
    items,
    vatNote,
  };

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function removeItem(id: string) {
    setItems((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  }

  async function handleDownload() {
    setMessage("");
    if (!seller.name || !buyer.name || items.some((i) => !i.name)) {
      setMessage("Заполните продавца, покупателя и все позиции.");
      return;
    }

    if (!canCreateDocument()) {
      setMessage("Лимит бесплатных документов исчерпан (3 в месяц).");
      return;
    }

    if (!pdfRef.current) return;

    setLoading(true);
    try {
      saveSeller(seller);
      const filename =
        type === "schet"
          ? `schet-${number}-${date}.pdf`
          : `akt-${number}-${date}.pdf`;
      await downloadPdfFromElement(pdfRef.current, filename);
      incrementDocCount();
      setRemaining(getRemainingDocs());
      setMessage("PDF скачан успешно!");
    } catch {
      setMessage("Ошибка при создании PDF. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  const pageTitle = type === "schet" ? "Создать счёт" : "Создать акт";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{pageTitle}</h1>
        <p className="mt-2 text-slate-600">
          Бесплатно осталось документов в этом месяце: <strong>{remaining}</strong>
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Ваши реквизиты (ИП)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Название / ФИО" value={seller.name} onChange={(v) => setSeller({ ...seller, name: v })} className="sm:col-span-2" />
              <Field label="ИНН" value={seller.inn} onChange={(v) => setSeller({ ...seller, inn: v })} />
              <Field label="КПП" value={seller.kpp} onChange={(v) => setSeller({ ...seller, kpp: v })} />
              <Field label="Адрес" value={seller.address} onChange={(v) => setSeller({ ...seller, address: v })} className="sm:col-span-2" />
              <Field label="Банк" value={seller.bank} onChange={(v) => setSeller({ ...seller, bank: v })} className="sm:col-span-2" />
              <Field label="БИК" value={seller.bik} onChange={(v) => setSeller({ ...seller, bik: v })} />
              <Field label="Расчётный счёт" value={seller.account} onChange={(v) => setSeller({ ...seller, account: v })} />
              <Field label="Корр. счёт" value={seller.corrAccount} onChange={(v) => setSeller({ ...seller, corrAccount: v })} />
              <Field label="Телефон" value={seller.phone} onChange={(v) => setSeller({ ...seller, phone: v })} />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Покупатель</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Название / ФИО" value={buyer.name} onChange={(v) => setBuyer({ ...buyer, name: v })} className="sm:col-span-2" />
              <Field label="ИНН" value={buyer.inn} onChange={(v) => setBuyer({ ...buyer, inn: v })} />
              <Field label="КПП" value={buyer.kpp} onChange={(v) => setBuyer({ ...buyer, kpp: v })} />
              <Field label="Адрес" value={buyer.address} onChange={(v) => setBuyer({ ...buyer, address: v })} className="sm:col-span-2" />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Документ</h2>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <Field label="Номер" value={number} onChange={setNumber} />
              <Field label="Дата" value={date} onChange={setDate} type="date" />
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="mb-2 text-sm font-medium text-slate-700">Позиция {index + 1}</p>
                  <div className="grid gap-2 sm:grid-cols-4">
                    <Field label="Наименование" value={item.name} onChange={(v) => updateItem(item.id, { name: v })} className="sm:col-span-4" />
                    <Field label="Ед." value={item.unit} onChange={(v) => updateItem(item.id, { unit: v })} />
                    <Field label="Кол-во" value={String(item.qty)} onChange={(v) => updateItem(item.id, { qty: Number(v) || 0 })} type="number" />
                    <Field label="Цена" value={String(item.price)} onChange={(v) => updateItem(item.id, { price: Number(v) || 0 })} type="number" />
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
              + Добавить позицию
            </button>

            <div className="mt-4">
              <Field label="НДС" value={vatNote} onChange={setVatNote} className="sm:col-span-2" />
            </div>

            <p className="mt-4 text-right text-lg font-semibold">
              Итого: {total.toLocaleString("ru-RU", { minimumFractionDigits: 2 })} ₽
            </p>

            <button
              type="button"
              onClick={handleDownload}
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Создаём PDF..." : "Скачать PDF"}
            </button>

            {message && (
              <p className={`mt-3 text-sm ${message.includes("успешно") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </section>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4">
          <p className="mb-3 text-sm font-medium text-slate-600">Предпросмотр</p>
          <div className="inline-block origin-top-left scale-[0.55] sm:scale-[0.65] lg:scale-[0.75]">
            <DocumentPreview data={documentData} />
          </div>
        </div>
      </div>

      {/* Полноразмерный блок вне scale — html2canvas не работает с transform */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed overflow-hidden"
        style={{ left: "-10000px", top: 0, width: 794 }}
      >
        <DocumentPreview data={documentData} previewRef={pdfRef} />
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
