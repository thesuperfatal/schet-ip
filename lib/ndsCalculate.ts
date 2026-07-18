export const NDS_YEAR = 2026;

/** Общая ставка НДС с 2026 года (ориентир). */
export const NDS_STANDARD_RATE = 0.22;

export const NDS_RATES = [
  { value: 0, label: "0%" },
  { value: 0.05, label: "5%" },
  { value: 0.07, label: "7%" },
  { value: 0.1, label: "10%" },
  { value: 0.22, label: "22%" },
] as const;

/** Пороги для подсказки ИП на УСН (2026), млн ₽. */
export const USN_NDS_FREE_LIMIT = 20_000_000;
export const USN_NDS_RATE5_LIMIT = 272_500_000;
export const USN_NDS_RATE7_LIMIT = 490_500_000;

export type NdsCalcMode = "charge" | "extract";

export interface NdsCalcResult {
  mode: NdsCalcMode;
  rate: number;
  inputAmount: number;
  amountWithoutNds: number;
  ndsAmount: number;
  amountWithNds: number;
  documentPhrase: string;
}

export interface UsnNdsHint {
  level: "free" | "rate5" | "rate7" | "standard" | "over_usn";
  title: string;
  text: string;
  suggestedRate: number | null;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatMoney(n: number): string {
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatMoneyShort(n: number): string {
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function calcNds(mode: NdsCalcMode, amount: number, rate: number): NdsCalcResult {
  const inputAmount = Math.max(0, amount);
  const r = Math.max(0, rate);

  let amountWithoutNds: number;
  let ndsAmount: number;
  let amountWithNds: number;

  if (r === 0) {
    amountWithoutNds = round2(inputAmount);
    ndsAmount = 0;
    amountWithNds = amountWithoutNds;
  } else if (mode === "charge") {
    amountWithoutNds = round2(inputAmount);
    ndsAmount = round2(amountWithoutNds * r);
    amountWithNds = round2(amountWithoutNds + ndsAmount);
  } else {
    amountWithNds = round2(inputAmount);
    amountWithoutNds = round2(amountWithNds / (1 + r));
    ndsAmount = round2(amountWithNds - amountWithoutNds);
  }

  const pct = Math.round(r * 100);
  const documentPhrase =
    r === 0
      ? "Без НДС."
      : `В том числе НДС ${pct}% — ${formatMoney(ndsAmount)} ₽.`;

  return {
    mode,
    rate: r,
    inputAmount,
    amountWithoutNds,
    ndsAmount,
    amountWithNds,
    documentPhrase,
  };
}

export function hintUsnNds(yearlyIncome: number): UsnNdsHint {
  const income = Math.max(0, yearlyIncome);

  if (income <= USN_NDS_FREE_LIMIT) {
    return {
      level: "free",
      title: "Пока без обязанности НДС (ориентир)",
      text: `При доходе до ${formatMoneyShort(USN_NDS_FREE_LIMIT)} ₽ в год ИП на УСН обычно не платит НДС. В счетах часто пишут «Без НДС». Уточняйте актуальные правила под свою ситуацию.`,
      suggestedRate: 0,
    };
  }

  if (income <= USN_NDS_RATE5_LIMIT) {
    return {
      level: "rate5",
      title: "Вероятен НДС, часто выбирают 5%",
      text: `При доходе свыше ${formatMoneyShort(USN_NDS_FREE_LIMIT)} ₽ на УСН обычно возникает НДС. Для многих подходит спецставка 5% (без вычетов). Ориентир порога спецставки 5% в ${NDS_YEAR} г. — до ${formatMoneyShort(USN_NDS_RATE5_LIMIT)} ₽.`,
      suggestedRate: 0.05,
    };
  }

  if (income <= USN_NDS_RATE7_LIMIT) {
    return {
      level: "rate7",
      title: "Ориентир — спецставка 7%",
      text: `При более высоком доходе на УСН часто применяют спецставку НДС 7% (без вычетов). Порог ориентира ${NDS_YEAR} г. — до ${formatMoneyShort(USN_NDS_RATE7_LIMIT)} ₽. Дальше — риск потери УСН / общие ставки.`,
      suggestedRate: 0.07,
    };
  }

  return {
    level: "over_usn",
    title: "Доход выше типичных лимитов УСН",
    text: `При доходе свыше ~${formatMoneyShort(USN_NDS_RATE7_LIMIT)} ₽ ситуация сложная: возможны общие ставки НДС (в т.ч. 22%) и потеря права на УСН. Нужна консультация бухгалтера.`,
    suggestedRate: NDS_STANDARD_RATE,
  };
}

/** Ссылка на форму счёта с подстановкой НДС и суммы. */
export function buildCreateFromNdsUrl(result: NdsCalcResult, docType: "schet" | "akt" = "schet"): string {
  const params = new URLSearchParams();
  params.set("type", docType);
  params.set("from", "nds");
  params.set("vat", result.documentPhrase);
  // В позицию кладём сумму без НДС — фраза НДС отдельным полем
  params.set("price", String(result.amountWithoutNds));
  if (result.ndsAmount > 0) {
    params.set("item", "Услуга / товар");
  }
  return `/create/?${params.toString()}`;
}
