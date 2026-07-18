import { mkdirSync, writeFileSync } from "node:fs";

const redirectHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>СчётИП — перенаправление</title>
  <script>
    window.location.replace("/create.html" + window.location.search + window.location.hash);
  </script>
  <meta http-equiv="refresh" content="0;url=/create.html">
</head>
<body>
  <p><a href="/create.html">Перейти к созданию документа</a></p>
</body>
</html>
`;

mkdirSync("out/create", { recursive: true });
writeFileSync("out/create/index.html", redirectHtml, "utf8");
