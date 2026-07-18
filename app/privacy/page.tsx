import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — СчётИП",
  description: "Политика конфиденциальности сайта biznes-ip.ru (СчётИП).",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 prose-slate">
      <h1 className="text-3xl font-bold text-slate-900">Политика конфиденциальности</h1>
      <p className="mt-4 text-slate-600">Дата публикации: 19 июля 2026 г.</p>

      <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">1. Общие положения</h2>
          <p className="mt-2">
            Настоящая Политика описывает, как сайт{" "}
            <strong>biznes-ip.ru</strong> (сервис «СчётИП») обрабатывает данные пользователей.
            Используя сайт, вы соглашаетесь с условиями этой Политики.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">2. Какие данные обрабатываются</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              Данные, которые вы вводите в формы (реквизиты, суммы) — обрабатываются{" "}
              <strong>в вашем браузере</strong> и могут сохраняться в localStorage устройства.
            </li>
            <li>
              Технические данные посещения (IP, cookies, действия на сайте) — через Яндекс.Метрику
              и аналогичные сервисы аналитики.
            </li>
            <li>Мы не требуем регистрации и не храним ваши документы на своих серверах.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">3. Цели обработки</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Работа инструментов сайта (счета, акты, калькуляторы).</li>
            <li>Улучшение сервиса и анализ посещаемости.</li>
            <li>Показ рекламы партнёрских сетей (при подключении РСЯ).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">4. Передача третьим лицам</h2>
          <p className="mt-2">
            Данные аналитики могут обрабатываться ООО «ЯНДЕКС» (Яндекс.Метрика) в соответствии с их
            политикой. Рекламные сети — при размещении рекламы на сайте.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">5. Cookies</h2>
          <p className="mt-2">
            Сайт может использовать cookies для аналитики (Яндекс.Метрика) и, при подключении
            рекламы, для показа объявлений РСЯ. Вы можете ограничить cookies в настройках браузера.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">6. Реклама</h2>
          <p className="mt-2">
            Для поддержки бесплатного сервиса на сайте может размещаться реклама Рекламной сети
            Яндекса и других партнёров. Рекламные сети могут устанавливать собственные cookies и
            обрабатывать технические данные согласно своим политикам.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">7. Контакты</h2>
          <p className="mt-2">
            По вопросам конфиденциальности:{" "}
            <a href="mailto:Tismojesh@yandex.ru" className="text-blue-600 hover:underline">
              Tismojesh@yandex.ru
            </a>{" "}
            или{" "}
            <Link href="/contacts/" className="text-blue-600 hover:underline">
              страница контактов
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
