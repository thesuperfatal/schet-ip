import type { BuyerInfo } from "./types";

const BUYERS_KEY = "schet-ip-buyers";
const MAX_BUYERS = 20;

export function loadBuyers(): BuyerInfo[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(BUYERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as BuyerInfo[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((b) => b && typeof b.name === "string" && b.name.trim());
  } catch {
    return [];
  }
}

export function saveBuyer(buyer: BuyerInfo): BuyerInfo[] {
  const name = buyer.name.trim();
  if (!name) return loadBuyers();

  const normalized: BuyerInfo = {
    name,
    inn: buyer.inn.trim(),
    kpp: buyer.kpp.trim(),
    address: buyer.address.trim(),
  };

  const prev = loadBuyers().filter(
    (b) =>
      !(
        b.name.trim().toLowerCase() === name.toLowerCase() &&
        b.inn.trim() === normalized.inn
      )
  );

  const next = [normalized, ...prev].slice(0, MAX_BUYERS);
  localStorage.setItem(BUYERS_KEY, JSON.stringify(next));
  return next;
}

export function removeBuyer(name: string, inn: string): BuyerInfo[] {
  const next = loadBuyers().filter(
    (b) => !(b.name === name && b.inn === inn)
  );
  localStorage.setItem(BUYERS_KEY, JSON.stringify(next));
  return next;
}
