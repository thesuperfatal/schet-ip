# Почтовый ящик моста (`/_cbridge/`)

Это **не страница СчётИП**. Папка не в меню, не в sitemap. Сюда 1С и Cursor кладут `debug/*.json`.

## Куда заливать на Timeweb

`public_html/_cbridge/` (рядом с уже существующими `memory/`, `sad/`).

GitHub Actions (job `deploy-bridge-mailbox`) копирует PHP при push в `main`.  
**`.env` и файлы в `data/` деплой не затирает.**

GitHub Pages эту папку **не получает** и PHP там **не выполнит**. Ящик живёт только на Timeweb.

## Один раз на сервере

1. После деплоя открой FTP / файловый менеджер Timeweb → `public_html/_cbridge/`.
2. Скопируй `.env.example` → `.env`, впиши длинный `BRIDGE_KEY`.
3. Проверка (подставь ключ, не коммить его):

```powershell
Invoke-RestMethod -Uri "https://biznes-ip.ru/_cbridge/?action=ping" -Headers @{ "X-Bridge-Key" = "ТВОЙ_КЛЮЧ" }
```

Без ключа должна быть страница 404, не список файлов.

Публичные счета/акты не трогаются: деплой пишет в другую папку, `dangerous-clean-slate: false`.
