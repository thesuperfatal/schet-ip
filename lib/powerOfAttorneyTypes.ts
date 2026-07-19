import type { SellerInfo } from "./types";
import { emptySeller } from "./types";

export interface AttorneyPerson {
  name: string;
  passport: string;
  passportIssued: string;
  passportDate: string;
  address: string;
}

export interface PowerOfAttorneyData {
  number: string;
  date: string;
  city: string;
  validUntil: string;
  principal: SellerInfo;
  attorney: AttorneyPerson;
  /** Готовые полномочия (отмеченные). */
  powers: string[];
  extraPowers: string;
}

export const DEFAULT_POWERS = [
  "представлять интересы Доверителя в отношениях с контрагентами;",
  "подписывать договоры, счета, акты, накладные и иные документы по сделкам Доверителя;",
  "получать и передавать документы, товарно-материальные ценности;",
  "вести переговоры и согласовывать условия сотрудничества;",
] as const;

export function emptyAttorney(): AttorneyPerson {
  return {
    name: "",
    passport: "",
    passportIssued: "",
    passportDate: "",
    address: "",
  };
}

export function emptyPowerOfAttorney(): PowerOfAttorneyData {
  const today = new Date().toISOString().slice(0, 10);
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  return {
    number: "1",
    date: today,
    city: "Москва",
    validUntil: nextYear.toISOString().slice(0, 10),
    principal: emptySeller(),
    attorney: emptyAttorney(),
    powers: [...DEFAULT_POWERS],
    extraPowers: "",
  };
}
