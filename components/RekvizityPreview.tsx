"use client";

import type { SellerInfo } from "@/lib/types";

interface Props {
  seller: SellerInfo;
  purpose: string;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <tr>
      <td className="w-[38%] border border-black px-3 py-2 align-top text-[12px] text-slate-700">
        {label}
      </td>
      <td className="border border-black px-3 py-2 align-top text-[13px] font-medium">{value}</td>
    </tr>
  );
}

export default function RekvizityPreview({ seller, purpose, previewRef }: Props) {
  return (
    <div
      ref={previewRef}
      className="w-[794px] bg-white p-10 text-[13px] leading-relaxed text-black"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <h1 className="mb-2 text-center text-lg font-bold uppercase">Реквизиты для оплаты</h1>
      <p className="mb-6 text-center text-sm text-slate-700">
        {seller.name || "Индивидуальный предприниматель"}
      </p>

      <table className="mb-6 w-full border-collapse">
        <tbody>
          <Row label="Получатель" value={seller.name} />
          <Row label="ИНН" value={seller.inn} />
          {seller.kpp.trim() ? <Row label="КПП" value={seller.kpp} /> : null}
          <Row label="Банк" value={seller.bank} />
          <Row label="БИК" value={seller.bik} />
          <Row label="Корр. счёт" value={seller.corrAccount} />
          <Row label="Расчётный счёт" value={seller.account} />
          <Row label="Адрес" value={seller.address} />
          <Row label="Телефон" value={seller.phone} />
        </tbody>
      </table>

      {purpose.trim() && (
        <div className="rounded border border-black p-4">
          <p className="mb-1 text-[12px] text-slate-700">Назначение платежа</p>
          <p className="text-[13px] font-medium">{purpose}</p>
        </div>
      )}

      <p className="mt-8 text-[11px] text-slate-500">
        Проверьте реквизиты перед оплатой. Документ сформирован в СчётИП (biznes-ip.ru).
      </p>
    </div>
  );
}
