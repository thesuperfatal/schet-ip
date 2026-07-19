"use client";

import type { PowerOfAttorneyData } from "@/lib/powerOfAttorneyTypes";

interface Props {
  data: PowerOfAttorneyData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

function formatDate(iso: string): string {
  if (!iso) return "«___» ________ _____ г.";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `«${m[3]}» ${months[Number(m[2]) - 1]} ${m[1]} г.`;
}

export default function PowerOfAttorneyPreview({ data, previewRef }: Props) {
  const powers = [
    ...data.powers.filter(Boolean),
    ...(data.extraPowers.trim()
      ? data.extraPowers
          .split(/\n|;/)
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) => (s.endsWith(";") ? s : `${s};`))
      : []),
  ];

  return (
    <div
      ref={previewRef}
      className="w-[794px] bg-white p-10 text-[13px] leading-relaxed text-black"
      style={{ fontFamily: "Arial, Times New Roman, serif" }}
    >
      <h1 className="mb-1 text-center text-lg font-bold uppercase">Доверенность</h1>
      <p className="mb-6 text-center text-sm">
        № {data.number || "—"} от {formatDate(data.date)}
      </p>

      <div className="mb-4 flex justify-between text-sm">
        <span>г. {data.city || "—"}</span>
        <span>{formatDate(data.date)}</span>
      </div>

      <p className="mb-4 text-justify">
        Я, <strong>{data.principal.name || "________________"}</strong>
        {data.principal.inn ? `, ИНН ${data.principal.inn}` : ""}
        {data.principal.address ? `, адрес: ${data.principal.address}` : ""}
        {data.principal.phone ? `, тел. ${data.principal.phone}` : ""}, именуемый(ая) в дальнейшем
        «Доверитель», настоящей доверенностью уполномочиваю:
      </p>

      <p className="mb-4 text-justify">
        <strong>{data.attorney.name || "________________"}</strong>
        {data.attorney.passport ? `, паспорт ${data.attorney.passport}` : ""}
        {data.attorney.passportIssued ? `, выдан ${data.attorney.passportIssued}` : ""}
        {data.attorney.passportDate ? ` ${formatDate(data.attorney.passportDate)}` : ""}
        {data.attorney.address ? `, проживающего(ую) по адресу: ${data.attorney.address}` : ""},
        именуемого(ую) в дальнейшем «Представитель», совершать от имени Доверителя следующие
        действия:
      </p>

      <ol className="mb-4 list-decimal space-y-1 pl-5 text-justify">
        {powers.length > 0 ? (
          powers.map((p, i) => <li key={`${i}-${p.slice(0, 20)}`}>{p.replace(/;$/, "")};</li>)
        ) : (
          <li>_______________________________________________.</li>
        )}
      </ol>

      <p className="mb-4 text-justify">
        Доверенность выдана без права передоверия и действует по{" "}
        <strong>{formatDate(data.validUntil)}</strong> включительно (если не будет отменена
        ранее).
      </p>

      <p className="mb-8 text-justify">
        Подпись Представителя _______________________ удостоверяю.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-8 text-sm">
        <div>
          <p className="mb-6">Доверитель:</p>
          <p>_____________________ / {data.principal.name || "__________"} /</p>
          <p className="mt-2 text-xs text-slate-600">подпись, расшифровка</p>
        </div>
        <div>
          <p className="mb-6">М.П. (при наличии)</p>
        </div>
      </div>

      <p className="mt-10 text-[11px] text-slate-500">
        Документ сформирован как шаблон. При необходимости нотариального удостоверения или особых
        полномочий согласуйте текст с юристом.
      </p>
    </div>
  );
}
