"use client";

import { useRef, useState } from "react";
import type { BuyerInfo, SellerInfo } from "@/lib/types";
import {
  applyBackup,
  buildBackup,
  downloadBackupFile,
  readBackupFile,
} from "@/lib/backup";
import { loadBuyers } from "@/lib/buyers";

interface DataBackupProps {
  seller: SellerInfo;
  buyers: BuyerInfo[];
  onImported: (seller: SellerInfo | null, buyers: BuyerInfo[]) => void;
  onMessage: (text: string) => void;
}

export default function DataBackup({ seller, buyers, onImported, onMessage }: DataBackupProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  function handleExport() {
    const data = buildBackup(seller, buyers);
    if (!data.seller?.name?.trim() && data.buyers.length === 0) {
      onMessage("Нечего сохранять — заполните реквизиты или список покупателей");
      return;
    }
    downloadBackupFile(data);
    onMessage("Файл с реквизитами скачан — храните его у себя");
  }

  async function handleImport(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const result = await readBackupFile(file);
      if (!result.ok) {
        onMessage(result.error);
        return;
      }
      applyBackup(result.data);
      const nextBuyers = result.data.buyers.length > 0 ? result.data.buyers : loadBuyers();
      onImported(result.data.seller, nextBuyers);
      onMessage("Реквизиты загружены из файла");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3">
      <p className="text-sm font-medium text-slate-800">Резервная копия</p>
      <p className="mt-0.5 text-xs text-slate-500">
        Скачайте JSON с реквизитами ИП и покупателями — пригодится на другом компьютере или после
        очистки браузера
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExport}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-50"
        >
          Скачать JSON
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-50 disabled:opacity-60"
        >
          {busy ? "Загрузка…" : "Загрузить JSON"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => void handleImport(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
