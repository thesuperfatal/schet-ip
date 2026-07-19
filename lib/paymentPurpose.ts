/** Текст для поля «Назначение платежа» в банке. */

function formatDateRu(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return `${m[3]}.${m[2]}.${m[1]}`;
}

export function paymentPurpose(params: {
  type: "schet" | "akt";
  number: string;
  date: string;
  total?: number;
  vatNote?: string;
}): string {
  const num = params.number.trim() || "б/н";
  const dateRu = formatDateRu(params.date) || "—";
  const kind = params.type === "akt" ? "акту" : "счёту";
  let text = `Оплата по ${kind} №${num} от ${dateRu}`;
  if (params.total !== undefined && params.total > 0) {
    text += ` на сумму ${params.total.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} руб.`;
  }
  const vat = params.vatNote?.trim();
  if (vat) text += ` ${vat}`;
  return text;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
