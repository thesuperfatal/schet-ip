"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BikBankFields from "@/components/BikBankFields";
import FormField from "@/components/FormField";
import RekvizityPreview from "@/components/RekvizityPreview";
import { downloadPdfFromElement } from "@/lib/generatePdf";
import { copyText, paymentPurpose } from "@/lib/paymentPurpose";
import { loadSeller, saveSeller } from "@/lib/storage";
import { emptySeller, type SellerInfo } from "@/lib/types";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatPlainText(seller: SellerInfo, purpose: string): string {
  const lines = [
    "Реквизиты для оплаты",
    "",
    seller.name && `Получатель: ${seller.name}`,
    seller.inn && `ИНН: ${seller.inn}`,
    seller.kpp && `КПП: ${seller.kpp}`,
    seller.bank && `Банк: ${seller.bank}`,
    seller.bik && `БИК: ${seller.bik}`,
    seller.corrAccount && `Корр. счёт: ${seller.corrAccount}`,
    seller.account && `Р/с: ${seller.account}`,
    seller.address && `Адрес: ${seller.address}`,
    seller.phone && `Телефон: ${seller.phone}`,
    purpose && "",
    purpose && `Назначение платежа: ${purpose}`,
  ].filter((x): x is string => Boolean(x) || x === "");
  return lines.join("\n").trim();
}

export default function RekvizityClient() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [seller, setSeller] = useState<SellerInfo>(emptySeller());
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(todayIso());
  const [amount, setAmount] = useState("");
  const [vatNote, setVatNote] = useState("Без НДС.");
  const [requireFields, setRequireFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = loadSeller();
    if (saved) setSeller(saved);

    const params = new URLSearchParams(window.location.search);
    const num = params.get("num");
    const date = params.get("date");
    const price = params.get("amount") || params.get("price");
    const vat = params.get("vat");
    if (num) setInvoiceNumber(num);
    if (date) setInvoiceDate(date);
    if (price) setAmount(price);
    if (vat) setVatNote(vat);
  }, []);

  const amountNum = Number(String(amount).replace(/\s/g, "").replace(",", ".")) || 0;
  const purpose = invoiceNumber.trim()
    ? paymentPurpose({
        type: "schet",
        number: invoiceNumber,
        date: invoiceDate,
        total: amountNum > 0 ? amountNum : undefined,
        vatNote,
      })
    : "";

  async function handleDownload() {
    setMessage("");
    if (requireFields && (!seller.name.trim() || !seller.account.trim() || !seller.bik.trim())) {
      setMessage("Заполните получателя, БИК и расчётный счёт — или снимите галочку проверки.");
      return;
    }
    if (!pdfRef.current) return;

    setLoading(true);
    try {
      saveSeller(seller);
      await downloadPdfFromElement(pdfRef.current, `rekvizity-${seller.inn || "ip"}.pdf`);
      setMessage("PDF скачан успешно!");
    } catch {
      setMessage("Ошибка при создании PDF. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    const ok = await copyText(formatPlainText(seller, purpose));
    setMessage(ok ? "Реквизиты скопированы в буфер" : "Не удалось скопировать");
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Реквизиты для оплаты</h1>
        <p className="mt-2 text-slate-600">
          Карточка банковских реквизитов для клиента: PDF, печать или копирование текстом.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Скопировать текст
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Печать
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 print:block">
        <div className="space-y-6 print:hidden">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Ваши реквизиты</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Получатель (ИП)"
                value={seller.name}
                onChange={(v) => setSeller({ ...seller, name: v })}
                className="sm:col-span-2"
              />
              <FormField
                label="ИНН"
                value={seller.inn}
                onChange={(v) => setSeller({ ...seller, inn: v })}
              />
              <FormField
                label="КПП"
                value={seller.kpp}
                onChange={(v) => setSeller({ ...seller, kpp: v })}
                hint="У ИП часто пусто"
              />
              <FormField
                label="Адрес"
                value={seller.address}
                onChange={(v) => setSeller({ ...seller, address: v })}
                className="sm:col-span-2"
              />
              <BikBankFields
                bik={seller.bik}
                bank={seller.bank}
                corrAccount={seller.corrAccount}
                onChange={(patch) => setSeller((prev) => ({ ...prev, ...patch }))}
              />
              <FormField
                label="Расчётный счёт"
                value={seller.account}
                onChange={(v) => setSeller({ ...seller, account: v })}
              />
              <FormField
                label="Телефон"
                value={seller.phone}
                onChange={(v) => setSeller({ ...seller, phone: v })}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Назначение платежа (по желанию)</h2>
            <p className="mb-3 text-sm text-slate-500">
              Если укажете номер счёта — фраза попадёт в карточку. Или оставьте пустым.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label="Номер счёта" value={invoiceNumber} onChange={setInvoiceNumber} />
              <FormField
                label="Дата счёта"
                value={invoiceDate}
                onChange={setInvoiceDate}
                type="date"
              />
              <FormField label="Сумма, ₽" value={amount} onChange={setAmount} type="number" />
              <FormField label="НДС" value={vatNote} onChange={setVatNote} />
            </div>
            {purpose && (
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">{purpose}</p>
            )}

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
                  message.includes("успешно") || message.includes("скопирован")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </section>

          <p className="text-sm text-slate-600">
            Нужен полноценный счёт:{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              создать счёт
            </Link>
            . Только реквизиты:{" "}
            <Link href="/rekvizity/" className="text-blue-600 hover:underline">
              карточка для оплаты
            </Link>
            . Назначение платежа подробнее:{" "}
            <Link href="/articles/naznachenie-platezha/" className="text-blue-600 hover:underline">
              статья
            </Link>
            .
          </p>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4 print:border-0 print:bg-white print:p-0">
          <p className="mb-3 text-sm font-medium text-slate-600 print:hidden">Предпросмотр</p>
          <div className="inline-block origin-top-left scale-[0.55] sm:scale-[0.65] lg:scale-[0.75] print:scale-100">
            <RekvizityPreview seller={seller} purpose={purpose} />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed overflow-hidden"
        style={{ left: "-10000px", top: 0, width: 794 }}
      >
        <RekvizityPreview seller={seller} purpose={purpose} previewRef={pdfRef} />
      </div>
    </div>
  );
}
