"use client";

import { useEffect, useId } from "react";
import { RSYA_ENABLED } from "@/lib/rsya";

/**
 * Слот РСЯ. Ничего не рендерит, пока RSYA_ENABLED=false или нет blockId.
 * Не использовать на /create.
 */
export default function AdSlot({
  blockId,
  className = "",
}: {
  blockId: string;
  className?: string;
}) {
  const reactId = useId().replace(/:/g, "");
  const elId = `yandex_rtb_${blockId || "off"}_${reactId}`;

  useEffect(() => {
    if (!RSYA_ENABLED || !blockId || typeof window === "undefined") return;

    const w = window as Window & {
      yaContextCb?: Array<() => void>;
      Ya?: {
        Context?: {
          AdvManager?: { render: (opts: { blockId: string; renderTo: string }) => void };
        };
      };
    };

    w.yaContextCb = w.yaContextCb || [];
    w.yaContextCb.push(() => {
      w.Ya?.Context?.AdvManager?.render({
        blockId,
        renderTo: elId,
      });
    });
  }, [blockId, elId]);

  if (!RSYA_ENABLED || !blockId) return null;

  return (
    <div className={`my-8 overflow-hidden ${className}`} aria-label="Реклама">
      <div id={elId} />
    </div>
  );
}
