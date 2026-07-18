/** Ориентир ключевой ставки ЦБ (пользователь может изменить в форме). */
export const DEFAULT_KEY_RATE = 0.16;

export type PenaltyMode = "custom_day" | "key_300" | "key_360";

export interface DeadlineInput {
  invoiceDate: string;
  deferralDays: number;
  paymentDate: string;
  amount: number;
  mode: PenaltyMode;
  /** Доля в день, например 0.001 = 0.1%/день */
  customDailyRate: number;
  /** Ключевая ставка ЦБ как доля, например 0.16 = 16% */
  keyRate: number;
}

export interface DeadlineResult {
  dueDate: string;
  dueDateValid: boolean;
  paymentDateValid: boolean;
  daysUntilDue: number | null;
  overdueDays: number;
  isOverdue: boolean;
  isPaidOnTime: boolean;
  penalty: number;
  dailyRateUsed: number;
  modeLabel: string;
}

function parseIso(iso: string): Date | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return next;
}

function diffDays(from: Date, to: Date): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86_400_000);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatDateRu(iso: string): string {
  const date = parseIso(iso);
  if (!date) return "—";
  return date.toLocaleDateString("ru-RU");
}

export function calcDeadline(input: DeadlineInput): DeadlineResult {
  const invoice = parseIso(input.invoiceDate);
  const deferral = Math.max(0, Math.round(input.deferralDays) || 0);
  const due = invoice ? addDays(invoice, deferral) : null;
  const payment = parseIso(input.paymentDate);
  const amount = Math.max(0, input.amount);
  const keyRate = Math.max(0, input.keyRate);

  let dailyRate = Math.max(0, input.customDailyRate);
  let modeLabel = "своя ставка %/день";

  if (input.mode === "key_300") {
    dailyRate = keyRate / 300;
    modeLabel = "1/300 ключевой ставки ЦБ в день";
  } else if (input.mode === "key_360") {
    dailyRate = keyRate / 360;
    modeLabel = "1/360 ключевой ставки ЦБ в день";
  }

  let daysUntilDue: number | null = null;
  let overdueDays = 0;
  let isOverdue = false;
  let isPaidOnTime = false;

  if (due && payment) {
    const delta = diffDays(due, payment);
    if (delta > 0) {
      isOverdue = true;
      overdueDays = delta;
    } else {
      isPaidOnTime = true;
      daysUntilDue = -delta;
    }
  } else if (due) {
    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const delta = diffDays(todayLocal, due);
    daysUntilDue = delta;
    if (delta < 0) {
      isOverdue = true;
      overdueDays = -delta;
    }
  }

  const penalty = isOverdue && overdueDays > 0 ? round2(amount * dailyRate * overdueDays) : 0;

  return {
    dueDate: due ? toIso(due) : "",
    dueDateValid: Boolean(due),
    paymentDateValid: Boolean(payment),
    daysUntilDue,
    overdueDays,
    isOverdue,
    isPaidOnTime,
    penalty,
    dailyRateUsed: dailyRate,
    modeLabel,
  };
}
