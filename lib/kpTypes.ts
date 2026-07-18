import type { BuyerInfo, LineItem, SellerInfo } from "./types";
import { emptyBuyer, emptyItem, emptySeller } from "./types";

export interface KpData {
  number: string;
  date: string;
  title: string;
  intro: string;
  seller: SellerInfo;
  client: BuyerInfo;
  items: LineItem[];
  vatNote: string;
  validDays: number;
  paymentTerms: string;
  closing: string;
}

export function emptyKp(): KpData {
  return {
    number: "1",
    date: new Date().toISOString().slice(0, 10),
    title: "Коммерческое предложение",
    intro:
      "Благодарим за интерес к сотрудничеству. Ниже — условия оказания услуг / поставки по вашему запросу.",
    seller: emptySeller(),
    client: emptyBuyer(),
    items: [emptyItem()],
    vatNote: "Без НДС.",
    validDays: 14,
    paymentTerms: "Оплата по счёту в течение 5 банковских дней.",
    closing: "Готовы ответить на вопросы и уточнить сроки старта.",
  };
}
