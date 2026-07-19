import type { BuyerInfo, SellerInfo } from "./types";
import { emptyBuyer, emptySeller } from "./types";
import {
  DEFAULT_KEY_RATE,
  calcDeadline,
  type PenaltyMode,
} from "./paymentDeadline";

export interface ClaimLetterData {
  number: string;
  date: string;
  city: string;
  seller: SellerInfo;
  buyer: BuyerInfo;
  invoiceNumber: string;
  invoiceDate: string;
  deferralDays: number;
  /** Дата, на которую считаем просрочку (обычно сегодня). */
  asOfDate: string;
  amount: number;
  penaltyMode: PenaltyMode;
  keyRate: number;
  customDailyRate: number;
  demandDays: number;
  extraText: string;
}

export function emptyClaimLetter(): ClaimLetterData {
  const today = new Date().toISOString().slice(0, 10);
  return {
    number: "1",
    date: today,
    city: "Москва",
    seller: emptySeller(),
    buyer: emptyBuyer(),
    invoiceNumber: "1",
    invoiceDate: today,
    deferralDays: 5,
    asOfDate: today,
    amount: 0,
    penaltyMode: "key_300",
    keyRate: DEFAULT_KEY_RATE,
    customDailyRate: 0.001,
    demandDays: 5,
    extraText: "",
  };
}

export function claimPenalty(data: ClaimLetterData) {
  return calcDeadline({
    invoiceDate: data.invoiceDate,
    deferralDays: data.deferralDays,
    paymentDate: data.asOfDate,
    amount: data.amount,
    mode: data.penaltyMode,
    customDailyRate: data.customDailyRate,
    keyRate: data.keyRate,
  });
}
