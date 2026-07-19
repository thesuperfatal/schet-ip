import Link from "next/link";
import NavLink from "@/components/NavLink";

const NAV = [
  { href: "/create/?type=schet", label: "Счёт", tip: "Счёт на оплату в PDF" },
  { href: "/create/?type=akt", label: "Акт", tip: "Акт выполненных работ в PDF" },
  { href: "/dogovor/", label: "Договор", tip: "Договор оказания услуг" },
  { href: "/nakladnaya/", label: "Накладная", tip: "Товарная накладная или УПД" },
  { href: "/kp/", label: "КП", tip: "Коммерческое предложение" },
  { href: "/usn/", label: "УСН", tip: "Калькулятор налога УСН 6% и 15%" },
  { href: "/vznosy/", label: "Взносы", tip: "Страховые взносы ИП за себя" },
  { href: "/nds/", label: "НДС", tip: "Начислить или выделить НДС" },
  { href: "/summa-propisyu/", label: "Прописью", tip: "Сумма прописью для документов" },
  { href: "/srok-oplaty/", label: "Срок/пени", tip: "Срок оплаты и расчёт пеней" },
] as const;

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold text-slate-900"
          title="СчётИП — инструменты для ИП"
        >
          Счёт<span className="text-blue-600">ИП</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
          {NAV.map((item) => (
            <NavLink key={item.href + item.label} href={item.href} label={item.label} tip={item.tip} />
          ))}
        </nav>
      </div>
    </header>
  );
}
