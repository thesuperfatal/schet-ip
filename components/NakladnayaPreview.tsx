"use client";

import type { CSSProperties } from "react";
import { amountToWords, formatMoney } from "@/lib/amountToWords";
import type { NakladnayaData } from "@/lib/nakladnayaTypes";

interface NakladnayaPreviewProps {
  data: NakladnayaData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function NakladnayaPreview({ data, previewRef }: NakladnayaPreviewProps) {
  const total = data.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const dateStr = formatDate(data.date);
  const isUpd = data.kind === "upd";

  const title = isUpd
    ? `Универсальный передаточный документ № ${data.number || "—"} от ${dateStr}`
    : `Товарная накладная № ${data.number || "—"} от ${dateStr}`;

  return (
    <div
      ref={previewRef}
      className="w-[794px] bg-white p-10 text-[12px] leading-relaxed text-black"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h1 className="mb-1 text-center text-base font-bold uppercase">{title}</h1>
      <p className="mb-5 text-center text-xs text-slate-700">
        {isUpd
          ? "Статус документа: 1 (счёт-фактура и передаточный документ) — упрощённый шаблон"
          : "Упрощённый шаблон для ИП (ориентир по структуре ТОРГ-12)"}
      </p>

      <div className="mb-4 grid grid-cols-2 gap-6">
        <div>
          <p className="mb-1 font-semibold">{isUpd ? "Продавец:" : "Грузоотправитель / поставщик:"}</p>
          <p>{data.seller.name || "—"}</p>
          <p>
            ИНН {data.seller.inn || "—"}
            {data.seller.kpp ? `, КПП ${data.seller.kpp}` : ""}
          </p>
          <p>{data.seller.address || "—"}</p>
          {data.seller.account && (
            <>
              <p>р/с {data.seller.account}</p>
              <p>
                в {data.seller.bank || "—"}, БИК {data.seller.bik || "—"}
              </p>
            </>
          )}
        </div>
        <div>
          <p className="mb-1 font-semibold">{isUpd ? "Покупатель:" : "Грузополучатель / покупатель:"}</p>
          <p>{data.buyer.name || "—"}</p>
          <p>
            ИНН {data.buyer.inn || "—"}
            {data.buyer.kpp ? `, КПП ${data.buyer.kpp}` : ""}
          </p>
          <p>{data.buyer.address || "—"}</p>
        </div>
      </div>

      <p className="mb-3">
        <span className="font-semibold">Основание:</span> {data.basis || "—"}
      </p>

      <table className="mb-3 w-full" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#f1f5f9" }}>
            <th style={cellStyle}>№</th>
            <th style={cellStyle}>Наименование товара</th>
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

      <p className="mb-1 text-right font-semibold">Итого: {formatMoney(total)} руб.</p>
      <p className="mb-2">
        Всего наименований {data.items.length}, на сумму {formatMoney(total)} руб.
      </p>
      <p className="mb-2 font-medium capitalize">{amountToWords(total)}</p>
      <p className="mb-8">{data.vatNote || "Без НДС."}</p>

      <div className="grid grid-cols-2 gap-8 text-sm">
        <div>
          <p className="mb-6 font-semibold">Отпустил / передал</p>
          <p className="mb-8">_________________ / {data.seller.name || ""} /</p>
          <p className="text-xs text-slate-600">подпись поставщика</p>
        </div>
        <div>
          <p className="mb-6 font-semibold">Получил / принял</p>
          <p className="mb-8">_________________ / {data.buyer.name || ""} /</p>
          <p className="text-xs text-slate-600">подпись покупателя</p>
        </div>
      </div>

      <p className="mt-8 text-[10px] text-slate-500">
        Шаблон носит справочный характер и не заменяет утверждённые формы ФНС / Госкомстата при
        необходимости строгого учёта.
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
