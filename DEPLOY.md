# Как опубликовать СчётИП бесплатно (Git + Vercel)

Проект: генератор счетов и актов для ИП.
Папка: `C:\Мое\сайты\проект\schet-ip`

---

## Шаг 1. Проверить локально

```powershell
cd "C:\Мое\сайты\проект\schet-ip"
npm run dev
```

Открой в браузере: http://localhost:3000

Проверь:
- главная страница открывается
- «Создать счёт» → форма → «Скачать PDF»

Остановить сервер: `Ctrl + C`

---

## Шаг 2. Собрать проект (проверка перед публикацией)

```powershell
npm run build
```

Если ошибок нет — можно публиковать.

---

## Шаг 3. Создать аккаунт на GitHub

1. Зайди на https://github.com
2. Зарегистрируйся (бесплатно)
3. Нажми **+** → **New repository**
4. Имя: `schet-ip`
5. Public
6. **Не** ставь галочки README / .gitignore (у нас уже есть)
7. **Create repository**

---

## Шаг 4. Залить код на GitHub

В PowerShell:

```powershell
cd "C:\Мое\сайты\проект\schet-ip"

git add .
git commit -m "Генератор счетов и актов для ИП"

git branch -M main
git remote add origin https://github.com/ТВОЙ_ЛОГИН/schet-ip.git
git push -u origin main
```

Замени `ТВОЙ_ЛОГИН` на свой логин GitHub.

При первом push GitHub попросит войти — следуй подсказкам.

---

## Шаг 5. Опубликовать на Vercel (бесплатный хостинг)

1. Зайди на https://vercel.com
2. **Sign Up** → войди через GitHub
3. **Add New…** → **Project**
4. Выбери репозиторий `schet-ip`
5. Настройки оставь как есть:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output: автоматически
6. **Deploy**

Через 1–2 минуты получишь адрес:
```
https://schet-ip-xxxx.vercel.app
```

Это твой **бесплатный сайт в интернете**.

---

## Шаг 6. Обновлять сайт после изменений

Каждый раз когда меняешь код:

```powershell
cd "C:\Мое\сайты\проект\schet-ip"
git add .
git commit -m "Описание изменений"
git push
```

Vercel **сам** пересоберёт сайт за ~1 минуту.

---

## Бесплатный домен — что реально

| Вариант | Цена | Адрес |
|---------|------|-------|
| Vercel поддомен | 0 ₽ | `schet-ip.vercel.app` |
| Свой .ru домен | ~200–500 ₽/год | `schet-ip.ru` |

Полностью бесплатный свой домен (.com/.ru) — по сути нет.
На старте хватит `*.vercel.app`.

### Подключить свой домен позже (в Vercel)

1. Купи домен на reg.ru / nic.ru
2. Vercel → Project → Settings → Domains
3. Добавь домен, пропиши DNS как покажет Vercel

---

## Альтернатива: Cloudflare Pages

Если Vercel не подойдёт:

1. https://dash.cloudflare.com → Workers & Pages → Create
2. Connect to Git → репозиторий `schet-ip`
3. Build command: `npm run build`
4. Output directory: `.next` — **нет**, для Next.js на CF нужен `@cloudflare/next-on-pages` или статический экспорт

**Для Next.js проще Vercel** — он сделан под Next.js.

---

## Чеклист

- [ ] `npm run dev` — работает локально
- [ ] `npm run build` — сборка без ошибок
- [ ] Репозиторий на GitHub создан
- [ ] `git push` выполнен
- [ ] Vercel подключён к репозиторию
- [ ] Сайт открывается по ссылке vercel.app

---

## Дальше (когда будет трафик)

1. Купить домен `schet-ip.ru`
2. Подключить Яндекс.Метрику
3. Добавить страницы под SEO: «счёт на оплату ИП онлайн»
4. Подключить оплату (ЮKassa) — снять лимит 3 документа
