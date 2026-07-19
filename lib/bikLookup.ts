export interface BankInfo {
  bik: string;
  name: string;
  corrAccount: string;
}

/** Популярные БИК для мгновенной подстановки без внешнего API. */
const BANKS: BankInfo[] = [
  { bik: "044525225", name: "ПАО Сбербанк", corrAccount: "30101810400000000225" },
  { bik: "044525974", name: "АО «ТБанк»", corrAccount: "30101810145250000974" },
  { bik: "044525593", name: "АО «Альфа-Банк»", corrAccount: "30101810200000000593" },
  { bik: "044525187", name: "Банк ВТБ (ПАО)", corrAccount: "30101810700000000187" },
  { bik: "044525104", name: "АО «Райффайзенбанк»", corrAccount: "30101810200000000104" },
  { bik: "044525232", name: "АО «Россельхозбанк»", corrAccount: "30101810200000000232" },
  { bik: "044525700", name: "АО «Россельхозбанк» (Москва)", corrAccount: "30101810945250000700" },
  { bik: "044525555", name: "ПАО «Промсвязьбанк»", corrAccount: "30101810400000000555" },
  { bik: "044525745", name: "ООО «Банк Точка»", corrAccount: "30101810745374525174" },
  { bik: "044525659", name: "АО «Совкомбанк»", corrAccount: "30101810945250000659" },
  { bik: "044525388", name: "ПАО «Совкомбанк»", corrAccount: "30101810400000000388" },
  { bik: "044525985", name: "ООО «Озон Банк»", corrAccount: "30101810645250000985" },
  { bik: "044525902", name: "ООО «Вайлдберриз Банк»", corrAccount: "30101810845250000902" },
  { bik: "044525090", name: "Московский кредитный банк (ПАО)", corrAccount: "30101810300000000090" },
  { bik: "044525823", name: "Банк ГПБ (АО)", corrAccount: "30101810200000000823" },
  { bik: "044525297", name: "АО ЮниКредит Банк", corrAccount: "30101810300000000297" },
  { bik: "044525151", name: "АО «РОСБАНК»", corrAccount: "30101810400000000151" },
  { bik: "044525777", name: "АО «Банк ДОМ.РФ»", corrAccount: "30101810345250000777" },
  { bik: "044525080", name: "АО «АБ «РОССИЯ»", corrAccount: "30101810500000000080" },
  { bik: "044525060", name: "ПАО «АК БАРС» БАНК", corrAccount: "30101810000000000060" },
  { bik: "044525311", name: "ПАО «МТС-Банк»", corrAccount: "30101810600000000311" },
  { bik: "044525161", name: "АО КБ «Ситибанк»", corrAccount: "30101810100000000161" },
  { bik: "044525202", name: "ПАО Банк «ФК Открытие»", corrAccount: "30101810345250000202" },
  { bik: "044525107", name: "АО «Экспобанк»", corrAccount: "30101810145250000107" },
  { bik: "044525364", name: "АО «ОТП Банк»", corrAccount: "30101810045250000364" },
];

const BY_BIK = new Map(BANKS.map((b) => [b.bik, b]));

export function normalizeBik(value: string): string {
  return String(value).replace(/\D/g, "").slice(0, 9);
}

export function lookupBankByBik(bikRaw: string): BankInfo | null {
  const bik = normalizeBik(bikRaw);
  if (bik.length !== 9) return null;
  return BY_BIK.get(bik) ?? null;
}

export function isValidBikFormat(bikRaw: string): boolean {
  return normalizeBik(bikRaw).length === 9;
}
