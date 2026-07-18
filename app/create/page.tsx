import type { Metadata } from "next";
import CreatePageClient from "@/components/CreatePageClient";

export const metadata: Metadata = {
  title: "Создать счёт или акт для ИП онлайн — скачать PDF",
  description:
    "Бесплатный генератор счёта на оплату и акта выполненных работ для ИП. Заполните реквизиты и скачайте PDF без регистрации.",
  keywords: "создать счёт ИП, акт выполненных работ онлайн, скачать счёт PDF",
  alternates: { canonical: "https://biznes-ip.ru/create/" },
};

export default function CreatePage() {
  return <CreatePageClient />;
}
