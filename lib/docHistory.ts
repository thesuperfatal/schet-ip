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
