/** Ориентировочные сроки для ИП (НК РФ / ФНС). Не замена календарю налогоплательщика. */

export type DeadlineCategory = "usn" | "vznosy" | "common";

export interface TaxDeadline {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  category: DeadlineCategory;
  hint: string;
  href?: string;
}

function iso(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/** Сроки по календарному году деятельности `year` (+ связанные даты в следующем году). */
export function deadlinesForActivityYear(year: number): TaxDeadline[] {
  const next = year + 1;
  const list: TaxDeadline[] = [
    {
      id: `${year}-usn-q1`,
      date: iso(year, 4, 28),
      title: `Аванс УСН за I квартал ${year}`,
      category: "usn",
      hint: "Не позднее 28 апреля — авансовый платёж по УСН.",
      href: "/usn/",
    },
    {
      id: `${year}-usn-q2`,
      date: iso(year, 7, 28),
      title: `Аванс УСН за полугодие ${year}`,
      category: "usn",
      hint: "Не позднее 28 июля — аванс за 6 месяцев.",
      href: "/usn/",
    },
    {
      id: `${year}-usn-q3`,
      date: iso(year, 10, 28),
      title: `Аванс УСН за 9 месяцев ${year}`,
      category: "usn",
      hint: "Не позднее 28 октября — аванс за 9 месяцев.",
      href: "/usn/",
    },
    {
      id: `${year}-vznosy-fix`,
      date: iso(year, 12, 31),
      title: `Фиксированные взносы ИП за ${year}`,
      category: "vznosy",
      hint: "Оплатить фиксированные взносы «за себя» до конца года.",
      href: "/vznosy/",
    },
    {
      id: `${year}-usn-decl`,
      date: iso(next, 4, 25),
      title: `Декларация УСН за ${year}`,
      category: "usn",
      hint: "ИП сдают декларацию по УСН не позднее 25 апреля следующего года.",
      href: "/usn/",
    },
    {
      id: `${year}-usn-year-tax`,
      date: iso(next, 4, 28),
      title: `Налог УСН по итогам ${year}`,
      category: "usn",
      hint: "Доплатить налог за год не позднее 28 апреля следующего года.",
      href: "/usn/",
    },
    {
      id: `${year}-vznosy-1pct`,
      date: iso(next, 7, 1),
      title: `Взносы 1% свыше 300 000 ₽ за ${year}`,
      category: "vznosy",
      hint: "1% с дохода свыше 300 тыс. ₽ — не позднее 1 июля следующего года.",
      href: "/vznosy/",
    },
    {
      id: `${year}-common-remind`,
      date: iso(year, 1, 15),
      title: "Проверьте режим и реквизиты на год",
      category: "common",
      hint: "Убедитесь, что УСН/патент оформлены, КУДиР готова, реквизиты для счетов актуальны.",
      href: "/otkryl-ip/",
    },
  ];
  return list.sort((a, b) => a.date.localeCompare(b.date));
}

export function parseIsoDate(isoDate: string): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDeadlineDate(isoDate: string): string {
  return parseIsoDate(isoDate).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = parseIsoDate(isoDate);
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const diff = target.getTime() - start.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export type DeadlineStatus = "overdue" | "soon" | "later";

export function deadlineStatus(isoDate: string, from: Date = new Date()): DeadlineStatus {
  const days = daysUntil(isoDate, from);
  if (days < 0) return "overdue";
  if (days <= 30) return "soon";
  return "later";
}

export function filterDeadlines(
  items: TaxDeadline[],
  opts: { usn: boolean; vznosy: boolean; common: boolean }
): TaxDeadline[] {
  return items.filter((d) => {
    if (d.category === "usn") return opts.usn;
    if (d.category === "vznosy") return opts.vznosy;
    return opts.common;
  });
}
