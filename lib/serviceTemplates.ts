/** Быстрые шаблоны позиций для счёта/акта. */

export interface ServiceTemplate {
  label: string;
  name: string;
  unit: string;
  qty: number;
  price: number;
}

export const SERVICE_TEMPLATES: ServiceTemplate[] = [
  {
    label: "Консультация",
    name: "Консультационные услуги",
    unit: "час",
    qty: 1,
    price: 5000,
  },
  {
    label: "Дизайн",
    name: "Дизайн логотипа / фирменного стиля",
    unit: "шт",
    qty: 1,
    price: 15000,
  },
  {
    label: "Сайт",
    name: "Разработка сайта",
    unit: "шт",
    qty: 1,
    price: 50000,
  },
  {
    label: "Сопровождение",
    name: "Техническое сопровождение",
    unit: "мес",
    qty: 1,
    price: 10000,
  },
  {
    label: "Доставка",
    name: "Услуги доставки",
    unit: "шт",
    qty: 1,
    price: 1000,
  },
];
