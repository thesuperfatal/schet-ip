import { emptyBuyer, emptyItem, emptySeller, type BuyerInfo, type LineItem, type SellerInfo } from "./types";
import { buildDealUrl, dealFromItems } from "./dealFlow";

/** Демо-данные для кнопки «Заполнить пример». */
export function exampleSeller(): SellerInfo {
  return {
    ...emptySeller(),
    name: "ИП Иванов Иван Иванович",
    inn: "770123456789",
    address: "г. Москва, ул. Примерная, д. 1",
    bank: "ПАО Сбербанк",
    bik: "044525225",
    account: "40802810900000012345",
    corrAccount: "30101810400000000225",
    phone: "+7 900 000-00-00",
  };
}

export function exampleBuyer(): BuyerInfo {
  return {
    ...emptyBuyer(),
    name: "ООО «Ромашка»",
    inn: "7709876543",
    kpp: "770901001",
    address: "г. Москва, пр-т Клиентский, д. 10",
  };
}

export function exampleItems(): LineItem[] {
  const first = emptyItem();
  return [
    {
      ...first,
      name: "Разработка лендинга",
      unit: "усл",
      qty: 1,
      price: 45000,
    },
  ];
}

export function buildCreateFromKpUrl(params: {
  clientName: string;
  vatNote: string;
  items: { name: string; unit: string; qty: number; price: number }[];
}): string {
  return buildDealUrl(
    "/create/",
    "kp",
    dealFromItems({
      clientName: params.clientName,
      vatNote: params.vatNote,
      items: params.items,
    }),
    { type: "schet" }
  );
}
