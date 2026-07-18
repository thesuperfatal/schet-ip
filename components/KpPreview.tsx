"use client";

import type { CSSProperties } from "react";
import { amountToWords, formatMoney } from "@/lib/amountToWords";
import type { KpData } from "@/lib/kpTypes";

interface KpPreviewProps {
  data: KpData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function KpPreview({ data, previewRef }: KpPreviewProps) {
  const total = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const dateStr = formatDate(data.date);

  return (
    <div
      ref={previewRef}
      className="w-[794px] bg-white p-10 text-[13px] leading-relaxed text-black"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <p className="mb-1 text-right text-sm text-slate-700">
        № {data.number || "—"} от {dateStr}
      </p>
      <h1 className="mb-6 text-center text-xl font-bold uppercase">
        {data.title || "Коммерческое предложение"}
      </h1>

      <div className="mb-5 grid grid-cols-2 gap-6">
        <div>
          <p className="mb-1 font-semibold">От:</p>
          <p>{data.seller.name || "—"}</p>
          <p>
            ИНН {data.seller.inn || "—"}
            {data.seller.kpp ? `, КПП ${data.seller.kpp}` : ""}
          </p>
          <p>{data.seller.address || "—"}</p>
          {data.seller.phone && <p>тел. {data.seller.phone}</p>}
        </div>
        <div>
          <p className="mb-1 font-semibold">Кому:</p>
          <p>{data.client.name || "—"}</p>
          {data.client.inn && <p>ИНН {data.client.inn}</p>}
          {data.client.address && <p>{data.client.address}</p>}
        </div>
      </div>

      {data.intro.trim() && (
        <p className="mb-5 whitespace-pre-wrap text-justify">{data.intro.trim()}</p>
      )}

      <p className="mb-2 font-semibold">Состав предложения</p>
      <table className="mb-4 w-full" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#f1f5f9" }}>
            <th style={cellStyle}>№</th>
            <th style={cellStyle}>Наименование</th>
            <th style={{ ...cellStyle, textAlign: "center" }}>Ед.</th>
            <th style={{ ...cellStyle, textAlign: "center" }}>Кол-во</th>
            <th style={{ ...cellStyle, textAlign: "right" }}>Цена</th>
            <th style={{ ...cellStyle, textAlign: "right" }}>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={item.id}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{item.name || "—"}</td>
              <td style={{ ...cellStyle, textAlign: "center" }}>{item.unit || "шт"}</td>
              <td style={{ ...cellStyle, textAlign: "center" }}>{item.qty}</td>
              <td style={{ ...cellStyle, textAlign: "right" }}>{formatMoney(item.price)}</td>
              <td style={{ ...cellStyle, textAlign: "right" }}>
                {formatMoney(item.qty * item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mb-1 text-right text-base font-semibold">
        Итого: {formatMoney(total)} руб.
      </p>
      <p className="mb-2 text-right capitalize">{amountToWords(total)}</p>
      <p className="mb-5">{data.vatNote || "Без НДС."}</p>

      <div className="mb-5 space-y-2">
        <p>
          <span className="font-semibold">Срок действия предложения:</span>{" "}
          {data.validDays || 14} календарных дней с даты документа.
        </p>
        {data.paymentTerms.trim() && (
          <p>
            <span className="font-semibold">Условия оплаты:</span> {data.paymentTerms.trim()}
          </p>
        )}
      </div>

      {data.closing.trim() && (
        <p className="mb-8 whitespace-pre-wrap">{data.closing.trim()}</p>
      )}

      <div className="mt-10">
        <p className="mb-8">_________________ / {data.seller.name || ""} /</p>
        <p className="text-xs text-slate-600">подпись</p>
      </div>

      <p className="mt-8 text-[10px] text-slate-500">
        Документ носит характер предложения и не является публичной офертой, если иное не указано
        отдельно.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "__.__.____";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

const cellStyle: CSSProperties = {
  border: "1px solid #94a3b8",
  padding: "6px 8px",
  textAlign: "left",
  verticalAlign: "top",
};
