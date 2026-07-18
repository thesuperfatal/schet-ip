import type { BuyerInfo, SellerInfo } from "./types";
import { emptyBuyer, emptySeller } from "./types";

export interface ContractData {
  number: string;
  date: string;
  city: string;
  executor: SellerInfo;
  customer: BuyerInfo;
  subject: string;
  amount: number;
  vatNote: string;
  startDate: string;
  endDate: string;
  paymentDays: number;
  extraTerms: string;
}

export function emptyContract(): ContractData {
  const today = new Date().toISOString().slice(0, 10);
  return {
    number: "1",
    date: today,
    city: "Москва",
    executor: emptySeller(),
    customer: emptyBuyer(),
    subject: "оказание услуг",
    amount: 0,
    vatNote: "Без НДС.",
    startDate: today,
    endDate: today,
    paymentDays: 5,
    extraTerms: "",
  };
}
