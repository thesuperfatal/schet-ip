"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavLink({
  href,
  label,
  tip,
}: {
  href: string;
  label: string;
  tip: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <Link href={href} className="text-slate-600 hover:text-blue-600">
        {label}
      </Link>
      {open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-50 w-max max-w-[200px] -translate-x-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-center text-xs font-normal leading-snug text-white shadow-lg"
        >
          {tip}
          <span
            aria-hidden
            className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900"
          />
        </span>
      )}
    </span>
  );
}
