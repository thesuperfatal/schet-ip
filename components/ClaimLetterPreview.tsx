"use client";

import { amountToWords, formatMoney } from "@/lib/amountToWords";
import { formatDateRu } from "@/lib/paymentDeadline";
import { claimPenalty, type ClaimLetterData } from "@/lib/claimLetterTypes";

interface Props {
  data: ClaimLetterData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ClaimLetterPreview({ data, previewRef }: Props) {
  const result = claimPenalty(data);
  const total = Math.max(0, data.amount) + (result.isOverdue ? result.penalty : 0);

  return (
    <div
      ref={previewRef}
      className="w-[794px] bg-white p-10 text-[13px] leading-relaxed text-black"
      style={{ fontFamily: "Arial, Times New Roman, serif" }}
    >
      <div className="mb-8 text-right text-sm">
        <p>Кому: {data.buyer.name || "________________"}</p>
        {data.buyer.inn ? <p>ИНН {data.buyer.inn}</p> : null}
        {data.buyer.address ? <p>{data.buyer.address}</p> : null}
        <p className="mt-3">От: {data.seller.name || "________________"}</p>
        {data.seller.inn ? <p>ИНН {data.seller.inn}</p> : null}
        {data.seller.address ? <p>{data.seller.address}</p> : null}
        {data.seller.phone ? <p>тел. {data.seller.phone}</p> : null}
      </div>

      <h1 className="mb-1 text-center text-lg font-bold uppercase">Претензия</h1>
      <p className="mb-6 text-center text-sm">
        № {data.number || "—"} от {formatDateRu(data.date)}
      </p>

      <p className="mb-2 text-sm">г. {data.city || "—"}</p>

      <p className="mb-4 text-justify">
        Между нами возникла задолженность по оплате на основании счёта №{" "}
        <strong>{data.invoiceNumber || "—"}</strong> от{" "}
        <strong>{formatDateRu(data.invoiceDate)}</strong> на сумму{" "}
        <strong>{formatMoney(Math.max(0, data.amount))} руб.</strong> (
        {amountToWords(Math.max(0, data.amount))}).
      </p>

      {result.dueDateValid && (
        <p className="mb-4 text-justify">
          Срок оплаты (с учётом отсрочки {data.deferralDays} дн.):{" "}
          <strong>{formatDateRu(result.dueDate)}</strong>. По состоянию на{" "}
          {formatDateRu(data.asOfDate)}
          {result.isOverdue
            ? ` задолженность просрочена на ${result.overdueDays} дн.`
            : " срок оплаты ещё не наступил либо оплата произведена в срок."}
        </p>
      )}

      {result.isOverdue && result.penalty > 0 && (
        <p className="mb-4 text-justify">
          Ориентировочный размер неустойки (пеней) за просрочку:{" "}
          <strong>{formatMoney(result.penalty)} руб.</strong> (расчёт:{" "}
          {result.modeLabel}, {result.overdueDays} дн.). Итого к уплате с учётом пеней:{" "}
          <strong>{formatMoney(total)} руб.</strong>
        </p>
      )}

      <p className="mb-4 text-justify">
        Настоящим требую в срок не позднее <strong>{data.demandDays || 5}</strong> календарных дней
        с даты получения настоящей претензии погасить задолженность
        {result.isOverdue && result.penalty > 0 ? " и пени" : ""} путём перечисления денежных средств
        на расчётный счёт
        {data.seller.account
          ? `: р/с ${data.seller.account}${data.seller.bank ? `, банк ${data.seller.bank}` : ""}${
              data.seller.bik ? `, БИК ${data.seller.bik}` : ""
            }`
          : " по реквизитам, указанным в счёте"}
        .
      </p>

      {data.extraText.trim() && (
        <p className="mb-4 whitespace-pre-wrap text-justify">{data.extraText.trim()}</p>
      )}

      <p className="mb-8 text-justify">
        В случае отказа или неполного исполнения требований оставляю за собой право обратиться в
        суд за взысканием задолженности, неустойки и судебных расходов.
      </p>

      <div className="mt-10 text-sm">
        <p className="mb-8">С уважением,</p>
        <p>_____________________ / {data.seller.name || "__________"} /</p>
        <p className="mt-2 text-xs text-slate-600">подпись, расшифровка</p>
      </div>

      <p className="mt-10 text-[11px] text-slate-500">
        Документ — шаблон. Пени и сроки уточните по договору; при споре обратитесь к юристу.
      </p>
    </div>
  );
}
