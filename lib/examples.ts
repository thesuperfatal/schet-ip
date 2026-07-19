import { emptyBuyer, emptyItem, emptySeller, type BuyerInfo, type LineItem, type SellerInfo } from "./types";

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
  const sp = new URLSearchParams();
  sp.set("type", "schet");
  sp.set("from", "kp");
  if (params.clientName.trim()) sp.set("buyer", params.clientName.trim());
  if (params.vatNote.trim()) sp.set("vat", params.vatNote.trim());

  const first = params.items[0];
  if (first) {
    if (first.name.trim()) sp.set("item", first.name.trim());
    sp.set("price", String(first.price));
    sp.set("qty", String(first.qty));
    if (first.unit.trim()) sp.set("unit", first.unit.trim());
  }

  return `/create/?${sp.toString()}`;
}
