const PEOPLE = ["Jasiek", "Ola", "Iwonka", "Szymon", "Marcysia", "Piotr", "Przemek"];
const a = [...PEOPLE];
for (let i = a.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i); // Sattolo: j < i → jeden cykl, brak punktów stałych
  [a[i], a[j]] = [a[j], a[i]];
}
const encode = (s) => Buffer.from([...s].reverse().join("")).toString("base64");
const draw = Object.fromEntries(PEOPLE.map((p, i) => [p, encode(a[i])]));
console.log("const DRAW = " + JSON.stringify(draw, null, 2) + ";");

const targets = a;
const ok =
  new Set(targets).size === PEOPLE.length &&
  PEOPLE.every((p) => targets.includes(p)) &&
  PEOPLE.every((p, i) => targets[i] !== p);
console.error(ok ? "✅ OK: każdy daje i dostaje dokładnie jeden prezent" : "❌ BŁĄD");