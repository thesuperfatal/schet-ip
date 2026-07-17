# Публикация на Cloudflare Pages (бесплатно, работает в РФ)

Проект: `C:\Мое\сайты\проект\schet-ip`  
GitHub: https://github.com/thesuperfatal/schet-ip

---

## Часть 1. Залить обновление на GitHub (один раз)

После настройки статической сборки выполни:

```powershell
cd "C:\Мое\сайты\проект\schet-ip"
git add .
git commit -m "Настройка для Cloudflare Pages"
git push
```

---

## Часть 2. Cloudflare — регистрация

1. Открой https://dash.cloudflare.com/sign-up
2. Зарегистрируйся (email + пароль)
3. Подтверди почту

---

## Часть 3. Подключить GitHub

1. В панели Cloudflare: **Workers & Pages** (слева)
2. **Create** → вкладка **Pages**
3. **Connect to Git**
4. **Connect GitHub** → разреши доступ Cloudflare
5. Выбери репозиторий **`thesuperfatal/schet-ip`**
6. **Begin setup**

---

## Часть 4. Настройки сборки (важно!)

На экране **Set up builds and deployments** укажи **точно так**:

| Поле | Значение |
|------|----------|
| Project name | `schet-ip` (или любое) |
| Production branch | `main` |
| Framework preset | `Next.js` или `None` |
| Build command | `npm run build` |
| Build output directory | `out` |

7. **Save and Deploy**

Жди 2–5 минут. Статус станет **Success**.

---

## Часть 5. Адрес сайта

После деплоя Cloudflare даст ссылку:

```
https://schet-ip.pages.dev
```

(имя может чуть отличаться — смотри в панели **Visit site**)

Проверь **без VPN**:
- главная открывается
- «Создать счёт» → форма → «Скачать PDF»

---

## Часть 6. Обновления сайта

Каждый раз после правок в коде:

```powershell
cd "C:\Мое\сайты\проект\schet-ip"
git add .
git commit -m "описание изменения"
git push
```

Cloudflare **сам** пересоберёт сайт за 2–3 минуты.

---

## Свой домен позже (необязательно)

1. Купи домен на reg.ru / nic.ru (например `schet-ip.ru`)
2. Cloudflare → проект **schet-ip** → **Custom domains**
3. **Set up a custom domain** → введи домен
4. Пропиши DNS у регистратора, как покажет Cloudflare

---

## Если сборка упала (ошибка)

1. Cloudflare → проект → **Deployments** → кликни на failed → **Build log**
2. Скопируй текст ошибки и пришли — разберём

Частые причины:
- **Build output directory** не `out` — исправь в Settings → Builds
- Node version — в Settings → Environment variables добавь `NODE_VERSION` = `20`

---

## Чеклист

- [ ] `git push` с новой конфигурацией
- [ ] Аккаунт Cloudflare создан
- [ ] Репозиторий `schet-ip` подключён
- [ ] Build output directory = **`out`**
- [ ] Deploy Success
- [ ] Сайт открывается без VPN
