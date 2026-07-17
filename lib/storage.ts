import type { SellerInfo } from "./types";

const SELLER_KEY = "schet-ip-seller";
const COUNT_KEY = "schet-ip-doc-count";
const MONTH_KEY = "schet-ip-doc-month";
const FREE_LIMIT = 3;

function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}`;
}

export function loadSeller(): SellerInfo | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SELLER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SellerInfo;
  } catch {
    return null;
  }
}

export function saveSeller(seller: SellerInfo): void {
  localStorage.setItem(SELLER_KEY, JSON.stringify(seller));
}

export function getDocCount(): number {
  if (typeof window === "undefined") return 0;
  const month = localStorage.getItem(MONTH_KEY);
  if (month !== currentMonth()) {
    localStorage.setItem(MONTH_KEY, currentMonth());
    localStorage.setItem(COUNT_KEY, "0");
    return 0;
  }
  return Number(localStorage.getItem(COUNT_KEY) ?? "0");
}

export function incrementDocCount(): void {
  const count = getDocCount() + 1;
  localStorage.setItem(MONTH_KEY, currentMonth());
  localStorage.setItem(COUNT_KEY, String(count));
}

export function canCreateDocument(): boolean {
  return getDocCount() < FREE_LIMIT;
}

export function getFreeLimit(): number {
  return FREE_LIMIT;
}

export function getRemainingDocs(): number {
  return Math.max(0, FREE_LIMIT - getDocCount());
}
