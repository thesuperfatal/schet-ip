import { Suspense } from "react";
import CreatePageClient from "@/components/CreatePageClient";

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-600">Загрузка...</div>}>
      <CreatePageClient />
    </Suspense>
  );
}
