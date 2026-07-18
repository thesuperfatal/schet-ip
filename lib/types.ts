export type DocumentType = "schet" | "akt";

export interface SellerInfo {
  name: string;
  inn: string;
  kpp: string;
  address: string;
  bank: string;
  bik: string;
  account: string;
  corrAccount: string;
  phone: string;
}

export interface BuyerInfo {
  name: string;
  inn: string;
  kpp: string;
  address: string;
}

export interface LineItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  price: number;
}

export interface DocumentData {
  type: DocumentType;
  number: string;
  date: string;
  seller: SellerInfo;
  buyer: BuyerInfo;
  items: LineItem[];
  vatNote: string;
}

export const emptySeller = (): SellerInfo => ({
  name: "",
  inn: "",
  kpp: "",
  address: "",
  bank: "",
  bik: "",
  account: "",
  corrAccount: "",
  phone: "",
});

export const emptyBuyer = (): BuyerInfo => ({
  name: "",
  inn: "",
  kpp: "",
  address: "",
});

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // HTTP (не secure context) — randomUUID недоступен
    }
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export const emptyItem = (): LineItem => ({
  id: createId(),
  name: "",
  unit: "шт",
  qty: 1,
  price: 0,
});
