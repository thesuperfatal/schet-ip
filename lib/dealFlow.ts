/** Параметры «сделки»: перенос данных между КП → договор → счёт → акт + шаринг. */

export interface DealPayload {
  buyer?: string;
  buyerInn?: string;
  buyerKpp?: string;
  buyerAddress?: string;
  item?: string;
  price?: number;
  qty?: number;
  unit?: string;
  vat?: string;
  subject?: string;
  amount?: number;
  number?: string;
  date?: string;
  /** Компактный JSON позиций: [{n,u,q,p}] */
  itemsJson?: string;
}

export type ShareItem = { name: string; unit: string; qty: number; price: number };

export function encodeShareItems(items: ShareItem[]): string | undefined {
  const compact = items
    .filter((i) => i.name.trim())
    .map((i) => ({
      n: i.name.trim(),
      u: i.unit.trim() || "шт",
      q: i.qty,
      p: i.price,
    }));
  if (compact.length === 0) return undefined;
  return JSON.stringify(compact);
}

export function decodeShareItems(raw: string | null | undefined): ShareItem[] | undefined {
  if (!raw?.trim()) return undefined;
  try {
    const parsed = JSON.parse(raw) as { n?: string; u?: string; q?: number; p?: number }[];
    if (!Array.isArray(parsed) || parsed.length === 0) return undefined;
    return parsed.map((row) => ({
      name: String(row.n || ""),
      unit: String(row.u || "шт"),
      qty: Number(row.q) || 1,
      price: Number(row.p) || 0,
    }));
  } catch {
    return undefined;
  }
}

export function buildDealUrl(
  path: string,
  from: string,
  payload: DealPayload,
  extra?: Record<string, string>
): string {
  const sp = new URLSearchParams();
  sp.set("from", from);

  if (payload.buyer?.trim()) sp.set("buyer", payload.buyer.trim());
  if (payload.buyerInn?.trim()) sp.set("buyerInn", payload.buyerInn.trim());
  if (payload.buyerKpp?.trim()) sp.set("buyerKpp", payload.buyerKpp.trim());
  if (payload.buyerAddress?.trim()) sp.set("buyerAddress", payload.buyerAddress.trim());
  if (payload.item?.trim()) sp.set("item", payload.item.trim());
  if (payload.price !== undefined && Number.isFinite(payload.price)) {
    sp.set("price", String(payload.price));
  }
  if (payload.qty !== undefined && Number.isFinite(payload.qty)) {
    sp.set("qty", String(payload.qty));
  }
  if (payload.unit?.trim()) sp.set("unit", payload.unit.trim());
  if (payload.vat?.trim()) sp.set("vat", payload.vat.trim());
  if (payload.subject?.trim()) sp.set("subject", payload.subject.trim());
  if (payload.amount !== undefined && Number.isFinite(payload.amount)) {
    sp.set("amount", String(payload.amount));
  }
  if (payload.number?.trim()) sp.set("num", payload.number.trim());
  if (payload.date?.trim()) sp.set("date", payload.date.trim());
  if (payload.itemsJson?.trim()) sp.set("items", payload.itemsJson.trim());

  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      if (value) sp.set(key, value);
    }
  }

  const q = sp.toString();
  return q ? `${path}?${q}` : path;
}

export function readDealParams(search: URLSearchParams): DealPayload & { from: string } {
  const priceRaw = search.get("price");
  const qtyRaw = search.get("qty");
  const amountRaw = search.get("amount");
  const price = priceRaw !== null ? Number(String(priceRaw).replace(",", ".")) : undefined;
  const qty = qtyRaw !== null ? Number(qtyRaw) : undefined;
  const amount = amountRaw !== null ? Number(String(amountRaw).replace(",", ".")) : undefined;

  return {
    from: search.get("from") || "",
    buyer: search.get("buyer") || undefined,
    buyerInn: search.get("buyerInn") || undefined,
    buyerKpp: search.get("buyerKpp") || undefined,
    buyerAddress: search.get("buyerAddress") || undefined,
    item: search.get("item") || undefined,
    price: Number.isFinite(price) ? price : undefined,
    qty: Number.isFinite(qty) ? qty : undefined,
    unit: search.get("unit") || undefined,
    vat: search.get("vat") || undefined,
    subject: search.get("subject") || undefined,
    amount: Number.isFinite(amount) ? amount : undefined,
    number: search.get("num") || undefined,
    date: search.get("date") || undefined,
    itemsJson: search.get("items") || undefined,
  };
}

export function dealFromItems(params: {
  clientName: string;
  clientInn?: string;
  clientKpp?: string;
  clientAddress?: string;
  vatNote: string;
  items: { name: string; unit: string; qty: number; price: number }[];
  subject?: string;
  number?: string;
  date?: string;
}): DealPayload {
  const first = params.items[0];
  const total = params.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  return {
    buyer: params.clientName,
    buyerInn: params.clientInn,
    buyerKpp: params.clientKpp,
    buyerAddress: params.clientAddress,
    item: first?.name,
    price: first?.price,
    qty: first?.qty,
    unit: first?.unit,
    vat: params.vatNote,
    subject: params.subject || first?.name,
    amount: total,
    number: params.number,
    date: params.date,
    itemsJson: encodeShareItems(params.items),
  };
}
