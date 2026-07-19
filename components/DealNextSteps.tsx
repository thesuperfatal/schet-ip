import Link from "next/link";

export interface NextStepLink {
  href: string;
  label: string;
  hint: string;
}

/** Блок «что обычно делают дальше» после документа. */
export default function DealNextSteps({
  title = "Что дальше",
  steps,
}: {
  title?: string;
  steps: NextStepLink[];
}) {
  if (!steps.length) return null;

  return (
    <section className="rounded-xl border border-blue-100 bg-blue-50 p-5">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">
        Типичная цепочка: КП → договор → счёт → акт. Данные можно перенести кнопками ниже.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {steps.map((step) => (
          <Link
            key={step.href + step.label}
            href={step.href}
            className="rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm hover:border-blue-400"
          >
            <span className="font-semibold text-blue-700">{step.label}</span>
            <span className="mt-0.5 block text-xs text-slate-500">{step.hint}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
