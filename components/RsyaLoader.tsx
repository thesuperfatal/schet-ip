"use client";

import Script from "next/script";
import { RSYA_ENABLED } from "@/lib/rsya";

/** Загрузчик контекста РСЯ — только если реклама включена. */
export default function RsyaLoader() {
  if (!RSYA_ENABLED) return null;

  return (
    <>
      <Script id="yandex-rsya-cb" strategy="beforeInteractive">{`
        window.yaContextCb = window.yaContextCb || [];
      `}</Script>
      <Script
        src="https://yandex.ru/ads/system/context.js"
        strategy="afterInteractive"
      />
    </>
  );
}
