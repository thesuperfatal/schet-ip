/** Константы УСН / взносов ИП на 2026 год (ориентир по НК РФ / ФНС). */
export const USN_YEAR = 2026;
export const FIXED_CONTRIBUTIONS_2026 = 57_390;
export const EXTRA_THRESHOLD = 300_000;
export const EXTRA_1PCT_MAX_2026 = 321_818;
export const USN_INCOME_RATE = 0.06;
export const USN_PROFIT_RATE = 0.15;
export const USN_MIN_TAX_RATE = 0.01;

export type UsnMode = "income6" | "profit15" | "compare";

export interface UsnInput {
  income: number;
  expenses: number;
  contributions: number;
  hasEmployees: boolean;
  /** За сколько месяцев считать «откладывать в месяц» (1–12). */
  months: number;
}

export interface UsnBreakdown {
  mode: "income6" | "profit15";
  income: number;
  expenses: number;
  contributions: number;
  taxBeforeDeduction: number;
  taxPayable: number;
  minTax: number;
  usedMinTax: boolean;
  deductionApplied: number;
  totalBurden: number;
  monthlySetAside: number;
  netAfterTaxAndContrib: number;
}

export interface UsnCompareResult {
  income6: UsnBreakdown;
  profit15: UsnBreakdown;
  better: "income6" | "profit15" | "equal";
  savings: number;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function calcExtraContributions(income: number): number {
  if (income <= EXTRA_THRESHOLD) return 0;
  const extra = (income - EXTRA_THRESHOLD) * 0.01;
  return round2(Math.min(extra, EXTRA_1PCT_MAX_2026));
}

export function suggestedContributions(income: number): number {
  return round2(FIXED_CONTRIBUTIONS_2026 + calcExtraContributions(income));
}

export function calcUsn6(input: UsnInput): UsnBreakdown {
  const income = Math.max(0, input.income);
  const contributions = Math.max(0, input.contributions);
  const months = Math.min(12, Math.max(1, input.months));
  const taxBefore = round2(income * USN_INCOME_RATE);
  const maxDeduction = input.hasEmployees ? taxBefore * 0.5 : taxBefore;
  const deductionApplied = round2(Math.min(contributions, maxDeduction));
  const taxPayable = round2(Math.max(0, taxBefore - deductionApplied));
  const totalBurden = round2(taxPayable + contributions);
  const monthlySetAside = round2(totalBurden / months);
  const netAfterTaxAndContrib = round2(income - taxPayable - contributions);

  return {
    mode: "income6",
    income,
    expenses: 0,
    contributions,
    taxBeforeDeduction: taxBefore,
    taxPayable,
    minTax: 0,
    usedMinTax: false,
    deductionApplied,
    totalBurden,
    monthlySetAside,
    netAfterTaxAndContrib,
  };
}

export function calcUsn15(input: UsnInput): UsnBreakdown {
  const income = Math.max(0, input.income);
  const expenses = Math.max(0, input.expenses);
  const contributions = Math.max(0, input.contributions);
  const months = Math.min(12, Math.max(1, input.months));

  // На УСН 15% взносы входят в расходы
  const taxBase = Math.max(0, income - expenses - contributions);
  const taxCalculated = round2(taxBase * USN_PROFIT_RATE);
  const minTax = round2(income * USN_MIN_TAX_RATE);
  const usedMinTax = taxCalculated < minTax && income > 0;
  const taxPayable = usedMinTax ? minTax : taxCalculated;
  const totalBurden = round2(taxPayable + contributions);
  const monthlySetAside = round2(totalBurden / months);
  const netAfterTaxAndContrib = round2(income - taxPayable - contributions);

  return {
    mode: "profit15",
    income,
    expenses,
    contributions,
    taxBeforeDeduction: taxCalculated,
    taxPayable,
    minTax,
    usedMinTax,
    deductionApplied: contributions,
    totalBurden,
    monthlySetAside,
    netAfterTaxAndContrib,
  };
}

export function compareUsn(input: UsnInput): UsnCompareResult {
  const income6 = calcUsn6(input);
  const profit15 = calcUsn15(input);
  const diff = round2(income6.totalBurden - profit15.totalBurden);

  let better: UsnCompareResult["better"] = "equal";
  if (diff > 1) better = "profit15";
  else if (diff < -1) better = "income6";

  return {
    income6,
    profit15,
    better,
    savings: Math.abs(diff),
  };
}

export function formatMoney(n: number): string {
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
