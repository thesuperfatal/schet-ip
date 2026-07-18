import type { BuyerInfo, LineItem, SellerInfo } from "./types";
import { emptyBuyer, emptyItem, emptySeller } from "./types";

export type NakladnayaKind = "nakladnaya" | "upd";

export interface NakladnayaData {
  kind: NakladnayaKind;
  number: string;
  date: string;
  seller: SellerInfo;
  buyer: BuyerInfo;
  items: LineItem[];
  vatNote: string;
  basis: string;
}

export function emptyNakladnaya(): NakladnayaData {
  return {
    kind: "nakladnaya",
    number: "1",
    date: new Date().toISOString().slice(0, 10),
    seller: emptySeller(),
    buyer: emptyBuyer(),
    items: [emptyItem()],
    vatNote: "Без НДС.",
    basis: "Договор / счёт",
  };
}
