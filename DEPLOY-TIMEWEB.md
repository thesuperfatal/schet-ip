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
| **Папка сайта** | `/public_html/` | куда заливал `index.html` |

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
| `FTP_SERVER_DIR` | например `/public_html/` |

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
