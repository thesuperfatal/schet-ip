const ones = [
  "",
  "один",
  "два",
  "три",
  "четыре",
  "пять",
  "шесть",
  "семь",
  "восемь",
  "девять",
];
const teens = [
  "десять",
  "одиннадцать",
  "двенадцать",
  "тринадцать",
  "четырнадцать",
  "пятнадцать",
  "шестнадцать",
  "семнадцать",
  "восемнадцать",
  "девятнадцать",
];
const tens = [
  "",
  "",
  "двадцать",
  "тридцать",
  "сорок",
  "пятьдесят",
  "шестьдесят",
  "семьдесят",
  "восемьдесят",
  "девяносто",
];
const hundreds = [
  "",
  "сто",
  "двести",
  "триста",
  "четыреста",
  "пятьсот",
  "шестьсот",
  "семьсот",
  "восемьсот",
  "девятьсот",
];

function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function tripletToWords(n: number, feminine: boolean): string {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  const parts: string[] = [];

  if (h > 0) parts.push(hundreds[h]);

  if (t === 1) {
    parts.push(teens[o]);
  } else {
    if (t > 0) parts.push(tens[t]);
    if (o > 0) {
      if (feminine && o === 1) parts.push("одна");
      else if (feminine && o === 2) parts.push("две");
      else parts.push(ones[o]);
    }
  }

  return parts.join(" ");
}

function numberToWords(n: number, feminine = false): string {
  if (n === 0) return feminine ? "ноль" : "ноль";

  const millions = Math.floor(n / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];

  if (millions > 0) {
    parts.push(tripletToWords(millions, false));
    parts.push(plural(millions, "миллион", "миллиона", "миллионов"));
  }

  if (thousands > 0) {
    parts.push(tripletToWords(thousands, true));
    parts.push(plural(thousands, "тысяча", "тысячи", "тысяч"));
  }

  if (rest > 0 || parts.length === 0) {
    parts.push(tripletToWords(rest, feminine));
  }

  return parts.filter(Boolean).join(" ");
}

export function amountToWords(amount: number): string {
  const rub = Math.floor(amount);
  const kop = Math.round((amount - rub) * 100);

  const rubWords = numberToWords(rub, false);
  const rubLabel = plural(rub, "рубль", "рубля", "рублей");
  const kopStr = String(kop).padStart(2, "0");

  return `${rubWords} ${rubLabel} ${kopStr} коп.`;
}

export function formatMoney(amount: number): string {
  return amount.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
