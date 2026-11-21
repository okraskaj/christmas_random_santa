const PEOPLE = ["Jasiek", "Ola", "Iwonka", "Szymon", "Marcysia", "Piotr", "Przemek"];
const FORBIDDEN = [
  ["Jasiek", "Marcysia"],
  ["Ola", "Przemek"],
];

function shuffle() {
  const a = [...PEOPLE];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i); // Sattolo: j < i → jeden cykl, brak punktów stałych
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const isForbidden = (giver, target) =>
  FORBIDDEN.some(([x, y]) => (giver === x && target === y) || (giver === y && target === x));

let a;
let attempts = 0;
do {
  a = shuffle();
  attempts++;
} while (PEOPLE.some((p, i) => isForbidden(p, a[i])));

const encode = (s) => Buffer.from([...s].reverse().join("")).toString("base64");
const draw = Object.fromEntries(PEOPLE.map((p, i) => [p, encode(a[i])]));
console.log("const DRAW = " + JSON.stringify(draw, null, 2) + ";");

const targets = a;
const ok =
  new Set(targets).size === PEOPLE.length &&
  PEOPLE.every((p) => targets.includes(p)) &&
  PEOPLE.every((p, i) => targets[i] !== p) &&
  PEOPLE.every((p, i) => !isForbidden(p, targets[i]));
console.error(ok ? "✅ OK: każdy daje i dostaje dokładnie jeden prezent, bez zakazanych par" : "❌ BŁĄD");
console.error(`Liczba losowań: ${attempts}`);
