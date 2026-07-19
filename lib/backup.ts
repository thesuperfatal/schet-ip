import type { BuyerInfo, SellerInfo } from "./types";
import { loadBuyers } from "./buyers";
import { loadSeller, saveSeller } from "./storage";

export const BACKUP_VERSION = 1 as const;

export interface SchetIpBackup {
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  seller: SellerInfo | null;
  buyers: BuyerInfo[];
}

function isSellerLike(v: unknown): v is SellerInfo {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o.name === "string";
}

function isBuyerLike(v: unknown): v is BuyerInfo {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o.name === "string";
}

export function buildBackup(seller?: SellerInfo | null, buyers?: BuyerInfo[]): SchetIpBackup {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    seller: seller !== undefined ? seller : loadSeller(),
    buyers: buyers !== undefined ? buyers : loadBuyers(),
  };
}

export function parseBackupJson(raw: string): { ok: true; data: SchetIpBackup } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return { ok: false, error: "Файл не похож на резервную копию СчётИП" };
    }
    const o = parsed as Record<string, unknown>;
    const seller = o.seller === null || o.seller === undefined ? null : o.seller;
    if (seller !== null && !isSellerLike(seller)) {
      return { ok: false, error: "В файле повреждены реквизиты ИП" };
    }
    const buyersRaw = o.buyers;
    const buyers = Array.isArray(buyersRaw)
      ? buyersRaw.filter(isBuyerLike).map((b) => ({
          name: String(b.name).trim(),
          inn: String(b.inn || "").trim(),
          kpp: String(b.kpp || "").trim(),
          address: String(b.address || "").trim(),
        }))
      : [];

    return {
      ok: true,
      data: {
        version: BACKUP_VERSION,
        exportedAt: typeof o.exportedAt === "string" ? o.exportedAt : new Date().toISOString(),
        seller: seller
          ? {
              name: String(seller.name || ""),
              inn: String(seller.inn || ""),
              kpp: String(seller.kpp || ""),
              address: String(seller.address || ""),
              bank: String(seller.bank || ""),
              bik: String(seller.bik || ""),
              account: String(seller.account || ""),
              corrAccount: String(seller.corrAccount || ""),
              phone: String(seller.phone || ""),
            }
          : null,
        buyers: buyers.filter((b) => b.name),
      },
    };
  } catch {
    return { ok: false, error: "Не удалось прочитать JSON" };
  }
}

export function applyBackup(data: SchetIpBackup): void {
  if (data.seller && data.seller.name.trim()) {
    saveSeller(data.seller);
  }
  if (data.buyers.length > 0) {
    localStorage.setItem("schet-ip-buyers", JSON.stringify(data.buyers.slice(0, 20)));
  }
}

export function downloadBackupFile(data: SchetIpBackup): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const day = data.exportedAt.slice(0, 10) || "backup";
  a.href = url;
  a.download = `schet-ip-rekvizity-${day}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function readBackupFile(file: File): Promise<
  { ok: true; data: SchetIpBackup } | { ok: false; error: string }
> {
  try {
    const text = await file.text();
    return parseBackupJson(text);
  } catch {
    return { ok: false, error: "Не удалось открыть файл" };
  }
}
