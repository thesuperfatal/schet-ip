"use client";

import { useId, useState } from "react";

/** Краткая всплывающая подсказка у поля (hover / focus / tap). */
export default function Hint({ text }: { text: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className="relative ml-1 inline-flex align-middle">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-label="Подсказка"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-[10px] font-semibold leading-none text-slate-500 hover:border-blue-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        ?
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-[calc(100%+6px)] left-1/2 z-50 w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-left text-xs font-normal leading-snug text-white shadow-lg"
        >
          {text}
          <span
            aria-hidden
            className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900"
          />
        </span>
      )}
    </span>
  );
}
