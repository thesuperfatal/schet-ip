export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "naznachenie-platezha",
    title: "Назначение платежа по счёту: что писать ИП",
    description:
      "Готовые формулировки для банка: номер счёта, дата, сумма и НДС. Как скопировать текст в СчётИП.",
    date: "2026-07-19",
  },
  {
    slug: "chto-takoe-upd",
    title: "Что такое УПД и чем отличается от накладной",
    description:
      "УПД простыми словами: когда нужна накладная, когда акт, и как оформить документ на отгрузку.",
    date: "2026-07-19",
  },
  {
    slug: "patent-ili-usn",
    title: "Патент или УСН: что выбрать ИП",
    description:
      "Чем патент отличается от упрощёнки, когда какой режим выгоднее и как учесть взносы.",
    date: "2026-07-19",
  },
  {
    slug: "kak-vystavit-schet",
    title: "Как выставить счёт ИП клиенту: пошагово",
    description:
      "Реквизиты, услуга, НДС и PDF: простой порядок выставления счёта без Word и Excel.",
    date: "2026-07-19",
  },
  {
    slug: "schet-i-akt",
    title: "Счёт и акт для ИП: чем отличаются и когда нужны",
    description:
      "Чем счёт отличается от акта, в каком порядке их выставлять и как оформить оба документа онлайн.",
    date: "2026-07-19",
  },
  {
    slug: "usn-6-ili-15",
    title: "УСН 6% или 15%: что выгоднее ИП",
    description:
      "Как сравнить УСН «доходы» и «доходы минус расходы», учесть взносы и понять, сколько откладывать на налог.",
    date: "2026-07-19",
  },
  {
    slug: "nds-na-usn-2026",
    title: "НДС на УСН в 2026 году: что важно знать ИП",
    description:
      "Когда на упрощёнке появляется НДС, какие ставки 5% и 7%, и как посчитать сумму для счёта.",
    date: "2026-07-19",
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
