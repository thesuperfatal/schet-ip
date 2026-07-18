import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Счёт<span className="text-blue-600">ИП</span>
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/create/?type=schet" className="text-slate-600 hover:text-blue-600">
            Счёт
          </Link>
          <Link href="/create/?type=akt" className="text-slate-600 hover:text-blue-600">
            Акт
          </Link>
        </nav>
      </div>
    </header>
  );
}
