export type ToolCategory = "documents" | "calculators" | "guides";

export interface SiteTool {
  href: string;
  title: string;
  short: string;
  tip: string;
  category: ToolCategory;
  navLabel?: string;
  inNav?: boolean;
}

export const TOOL_CATEGORIES: Record<
  ToolCategory,
  { title: string; blurb: string }
> = {
  documents: {
    title: "Документы в PDF",
    blurb: "Заполните форму → скачайте готовый файл. Реквизиты сохраняются в браузере.",
  },
  calculators: {
    title: "Калькуляторы",
    blurb: "Считайте налоги, взносы и сроки — без таблиц и сложных программ.",
  },
  guides: {
    title: "Подсказки и статьи",
    blurb: "Если не знаете, с чего начать — откройте чек-лист или FAQ.",
  },
};

/** Единый каталог инструментов сайта (главная, меню, правила проекта). */
export const SITE_TOOLS: SiteTool[] = [
  {
    href: "/create/?type=schet",
    title: "Счёт на оплату",
    short: "Выставить счёт клиенту и скачать PDF.",
    tip: "Счёт на оплату в PDF",
    category: "documents",
    navLabel: "Счёт",
    inNav: true,
  },
  {
    href: "/create/?type=akt",
    title: "Акт выполненных работ",
    short: "Подтвердить, что работа сделана.",
    tip: "Акт выполненных работ в PDF",
    category: "documents",
    navLabel: "Акт",
    inNav: true,
  },
  {
    href: "/dogovor/",
    title: "Договор оказания услуг",
    short: "Простой договор: стороны, предмет, сумма.",
    tip: "Договор оказания услуг",
    category: "documents",
    navLabel: "Договор",
    inNav: true,
  },
  {
    href: "/nakladnaya/",
    title: "Накладная / УПД",
    short: "Документ на отгрузку товара.",
    tip: "Товарная накладная или УПД",
    category: "documents",
    navLabel: "Накладная",
    inNav: true,
  },
  {
    href: "/kp/",
    title: "Коммерческое предложение",
    short: "КП с ценами до договора и счёта.",
    tip: "Коммерческое предложение",
    category: "documents",
    navLabel: "КП",
    inNav: true,
  },
  {
    href: "/doverennost/",
    title: "Доверенность",
    short: "Уполномочить представителя подписывать документы.",
    tip: "Доверенность от ИП в PDF",
    category: "documents",
    navLabel: "Доверенность",
    inNav: true,
  },
  {
    href: "/pretenziya/",
    title: "Претензия о просрочке",
    short: "Письмо должнику с расчётом пеней.",
    tip: "Претензия о просрочке оплаты",
    category: "documents",
    navLabel: "Претензия",
    inNav: true,
  },
  {
    href: "/usn/",
    title: "Калькулятор УСН",
    short: "6% или 15%, взносы, сколько откладывать.",
    tip: "Калькулятор налога УСН 6% и 15%",
    category: "calculators",
    navLabel: "УСН",
    inNav: true,
  },
  {
    href: "/patent-usn/",
    title: "Патент или УСН",
    short: "Сравнить патент с упрощёнкой 6% и 15%.",
    tip: "Сравнить патент и УСН",
    category: "calculators",
    navLabel: "Патент",
    inNav: true,
  },
  {
    href: "/vznosy/",
    title: "Страховые взносы ИП",
    short: "Фикс + 1% свыше 300 тыс. ₽.",
    tip: "Страховые взносы ИП за себя",
    category: "calculators",
    navLabel: "Взносы",
    inNav: true,
  },
  {
    href: "/nds/",
    title: "Калькулятор НДС",
    short: "Начислить или выделить НДС для счёта.",
    tip: "Начислить или выделить НДС",
    category: "calculators",
    navLabel: "НДС",
    inNav: true,
  },
  {
    href: "/summa-propisyu/",
    title: "Сумма прописью",
    short: "Число → текст для договора и счёта.",
    tip: "Сумма прописью для документов",
    category: "calculators",
    navLabel: "Прописью",
    inNav: true,
  },
  {
    href: "/srok-oplaty/",
    title: "Срок оплаты и пени",
    short: "Когда платить и сколько пени при просрочке.",
    tip: "Срок оплаты и расчёт пеней",
    category: "calculators",
    navLabel: "Срок/пени",
    inNav: true,
  },
  {
    href: "/sroki/",
    title: "Календарь сроков ИП",
    short: "Авансы УСН, взносы, декларация.",
    tip: "Календарь налоговых сроков ИП",
    category: "calculators",
    navLabel: "Календарь",
    inNav: true,
  },
  {
    href: "/tools/",
    title: "Все инструменты",
    short: "Полный каталог документов и калькуляторов.",
    tip: "Каталог всех инструментов СчётИП",
    category: "guides",
    navLabel: "Все",
    inNav: false,
  },
  {
    href: "/otkryl-ip/",
    title: "Чек-лист «Открыл ИП»",
    short: "Пошагово: налоги, счёт, документы.",
    tip: "Что сделать после регистрации ИП",
    category: "guides",
    navLabel: "Открыл ИП",
    inNav: false,
  },
  {
    href: "/faq/",
    title: "Частые вопросы",
    short: "Короткие ответы про сервис и документы.",
    tip: "Частые вопросы о СчётИП",
    category: "guides",
    navLabel: "FAQ",
    inNav: false,
  },
];

export function toolsByCategory(category: ToolCategory): SiteTool[] {
  return SITE_TOOLS.filter((t) => t.category === category);
}

export function navTools(): SiteTool[] {
  return SITE_TOOLS.filter((t) => t.inNav);
}
