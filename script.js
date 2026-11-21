const PEOPLE = ["Jasiek", "Ola", "Iwonka", "Szymon", "Marcysia", "Piotr", "Przemek"];
// ← tutaj wklej wynik z `node generate.js`
const DRAW = {
  "Jasiek": "YWtub3dJ",
  "Ola": "a2Vpc2FK",
  "Iwonka": "a2VtZXpyUA==",
  "Szymon": "cnRvaVA=",
  "Marcysia": "YWxP",
  "Piotr": "YWlzeWNyYU0=",
  "Przemek": "bm9teXpT"
};

const STORAGE_KEY = "santa_who";
const decode = (s) => [...atob(s)].reverse().join("");
const $ = (id) => document.getElementById(id);
function showWho() {
  $("gift-screen").classList.add("hidden");
  $("who").classList.remove("hidden");
  const box = $("buttons");
  box.innerHTML = "";
  PEOPLE.forEach((p) => {
    const b = document.createElement("button");
    b.textContent = p;
    b.onclick = () => { localStorage.setItem(STORAGE_KEY, p); showGift(p, true); };
    box.appendChild(b);
  });
}
function showGift(person, canReset) {
    $("who").classList.add("hidden");
    $("gift-screen").classList.remove("hidden");
    $("hello").textContent = `Cześć, ${person}! 🎄`;
    $("result").classList.add("hidden");
    $("hint").classList.remove("hidden");
    $("reset").classList.toggle("hidden", !canReset);
    const gift = $("gift");
    gift.classList.remove("open", "hidden");
    gift.onclick = () => {
      if (gift.classList.contains("open")) return;
      gift.classList.add("open");
      $("hint").classList.add("hidden");
      $("reset").remove();
      setTimeout(() => {
        gift.classList.add("hidden");
        $("target").textContent = decode(DRAW[person]);
        $("result").classList.remove("hidden");
      }, 500);
    };
}

$("reset").onclick = () => { localStorage.removeItem(STORAGE_KEY); showWho(); };
const saved = localStorage.getItem(STORAGE_KEY);
if (saved && PEOPLE.includes(saved)) showGift(saved, false);
else showWho();