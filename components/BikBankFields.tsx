"use client";

import { useState } from "react";
import FormField from "@/components/FormField";
import { lookupBankByBik, normalizeBik } from "@/lib/bikLookup";

interface BikBankFieldsProps {
  bik: string;
  bank: string;
  corrAccount: string;
  onChange: (patch: { bik?: string; bank?: string; corrAccount?: string }) => void;
}

/** Поля БИК / банк / корр. счёт с автоподстановкой по справочнику. */
export default function BikBankFields({ bik, bank, corrAccount, onChange }: BikBankFieldsProps) {
  const [status, setStatus] = useState("");

  function applyLookup(raw: string) {
    const normalized = normalizeBik(raw);
    if (normalized.length < 9) {
      onChange({ bik: normalized });
      setStatus("");
      return;
    }

    const found = lookupBankByBik(normalized);
    if (found) {
      onChange({
        bik: found.bik,
        bank: found.name,
        corrAccount: found.corrAccount,
      });
      setStatus(`Подставлено: ${found.name}`);
    } else {
      onChange({ bik: normalized });
      setStatus("Банк не найден в справочнике — заполните название и корр. счёт вручную");
    }
  }

  return (
    <>
      <FormField
        label="БИК"
        value={bik}
        onChange={applyLookup}
        hint="9 цифр. Для популярных банков название и корр. счёт подставятся сами"
      />
      <FormField
        label="Банк"
        value={bank}
        onChange={(v) => onChange({ bank: v })}
        className="sm:col-span-2"
        hint="Название банка из реквизитов"
      />
      <FormField
        label="Корр. счёт"
        value={corrAccount}
        onChange={(v) => onChange({ corrAccount: v })}
        hint="Обычно подставляется вместе с БИК"
      />
      {status && <p className="sm:col-span-2 text-xs text-slate-500">{status}</p>}
    </>
  );
}
