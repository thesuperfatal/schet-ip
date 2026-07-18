import type { SellerInfo } from "./types";

const SELLER_KEY = "schet-ip-seller";

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
