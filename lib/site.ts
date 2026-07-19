export const SITE_URL = "https://biznes-ip.ru";
export const SITE_NAME = "СчётИП";

export const SITE_PAGES = [
  { path: "/", title: "Главная", priority: 1, changeFrequency: "weekly" as const },
  { path: "/tools/", title: "Все инструменты", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/create/", title: "Создать счёт или акт", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/dogovor/", title: "Договор оказания услуг", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/nakladnaya/", title: "Товарная накладная / УПД", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/kp/", title: "Коммерческое предложение", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/usn/", title: "Калькулятор УСН", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/vznosy/", title: "Калькулятор взносов ИП", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/nds/", title: "Калькулятор НДС", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/summa-propisyu/", title: "Сумма прописью", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/srok-oplaty/", title: "Срок оплаты и пени", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/otkryl-ip/", title: "Чек-лист «Открыл ИП»", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/articles/", title: "Статьи", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/articles/kak-vystavit-schet/", title: "Как выставить счёт", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/articles/schet-i-akt/", title: "Счёт и акт для ИП", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/articles/usn-6-ili-15/", title: "УСН 6% или 15%", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/articles/nds-na-usn-2026/", title: "НДС на УСН 2026", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/faq/", title: "Частые вопросы", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about/", title: "О проекте", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/privacy/", title: "Политика конфиденциальности", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms/", title: "Пользовательское соглашение", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/contacts/", title: "Контакты", priority: 0.4, changeFrequency: "yearly" as const },
];
