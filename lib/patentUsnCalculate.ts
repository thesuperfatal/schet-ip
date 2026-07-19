import {
  calcUsn15,
  calcUsn6,
  formatMoney,
  type UsnBreakdown,
  type UsnInput,
} from "./usnCalculate";

export { formatMoney };

export interface PatentUsnInput {
  income: number;
  expenses: number;
  /** Стоимость патента за период (из калькулятора ФНС / региона). */
  patentCost: number;
  contributions: number;
  hasEmployees: boolean;
  months: number;
}

export interface PatentBreakdown {
  patentCost: number;
  contributions: number;
  deductionApplied: number;
  patentPayable: number;
  totalBurden: number;
  monthlySetAside: number;
  netAfterTaxAndContrib: number;
}

export type PatentUsnWinner = "patent" | "income6" | "profit15" | "tie";

export interface PatentUsnCompare {
  patent: PatentBreakdown;
  income6: UsnBreakdown;
  profit15: UsnBreakdown;
  winner: PatentUsnWinner;
  winnerLabel: string;
  savingsVsSecond: number;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Патент с вычетом взносов (как на УСН «доходы»: до 100% без работников, до 50% с работниками). */
export function calcPatent(input: PatentUsnInput): PatentBreakdown {
  const patentCost = Math.max(0, input.patentCost);
  const contributions = Math.max(0, input.contributions);
  const income = Math.max(0, input.income);
  const months = Math.min(12, Math.max(1, input.months));

  const maxDeduction = input.hasEmployees ? patentCost * 0.5 : patentCost;
  const deductionApplied = round2(Math.min(contributions, maxDeduction));
  const patentPayable = round2(Math.max(0, patentCost - deductionApplied));
  const totalBurden = round2(patentPayable + contributions);
  const monthlySetAside = round2(totalBurden / months);
  const netAfterTaxAndContrib = round2(income - patentPayable - contributions);

  return {
    patentCost,
    contributions,
    deductionApplied,
    patentPayable,
    totalBurden,
    monthlySetAside,
    netAfterTaxAndContrib,
  };
}

export function comparePatentUsn(input: PatentUsnInput): PatentUsnCompare {
  const usnInput: UsnInput = {
    income: input.income,
    expenses: input.expenses,
    contributions: input.contributions,
    hasEmployees: input.hasEmployees,
    months: input.months,
  };

  const patent = calcPatent(input);
  const income6 = calcUsn6(usnInput);
  const profit15 = calcUsn15(usnInput);

  const rows: { key: PatentUsnWinner; label: string; total: number }[] = [
    { key: "patent", label: "Патент", total: patent.totalBurden },
    { key: "income6", label: "УСН 6%", total: income6.totalBurden },
    { key: "profit15", label: "УСН 15%", total: profit15.totalBurden },
  ];

  rows.sort((a, b) => a.total - b.total);
  const best = rows[0];
  const second = rows[1];
  const savings = round2(second.total - best.total);

  let winner: PatentUsnWinner = best.key;
  if (savings < 1) winner = "tie";

  return {
    patent,
    income6,
    profit15,
    winner,
    winnerLabel: winner === "tie" ? "Почти одинаково" : best.label,
    savingsVsSecond: savings,
  };
}
