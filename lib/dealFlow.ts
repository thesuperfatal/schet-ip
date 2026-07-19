/** Параметры «сделки»: перенос данных между КП → договор → счёт → акт. */

export interface DealPayload {
  buyer?: string;
  buyerInn?: string;
  buyerAddress?: string;
  item?: string;
  price?: number;
  qty?: number;
  unit?: string;
  vat?: string;
  subject?: string;
  amount?: number;
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
    buyerAddress: search.get("buyerAddress") || undefined,
    item: search.get("item") || undefined,
    price: Number.isFinite(price) ? price : undefined,
    qty: Number.isFinite(qty) ? qty : undefined,
    unit: search.get("unit") || undefined,
    vat: search.get("vat") || undefined,
    subject: search.get("subject") || undefined,
    amount: Number.isFinite(amount) ? amount : undefined,
  };
}

export function dealFromItems(params: {
  clientName: string;
  clientInn?: string;
  clientAddress?: string;
  vatNote: string;
  items: { name: string; unit: string; qty: number; price: number }[];
  subject?: string;
}): DealPayload {
  const first = params.items[0];
  const total = params.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  return {
    buyer: params.clientName,
    buyerInn: params.clientInn,
    buyerAddress: params.clientAddress,
    item: first?.name,
    price: first?.price,
    qty: first?.qty,
    unit: first?.unit,
    vat: params.vatNote,
    subject: params.subject || first?.name,
    amount: total,
  };
}
