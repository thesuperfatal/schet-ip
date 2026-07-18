export const SITE_URL = "https://biznes-ip.ru";
export const SITE_NAME = "СчётИП";

export const SITE_PAGES = [
  { path: "/", title: "Главная", priority: 1, changeFrequency: "weekly" as const },
  { path: "/create/", title: "Создать счёт или акт", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/usn/", title: "Калькулятор УСН", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/nds/", title: "Калькулятор НДС", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/summa-propisyu/", title: "Сумма прописью", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/privacy/", title: "Политика конфиденциальности", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/contacts/", title: "Контакты", priority: 0.4, changeFrequency: "yearly" as const },
];
