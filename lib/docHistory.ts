import type { DocumentData } from "./types";

const HISTORY_KEY = "schet-ip-doc-history";
const MAX_ENTRIES = 10;

export interface DocHistoryEntry {
  id: string;
  savedAt: string;
  data: DocumentData;
}

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // ignore
    }
  }
  return `hist-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function loadDocHistory(): DocHistoryEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as DocHistoryEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e) => e && e.id && e.data && e.data.type);
  } catch {
    return [];
  }
}

export function saveDocToHistory(data: DocumentData): DocHistoryEntry[] {
  const entry: DocHistoryEntry = {
    id: createId(),
    savedAt: new Date().toISOString(),
    data: structuredClone
      ? structuredClone(data)
      : (JSON.parse(JSON.stringify(data)) as DocumentData),
  };

  const prev = loadDocHistory().filter(
    (e) =>
      !(
        e.data.type === data.type &&
        e.data.number === data.number &&
        e.data.date === data.date &&
        e.data.buyer.name === data.buyer.name
      )
  );

  const next = [entry, ...prev].slice(0, MAX_ENTRIES);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function removeDocFromHistory(id: string): DocHistoryEntry[] {
  const next = loadDocHistory().filter((e) => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function clearDocHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function historyLabel(entry: DocHistoryEntry): string {
  const kind = entry.data.type === "akt" ? "Акт" : "Счёт";
  const num = entry.data.number?.trim() || "—";
  const buyer = entry.data.buyer.name?.trim() || "без покупателя";
  return `${kind} №${num} · ${buyer}`;
}

export function historyTotal(entry: DocHistoryEntry): number {
  return entry.data.items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

/**
 * Следующий номер документа того же типа по истории в браузере.
 * Учитывает префикс/суффикс: «12» → «13», «С-5» → «С-6».
 */
export function suggestNextNumber(
  type: DocumentData["type"],
  history: DocHistoryEntry[] = loadDocHistory()
): string {
  let best = 0;
  let prefix = "";
  let suffix = "";

  for (const entry of history) {
    if (entry.data.type !== type) continue;
    const raw = entry.data.number?.trim() || "";
    const m = /^(.*?)(\d+)(\D*)$/.exec(raw);
    if (!m) continue;
    const n = Number(m[2]);
    if (!Number.isFinite(n) || n < best) continue;
    best = n;
    prefix = m[1];
    suffix = m[3];
  }

  if (best <= 0) return "1";
  return `${prefix}${best + 1}${suffix}`;
}
