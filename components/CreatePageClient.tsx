"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DocumentPreview from "@/components/DocumentPreview";
import BikBankFields from "@/components/BikBankFields";
import FormField from "@/components/FormField";
import { downloadPdfFromElement } from "@/lib/generatePdf";
import { amountToWords } from "@/lib/amountToWords";
import { exampleBuyer, exampleItems, exampleSeller } from "@/lib/examples";
import {
  buildDealUrl,
  dealFromItems,
  decodeShareItems,
  readDealParams,
} from "@/lib/dealFlow";
import DealNextSteps from "@/components/DealNextSteps";
import DocHistory from "@/components/DocHistory";
import {
  clearDocHistory,
  loadDocHistory,
  removeDocFromHistory,
  saveDocToHistory,
  suggestNextNumber,
  type DocHistoryEntry,
} from "@/lib/docHistory";
import { loadBuyers, removeBuyer, saveBuyer } from "@/lib/buyers";
import { copyText, paymentPurpose } from "@/lib/paymentPurpose";
import { SERVICE_TEMPLATES } from "@/lib/serviceTemplates";
import { SITE_URL } from "@/lib/site";
import { loadSeller, saveSeller } from "@/lib/storage";
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
  const [requireFields, setRequireFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fromNds, setFromNds] = useState(false);
  const [fromSource, setFromSource] = useState("");
  const [history, setHistory] = useState<DocHistoryEntry[]>([]);
  const [buyers, setBuyers] = useState<BuyerInfo[]>([]);

  useEffect(() => {
    const docType = getTypeFromUrl();
    setType(docType);
    const hist = loadDocHistory();
    setHistory(hist);
    setBuyers(loadBuyers());
    const saved = loadSeller();
    if (saved) setSeller(saved);

    const params = new URLSearchParams(window.location.search);
    const deal = readDealParams(params);
    const from = deal.from || params.get("from") || "";

    if (deal.vat) setVatNote(deal.vat);
    if (deal.number) {
      setNumber(deal.number);
    } else {
      setNumber(suggestNextNumber(docType, hist));
    }
    if (deal.date) setDate(deal.date);

    if (deal.buyer || deal.buyerInn || deal.buyerKpp || deal.buyerAddress) {
      setBuyer((prev) => ({
        ...prev,
        name: deal.buyer?.trim() || prev.name,
        inn: deal.buyerInn?.trim() || prev.inn,
        kpp: deal.buyerKpp?.trim() || prev.kpp,
        address: deal.buyerAddress?.trim() || prev.address,
      }));
    }

    const sharedItems = decodeShareItems(deal.itemsJson);
    if (sharedItems && sharedItems.length > 0) {
      setItems(
        sharedItems.map((row) => ({
          ...emptyItem(),
          name: row.name,
          unit: row.unit,
          qty: row.qty,
          price: row.price,
        }))
      );
    } else if (deal.price !== undefined || deal.item) {
      setItems((prev) => {
        const first = prev[0] ?? emptyItem();
        return [
          {
            ...first,
            price: deal.price !== undefined ? deal.price : first.price,
            name: deal.item?.trim() || first.name,
            qty: deal.qty && deal.qty > 0 ? deal.qty : first.qty || 1,
            unit: deal.unit?.trim() || first.unit,
          },
          ...prev.slice(1),
        ];
      });
    }

    if (from === "nds" && (deal.vat || deal.price !== undefined)) {
      setFromNds(true);
    }
    if (from === "kp" || from === "dogovor" || from === "schet" || from === "share") {
      setFromSource(from);
    }
  }, []);

  function fillExample() {
    setSeller(exampleSeller());
    setBuyer(exampleBuyer());
    setItems(exampleItems());
    setNumber("1");
    setDate(todayIso());
    setVatNote("Без НДС.");
    setMessage("Подставлен пример — можете править и скачать PDF");
  }

  function openFromHistory(entry: DocHistoryEntry) {
    const d = entry.data;
    setType(d.type);
    setSeller(d.seller);
    setBuyer(d.buyer);
    setItems(d.items.length > 0 ? d.items : [emptyItem()]);
    setNumber(d.number || "1");
    setDate(d.date || todayIso());
    setVatNote(d.vatNote || "Без НДС.");
    setFromNds(false);
    setFromSource("");
    setMessage(
      d.type === "akt"
        ? "Открыт акт из истории — можно править и скачать снова"
        : "Открыт счёт из истории — можно править и скачать снова"
    );
    const url = new URL(window.location.href);
    url.searchParams.set("type", d.type);
    window.history.replaceState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
  const dealPayload = dealFromItems({
    clientName: buyer.name,
    clientInn: buyer.inn,
    clientKpp: buyer.kpp,
    clientAddress: buyer.address,
    vatNote,
    items,
    number,
    date,
  });
  const nextAktHref = buildDealUrl("/create/", "schet", dealPayload, { type: "akt" });
  const nextSchetHref = buildDealUrl("/create/", type, dealPayload, { type: "schet" });
  const nextDogovorHref = buildDealUrl("/dogovor/", type === "akt" ? "akt" : "schet", dealPayload);
  const purposeText = paymentPurpose({
    type,
    number,
    date,
    total,
    vatNote,
  });

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function removeItem(id: string) {
    setItems((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  }

  async function handleCopyLink() {
    const path = buildDealUrl("/create/", "share", dealPayload, { type });
    const absolute = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const ok = await copyText(absolute);
    setMessage(ok ? "Ссылка скопирована — можно открыть на другом устройстве" : "Не удалось скопировать ссылку");
  }

  async function handleCopyPurpose() {
    const ok = await copyText(purposeText);
    setMessage(ok ? "Назначение платежа скопировано" : "Не удалось скопировать текст");
  }

  function handlePrint() {
    window.print();
  }

  async function handleDownload() {
    setMessage("");

    if (requireFields && (!seller.name || !buyer.name || items.some((i) => !i.name))) {
      setMessage("Заполните продавца, покупателя и все позиции — или снимите галочку проверки.");
      return;
    }

    if (!pdfRef.current) return;

    setLoading(true);
    try {
      saveSeller(seller);
      if (buyer.name.trim()) {
        setBuyers(saveBuyer(buyer));
      }
      const filename =
        type === "schet"
          ? `schet-${number}-${date}.pdf`
          : `akt-${number}-${date}.pdf`;
      await downloadPdfFromElement(pdfRef.current, filename);
      const nextHist = saveDocToHistory(documentData);
      setHistory(nextHist);
      setNumber(suggestNextNumber(type, nextHist));
      setMessage("PDF скачан успешно! Документ и покупатель сохранены. Номер увеличен.");
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
        <p className="mt-2 text-slate-600">Бесплатно · без лимитов · без регистрации</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={fillExample}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Заполнить пример
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Скопировать ссылку
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 print:hidden"
        >
          Печать
        </button>
        <p className="text-sm text-slate-500 print:hidden">
          Ссылка открывает форму с теми же полями на другом устройстве
        </p>
      </div>

      <DocHistory
        entries={history}
        onOpen={openFromHistory}
        onRemove={(id) => setHistory(removeDocFromHistory(id))}
        onClear={() => {
          clearDocHistory();
          setHistory([]);
          setMessage("История документов очищена");
        }}
      />

      {fromNds && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Подставлено из{" "}
          <Link href="/nds/" className="font-medium text-blue-700 hover:underline">
            калькулятора НДС
          </Link>
          : поле «НДС» и сумма первой позиции. Проверьте наименование и реквизиты.
        </div>
      )}

      {fromSource === "kp" && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Подставлено из{" "}
          <Link href="/kp/" className="font-medium text-blue-700 hover:underline">
            коммерческого предложения
          </Link>
          : покупатель и позиция. Проверьте реквизиты.
        </div>
      )}

      {fromSource === "dogovor" && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Подставлено из{" "}
          <Link href="/dogovor/" className="font-medium text-blue-700 hover:underline">
            договора
          </Link>
          : заказчик, предмет и сумма.
        </div>
      )}

      {fromSource === "schet" && type === "akt" && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Подставлено из счёта: те же стороны и позиции. Можно скачать акт.
        </div>
      )}

      {fromSource === "share" && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          Открыто по ссылке — поля подставлены. Проверьте данные и скачайте PDF.
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2 print:block">
        <div className="space-y-6 print:hidden">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Ваши реквизиты (ИП)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label="Название / ФИО" value={seller.name} onChange={(v) => setSeller({ ...seller, name: v })} className="sm:col-span-2" hint="Как в банковских реквизитах или ЕГРИП" />
              <FormField label="ИНН" value={seller.inn} onChange={(v) => setSeller({ ...seller, inn: v })} hint="У ИП обычно 12 цифр" />
              <FormField label="КПП" value={seller.kpp} onChange={(v) => setSeller({ ...seller, kpp: v })} hint="У ИП часто не заполняют" />
              <FormField label="Адрес" value={seller.address} onChange={(v) => setSeller({ ...seller, address: v })} className="sm:col-span-2" />
              <BikBankFields
                bik={seller.bik}
                bank={seller.bank}
                corrAccount={seller.corrAccount}
                onChange={(patch) => setSeller((prev) => ({ ...prev, ...patch }))}
              />
              <FormField label="Расчётный счёт" value={seller.account} onChange={(v) => setSeller({ ...seller, account: v })} hint="20 цифр, начинается с 40802 у многих ИП" />
              <FormField label="Телефон" value={seller.phone} onChange={(v) => setSeller({ ...seller, phone: v })} />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Покупатель</h2>
            {buyers.length > 0 && (
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Выбрать из сохранённых
                </label>
                <div className="flex flex-wrap gap-2">
                  <select
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    defaultValue=""
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      if (Number.isNaN(idx) || idx < 0) return;
                      const picked = buyers[idx];
                      if (picked) {
                        setBuyer(picked);
                        setMessage("Покупатель подставлен из списка");
                      }
                      e.target.value = "";
                    }}
                  >
                    <option value="">— выбрать покупателя —</option>
                    {buyers.map((b, i) => (
                      <option key={`${b.name}-${b.inn}-${i}`} value={i}>
                        {b.name}
                        {b.inn ? ` · ИНН ${b.inn}` : ""}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (!buyer.name.trim()) return;
                      setBuyers(removeBuyer(buyer.name, buyer.inn));
                      setMessage("Покупатель удалён из списка");
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-red-200 hover:text-red-600"
                    title="Удалить текущего из списка"
                  >
                    Удалить из списка
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Список пополняется при скачивании PDF
                </p>
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label="Название / ФИО" value={buyer.name} onChange={(v) => setBuyer({ ...buyer, name: v })} className="sm:col-span-2" />
              <FormField label="ИНН" value={buyer.inn} onChange={(v) => setBuyer({ ...buyer, inn: v })} />
              <FormField label="КПП" value={buyer.kpp} onChange={(v) => setBuyer({ ...buyer, kpp: v })} />
              <FormField label="Адрес" value={buyer.address} onChange={(v) => setBuyer({ ...buyer, address: v })} className="sm:col-span-2" />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Документ</h2>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <FormField
                  label="Номер"
                  value={number}
                  onChange={setNumber}
                  hint="Подставляется следующий по истории в этом браузере"
                />
                <button
                  type="button"
                  onClick={() => {
                    setNumber(suggestNextNumber(type, history));
                    setMessage("Подставлен следующий номер по истории");
                  }}
                  className="mt-1 text-xs text-blue-600 hover:underline"
                >
                  Взять следующий номер
                </button>
              </div>
              <FormField label="Дата" value={date} onChange={setDate} type="date" />
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <p className="mb-2 text-sm font-medium text-slate-700">Позиция {index + 1}</p>
                  <div className="grid gap-2 sm:grid-cols-4">
                    <FormField label="Наименование" value={item.name} onChange={(v) => updateItem(item.id, { name: v })} className="sm:col-span-4" hint="Что оплачивает клиент" />
                    <FormField label="Ед." value={item.unit} onChange={(v) => updateItem(item.id, { unit: v })} />
                    <FormField label="Кол-во" value={String(item.qty)} onChange={(v) => updateItem(item.id, { qty: Number(v) || 0 })} type="number" />
                    <FormField label="Цена" value={String(item.price)} onChange={(v) => updateItem(item.id, { price: Number(v) || 0 })} type="number" />
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

            <div className="mt-3">
              <p className="mb-1.5 text-xs text-slate-500">Быстрый шаблон в первую позицию:</p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.label}
                    type="button"
                    onClick={() => {
                      setItems((prev) => {
                        const rest = prev.slice(1);
                        const first = prev[0] ?? emptyItem();
                        return [
                          {
                            ...first,
                            name: tpl.name,
                            unit: tpl.unit,
                            qty: tpl.qty,
                            price: tpl.price,
                          },
                          ...rest,
                        ];
                      });
                      setMessage(`Шаблон «${tpl.label}» подставлен — цену можно изменить`);
                    }}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 hover:border-blue-300 hover:text-blue-700"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <FormField
                label="НДС"
                value={vatNote}
                onChange={setVatNote}
                className="sm:col-span-2"
                hint="Например: «Без НДС.» или «В т.ч. НДС 22%: …»"
              />
              <p className="mt-1 text-xs text-slate-500">
                <Link href="/nds/" className="text-blue-600 hover:underline">
                  Рассчитать НДС в калькуляторе
                </Link>{" "}
                — фраза и сумма подставятся сами
              </p>
            </div>

            <p className="mt-4 text-right text-lg font-semibold">
              Итого: {total.toLocaleString("ru-RU", { minimumFractionDigits: 2 })} ₽
            </p>
            <p className="mt-1 text-right text-sm capitalize text-slate-600">
              {amountToWords(total)}
            </p>
            <p className="mt-1 text-right text-xs text-slate-500">
              <Link href="/summa-propisyu/" className="text-blue-600 hover:underline">
                Сумма прописью — отдельный инструмент
              </Link>
            </p>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-800">Назначение платежа</p>
                <button
                  type="button"
                  onClick={handleCopyPurpose}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-slate-200 hover:bg-blue-50"
                >
                  Скопировать
                </button>
              </div>
              <p className="text-sm text-slate-700">{purposeText}</p>
              <p className="mt-1 text-xs text-slate-500">
                Вставьте в банк при оплате или отправьте клиенту
              </p>
            </div>

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
                className={`mt-3 text-sm ${
                  message.includes("успешно") ||
                  message.includes("Открыт") ||
                  message.includes("пример") ||
                  message.includes("очищена") ||
                  message.includes("скопирован") ||
                  message.includes("подставлен") ||
                  message.includes("удалён") ||
                  message.includes("номер") ||
                  message.includes("Шаблон")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </section>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4 print:border-0 print:bg-white print:p-0">
          <p className="mb-3 text-sm font-medium text-slate-600 print:hidden">Предпросмотр</p>
          <div className="inline-block origin-top-left scale-[0.55] sm:scale-[0.65] lg:scale-[0.75] print:scale-100">
            <DocumentPreview data={documentData} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl print:hidden">
        <DealNextSteps
          steps={
            type === "schet"
              ? [
                  {
                    href: nextAktHref,
                    label: "Сделать акт",
                    hint: "Те же стороны и позиции — закрыть сделку",
                  },
                  {
                    href: nextDogovorHref,
                    label: "Оформить договор",
                    hint: "Если нужен договор по этой сумме",
                  },
                  {
                    href: "/nakladnaya/",
                    label: "Накладная / УПД",
                    hint: "Если отгружаете товар",
                  },
                ]
              : [
                  {
                    href: nextSchetHref,
                    label: "Выставить счёт",
                    hint: "Если оплата ещё не оформлена",
                  },
                  {
                    href: "/kp/",
                    label: "Коммерческое предложение",
                    hint: "Для следующего клиента",
                  },
                ]
          }
        />
      </div>

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
