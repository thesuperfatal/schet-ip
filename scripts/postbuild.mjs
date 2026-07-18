import { copyFileSync, existsSync } from "node:fs";

// Старые закладки /create.html → рабочая страница /create/
if (existsSync("out/create/index.html")) {
  copyFileSync("out/create/index.html", "out/create.html");
}
