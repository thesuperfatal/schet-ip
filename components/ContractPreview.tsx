"use client";

import { amountToWords, formatMoney } from "@/lib/amountToWords";
import type { ContractData } from "@/lib/contractTypes";

interface ContractPreviewProps {
  data: ContractData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ContractPreview({ data, previewRef }: ContractPreviewProps) {
  const amount = Math.max(0, data.amount);
  const dateStr = formatDate(data.date);
  const startStr = formatDate(data.startDate);
  const endStr = formatDate(data.endDate);

  return (
    <div
      ref={previewRef}
      className="w-[794px] bg-white p-10 text-[13px] leading-relaxed text-black"
      style={{ fontFamily: "Arial, Times New Roman, serif" }}
    >
      <h1 className="mb-1 text-center text-lg font-bold uppercase">
        Договор возмездного оказания услуг
      </h1>
      <p className="mb-6 text-center text-sm">
        № {data.number || "—"} от {dateStr}
      </p>

      <div className="mb-4 flex justify-between text-sm">
        <span>г. {data.city || "—"}</span>
        <span>{dateStr}</span>
      </div>

      <p className="mb-4 text-justify">
        <strong>{data.executor.name || "________________"}</strong>
        {data.executor.inn ? `, ИНН ${data.executor.inn}` : ""}
        {data.executor.address ? `, адрес: ${data.executor.address}` : ""}, именуемый(ая) в
        дальнейшем «Исполнитель», с одной стороны, и{" "}
        <strong>{data.customer.name || "________________"}</strong>
        {data.customer.inn ? `, ИНН ${data.customer.inn}` : ""}
        {data.customer.address ? `, адрес: ${data.customer.address}` : ""}, именуемый(ая) в
        дальнейшем «Заказчик», с другой стороны, совместно именуемые «Стороны», заключили
        настоящий Договор о нижеследующем:
      </p>

      <h2 className="mb-2 mt-5 font-bold">1. Предмет договора</h2>
      <p className="mb-2 text-justify">
        1.1. Исполнитель обязуется оказать Заказчику услуги:{" "}
        <strong>{data.subject || "—"}</strong>, а Заказчик обязуется принять и оплатить эти
        услуги.
      </p>
      <p className="mb-2 text-justify">
        1.2. Срок оказания услуг: с {startStr} по {endStr} включительно (если иное не согласовано
        Сторонами дополнительно).
      </p>

      <h2 className="mb-2 mt-5 font-bold">2. Цена и порядок расчётов</h2>
      <p className="mb-2 text-justify">
        2.1. Стоимость услуг по настоящему Договору составляет{" "}
        <strong>{formatMoney(amount)} руб.</strong> ({amountToWords(amount)}). {data.vatNote || "Без НДС."}
      </p>
      <p className="mb-2 text-justify">
        2.2. Оплата производится Заказчиком в срок не позднее {data.paymentDays || 5} банковских
        дней с даты выставления счёта Исполнителем, путём перечисления денежных средств на расчётный
        счёт Исполнителя.
      </p>
      {data.executor.account && (
        <p className="mb-2 text-justify">
          2.3. Реквизиты Исполнителя для оплаты: р/с {data.executor.account}
          {data.executor.bank ? `, банк ${data.executor.bank}` : ""}
          {data.executor.bik ? `, БИК ${data.executor.bik}` : ""}
          {data.executor.corrAccount ? `, к/с ${data.executor.corrAccount}` : ""}.
        </p>
      )}

      <h2 className="mb-2 mt-5 font-bold">3. Права и обязанности сторон</h2>
      <p className="mb-2 text-justify">
        3.1. Исполнитель обязуется оказать услуги качественно и в согласованные сроки, а также
        передать Заказчику результат услуг (при наличии) и необходимые документы (акт, счёт).
      </p>
      <p className="mb-2 text-justify">
        3.2. Заказчик обязуется предоставить Исполнителю сведения, необходимые для оказания услуг,
        своевременно принять результат и произвести оплату.
      </p>

      <h2 className="mb-2 mt-5 font-bold">4. Ответственность и порядок разрешения споров</h2>
      <p className="mb-2 text-justify">
        4.1. За неисполнение или ненадлежащее исполнение обязательств Стороны несут ответственность
        в соответствии с законодательством Российской Федерации.
      </p>
      <p className="mb-2 text-justify">
        4.2. Споры подлежат урегулированию путём переговоров, а при недостижении согласия — в суде
        по месту нахождения Исполнителя, если иное не предусмотрено законом.
      </p>

      <h2 className="mb-2 mt-5 font-bold">5. Срок действия и прочие условия</h2>
      <p className="mb-2 text-justify">
        5.1. Договор вступает в силу с даты его подписания и действует до полного исполнения
        обязательств Сторонами.
      </p>
      <p className="mb-2 text-justify">
        5.2. Договор составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному
        для каждой из Сторон.
      </p>
      {data.extraTerms.trim() && (
        <p className="mb-2 whitespace-pre-wrap text-justify">5.3. {data.extraTerms.trim()}</p>
      )}

      <h2 className="mb-4 mt-8 font-bold">6. Реквизиты и подписи сторон</h2>
      <div className="grid grid-cols-2 gap-8 text-sm">
        <div>
          <p className="mb-2 font-semibold">Исполнитель:</p>
          <p>{data.executor.name || "—"}</p>
          <p>ИНН {data.executor.inn || "—"}</p>
          <p>{data.executor.address || "—"}</p>
          {data.executor.phone && <p>тел. {data.executor.phone}</p>}
          <p className="mt-10">_________________ / {data.executor.name || ""} /</p>
          <p className="text-xs text-slate-600">подпись</p>
        </div>
        <div>
          <p className="mb-2 font-semibold">Заказчик:</p>
          <p>{data.customer.name || "—"}</p>
          <p>ИНН {data.customer.inn || "—"}</p>
          <p>{data.customer.address || "—"}</p>
          <p className="mt-10">_________________ / {data.customer.name || ""} /</p>
          <p className="text-xs text-slate-600">подпись</p>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-500">
        Шаблон носит справочный характер и не заменяет юридическую консультацию.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "«__» ________ ____ г.";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
