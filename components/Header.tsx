import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="shrink-0 text-lg font-bold text-slate-900">
          Счёт<span className="text-blue-600">ИП</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm">
          <Link href="/create/?type=schet" className="text-slate-600 hover:text-blue-600">
            Счёт
          </Link>
          <Link href="/create/?type=akt" className="text-slate-600 hover:text-blue-600">
            Акт
          </Link>
          <Link href="/dogovor/" className="text-slate-600 hover:text-blue-600">
            Договор
          </Link>
          <Link href="/nakladnaya/" className="text-slate-600 hover:text-blue-600">
            Накладная
          </Link>
          <Link href="/kp/" className="text-slate-600 hover:text-blue-600">
            КП
          </Link>
          <Link href="/usn/" className="text-slate-600 hover:text-blue-600">
            УСН
          </Link>
          <Link href="/vznosy/" className="text-slate-600 hover:text-blue-600">
            Взносы
          </Link>
          <Link href="/nds/" className="text-slate-600 hover:text-blue-600">
            НДС
          </Link>
          <Link href="/summa-propisyu/" className="text-slate-600 hover:text-blue-600">
            Прописью
          </Link>
        </nav>
      </div>
    </header>
  );
}
