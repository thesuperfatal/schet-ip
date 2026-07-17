"use client";

import { amountToWords, formatMoney } from "@/lib/amountToWords";
import type { DocumentData } from "@/lib/types";

interface DocumentPreviewProps {
  data: DocumentData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DocumentPreview({ data, previewRef }: DocumentPreviewProps) {
  const total = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const title =
    data.type === "schet"
      ? `СЧЁТ № ${data.number} от ${formatDate(data.date)}`
      : `АКТ № ${data.number} от ${formatDate(data.date)}`;

  const subtitle =
    data.type === "schet"
      ? "на оплату"
      : "выполненных работ (оказанных услуг)";

  return (
    <div
      ref={previewRef}
      className="w-[794px] bg-white p-10 text-[13px] leading-relaxed text-black"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h1 className="mb-1 text-center text-xl font-bold uppercase">{title}</h1>
      <p className="mb-6 text-center text-sm">{subtitle}</p>

      <div className="mb-4 grid grid-cols-2 gap-6">
        <div>
          <p className="mb-1 font-semibold">Поставщик:</p>
          <p>{data.seller.name || "—"}</p>
          <p>ИНН {data.seller.inn || "—"}{data.seller.kpp ? `, КПП ${data.seller.kpp}` : ""}</p>
          <p>{data.seller.address || "—"}</p>
          <p>р/с {data.seller.account || "—"}</p>
          <p>в {data.seller.bank || "—"}</p>
          <p>БИК {data.seller.bik || "—"}, к/с {data.seller.corrAccount || "—"}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold">Покупатель:</p>
          <p>{data.buyer.name || "—"}</p>
          <p>ИНН {data.buyer.inn || "—"}{data.buyer.kpp ? `, КПП ${data.buyer.kpp}` : ""}</p>
          <p>{data.buyer.address || "—"}</p>
        </div>
      </div>

      <table className="mb-4 w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-400 px-2 py-2 text-left">№</th>
            <th className="border border-slate-400 px-2 py-2 text-left">Наименование</th>
            <th className="border border-slate-400 px-2 py-2 text-center">Ед.</th>
            <th className="border border-slate-400 px-2 py-2 text-center">Кол-во</th>
            <th className="border border-slate-400 px-2 py-2 text-right">Цена</th>
            <th className="border border-slate-400 px-2 py-2 text-right">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={item.id}>
              <td className="border border-slate-400 px-2 py-2">{index + 1}</td>
              <td className="border border-slate-400 px-2 py-2">{item.name || "—"}</td>
              <td className="border border-slate-400 px-2 py-2 text-center">{item.unit}</td>
              <td className="border border-slate-400 px-2 py-2 text-center">{item.qty}</td>
              <td className="border border-slate-400 px-2 py-2 text-right">
                {formatMoney(item.price)}
              </td>
              <td className="border border-slate-400 px-2 py-2 text-right">
                {formatMoney(item.qty * item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mb-2 text-right font-semibold">Итого: {formatMoney(total)}</p>
      <p className="mb-4">Всего наименований {data.items.length}, на сумму {formatMoney(total)}</p>
      <p className="mb-4 font-medium">{amountToWords(total)}</p>
      <p className="mb-8">{data.vatNote || "Без НДС."}</p>

      {data.type === "akt" && (
        <div className="mt-10 grid grid-cols-2 gap-8">
          <div>
            <p className="mb-8">Исполнитель: _________________ / {data.seller.name || ""} /</p>
            <p className="text-xs text-slate-600">подпись</p>
          </div>
          <div>
            <p className="mb-8">Заказчик: _________________ / {data.buyer.name || ""} /</p>
            <p className="text-xs text-slate-600">подпись</p>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
