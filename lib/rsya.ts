/**
 * РСЯ: реклама выключена до одобрения площадки и явного включения.
 * После одобрения: задайте NEXT_PUBLIC_RSYA_ENABLED=true и ID блоков,
 * затем пересоберите сайт. На /create блоки не ставить.
 */
export const RSYA_ENABLED =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_RSYA_ENABLED === "true";

/** ID блока из кабинета РСЯ (заполнить после одобрения). */
export const RSYA_BLOCK_IDS = {
  articlesBottom: process.env.NEXT_PUBLIC_RSYA_BLOCK_ARTICLES || "",
  faqBottom: process.env.NEXT_PUBLIC_RSYA_BLOCK_FAQ || "",
  aboutBottom: process.env.NEXT_PUBLIC_RSYA_BLOCK_ABOUT || "",
} as const;
