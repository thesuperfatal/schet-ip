"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FormField from "@/components/FormField";
import PowerOfAttorneyPreview from "@/components/PowerOfAttorneyPreview";
import { downloadPdfFromElement } from "@/lib/generatePdf";
import {
  DEFAULT_POWERS,
  emptyPowerOfAttorney,
  type PowerOfAttorneyData,
} from "@/lib/powerOfAttorneyTypes";
import { loadSeller, saveSeller } from "@/lib/storage";
import type { SellerInfo } from "@/lib/types";

export default function PowerOfAttorneyClient() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PowerOfAttorneyData>(emptyPowerOfAttorney());
  const [requireFields, setRequireFields] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = loadSeller();
    if (saved) {
      setData((prev) => ({ ...prev, principal: saved }));
    }
  }, []);

  function setPrincipal(patch: Partial<SellerInfo>) {
    setData((prev) => ({ ...prev, principal: { ...prev.principal, ...patch } }));
  }

  function togglePower(text: string) {
    setData((prev) => {
      const has = prev.powers.includes(text);
      return {
        ...prev,
        powers: has ? prev.powers.filter((p) => p !== text) : [...prev.powers, text],
      };
    });
  }

  async function handleDownload() {
    setMessage("");
    if (
      requireFields &&
      (!data.principal.name.trim() || !data.attorney.name.trim() || data.powers.length === 0)
    ) {
      setMessage(
        "Заполните доверителя, представителя и хотя бы одно полномочие — или снимите галочку проверки."
      );
      return;
    }
    if (!pdfRef.current) return;

    setLoading(true);
    try {
      if (data.principal.name.trim()) saveSeller(data.principal);
      await downloadPdfFromElement(
        pdfRef.current,
        `doverennost-${data.number || "1"}-${data.date}.pdf`
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
        <h1 className="text-3xl font-bold text-slate-900">Доверенность</h1>
        <p className="mt-2 text-slate-600">
          Простой шаблон для ИП: уполномочить человека подписывать документы и представлять
          интересы. PDF бесплатно.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Документ</h2>
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
                label="Действует до"
                value={data.validUntil}
                onChange={(v) => setData({ ...data, validUntil: v })}
                type="date"
                hint="Обычно на год или до конкретной даты"
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Доверитель (ИП)</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="ФИО / название"
                value={data.principal.name}
                onChange={(v) => setPrincipal({ name: v })}
                className="sm:col-span-2"
              />
              <FormField
                label="ИНН"
                value={data.principal.inn}
                onChange={(v) => setPrincipal({ inn: v })}
              />
              <FormField
                label="Телефон"
                value={data.principal.phone}
                onChange={(v) => setPrincipal({ phone: v })}
              />
              <FormField
                label="Адрес"
                value={data.principal.address}
                onChange={(v) => setPrincipal({ address: v })}
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Представитель</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="ФИО"
                value={data.attorney.name}
                onChange={(v) =>
                  setData({ ...data, attorney: { ...data.attorney, name: v } })
                }
                className="sm:col-span-2"
              />
              <FormField
                label="Паспорт (серия и номер)"
                value={data.attorney.passport}
                onChange={(v) =>
                  setData({ ...data, attorney: { ...data.attorney, passport: v } })
                }
                hint="Например: 4500 123456"
              />
              <FormField
                label="Дата выдачи паспорта"
                value={data.attorney.passportDate}
                onChange={(v) =>
                  setData({ ...data, attorney: { ...data.attorney, passportDate: v } })
                }
                type="date"
              />
              <FormField
                label="Кем выдан"
                value={data.attorney.passportIssued}
                onChange={(v) =>
                  setData({ ...data, attorney: { ...data.attorney, passportIssued: v } })
                }
                className="sm:col-span-2"
              />
              <FormField
                label="Адрес проживания"
                value={data.attorney.address}
                onChange={(v) =>
                  setData({ ...data, attorney: { ...data.attorney, address: v } })
                }
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Полномочия</h2>
            <ul className="space-y-2">
              {DEFAULT_POWERS.map((text) => (
                <li key={text}>
                  <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={data.powers.includes(text)}
                      onChange={() => togglePower(text)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600"
                    />
                    <span>{text}</span>
                  </label>
                </li>
              ))}
            </ul>
            <label className="mt-4 block">
              <span className="mb-1 block text-xs font-medium text-slate-600">
                Дополнительно (с новой строки)
              </span>
              <textarea
                value={data.extraPowers}
                onChange={(e) => setData({ ...data, extraPowers: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="подавать документы в банк; получать корреспонденцию;"
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
            Дальше по сделке:{" "}
            <Link href="/dogovor/" className="text-blue-600 hover:underline">
              договор
            </Link>
            ,{" "}
            <Link href="/create/?type=schet" className="text-blue-600 hover:underline">
              счёт
            </Link>
            ,{" "}
            <Link href="/create/?type=akt" className="text-blue-600 hover:underline">
              акт
            </Link>
            .
          </p>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-4">
          <p className="mb-3 text-sm font-medium text-slate-600">Предпросмотр</p>
          <div className="inline-block origin-top-left scale-[0.55] sm:scale-[0.65] lg:scale-[0.75]">
            <PowerOfAttorneyPreview data={data} />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed overflow-hidden"
        style={{ left: "-10000px", top: 0, width: 794 }}
      >
        <PowerOfAttorneyPreview data={data} previewRef={pdfRef} />
      </div>
    </div>
  );
}
