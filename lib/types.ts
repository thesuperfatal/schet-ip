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

export const emptyItem = (): LineItem => ({
  id: crypto.randomUUID(),
  name: "",
  unit: "шт",
  qty: 1,
  price: 0,
});
