# Деплой на Timeweb через Git (автоматически)

Сайт: **https://biznes-ip.ru**  
Репозиторий: **https://github.com/thesuperfatal/schet-ip**

После настройки: каждый `git push` → сайт обновляется сам (~2–3 мин).

---

## Шаг 1. Узнай FTP-данные в Timeweb

1. Панель Timeweb → **Файловый менеджер**
2. Кнопка **«Подключение»** (справа вверху)  
   или: **Аккаунт** → **Пользователи FTP**
3. Запиши:

| Параметр | Пример | Где взять |
|----------|--------|-----------|
| **Сервер (хост)** | `vipXXX.timeweb.ru` или `cn825431.tw1.ru` | Подключение / FTP |
| **Логин** | `cn825431` или похожий | Подключение / FTP |
| **Пароль** | твой FTP-пароль | Подключение / FTP |
| **Папка сайта** | `/biznes-ip.ru/public_html/` | Файловый менеджер → biznes-ip.ru → public_html |

Если FTP-пароля нет — создай пользователя FTP в панели Timeweb.

---

## Шаг 2. Добавь секреты в GitHub

1. Открой: https://github.com/thesuperfatal/schet-ip/settings/secrets/actions
2. **New repository secret** — добавь **3 секрета**:

| Имя секрета | Значение |
|-------------|----------|
| `FTP_SERVER` | хост FTP (без `ftp://`) |
| `FTP_USERNAME` | логин FTP |
| `FTP_PASSWORD` | пароль FTP |

Опционально (если сайт не в корневом public_html):

| Имя | Значение |
|-----|----------|
| `FTP_SERVER_DIR` | `/biznes-ip.ru/public_html/` (если сайт не в корневом public_html) |

---

## Шаг 3. Запусти деплой

### Автоматически
Любой push в ветку `main`:

```powershell
cd "C:\Мое\сайты\проект\schet-ip"
git add .
git commit -m "описание изменения"
git push
```

### Вручную
1. https://github.com/thesuperfatal/schet-ip/actions
2. **Deploy to Timeweb** → **Run workflow**

---

## Шаг 4. Проверь

1. **Actions** → зелёная галочка **Deploy to Timeweb**
2. Открой https://biznes-ip.ru
3. **Ctrl + F5**

---

## Как обновлять сайт дальше

```
Правки в коде → git push → через 2–3 мин сайт обновлён
```

Руками в файловый менеджер заливать **не нужно**.

---

## Если деплой упал (красный)

1. **Actions** → failed → открой лог
2. Частые причины:
   - неверный `FTP_SERVER` / логин / пароль
   - неверная папка `FTP_SERVER_DIR`
3. Проверь секреты в GitHub Settings → Secrets

---

## Два деплоя (не мешают друг другу)

| Workflow | Куда |
|----------|------|
| Deploy to Timeweb | **biznes-ip.ru** (основной) |
| Deploy to GitHub Pages | github.io (запасной) |

Основной сайт для клиентов — **biznes-ip.ru** на Timeweb.

---

## Почтовый ящик моста 1С (`/_cbridge/`) — не публичная страница

Отдельный job **deploy-bridge-mailbox** заливает PHP в `public_html/_cbridge/`.  
Это не Next.js и не GitHub Pages: 1С не может сделать HTTP PUT на статику Pages.

- Счета/акты не затрагиваются (`dangerous-clean-slate: false`, другая папка).
- В меню и sitemap папки нет. В `robots.txt` — `Disallow: /_cbridge/`.
- После первого деплоя **один раз** создай на сервере `.env` из `.env.example` (ключ не коммитить).
- Как пользоваться: `hosting/bridge-mailbox/README.md` и в репозитории интеграции `мост-1с-cursor/07-обмен-через-сайт.md`.
