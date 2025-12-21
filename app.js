// --- Cities data ---
const CITIES = {
  paris: {
    name: "Paris 🇫🇷",
    tagline: "Romantik, caféer og en lille smule 'main character energy'.",
    bullets: [
      "Perfekt til gåture, vin og små hyggelige steder",
      "Kæmpe bonus hvis du elsker croissanter og udsigt",
      "romantik  ❤️"
    ],
    image: "assets/byer/paris.jpg"
  },
  rome: {
    name: "Rom 🇮🇹",
    tagline: "Historie, pasta og 'vi bliver lige her for evigt'.",
    bullets: [
      "Mad, mad, mad (og lidt mere mad)",
      "Smuk arkitektur og hyggelige aftenture",
      "Ideel hvis du kan lide varme vibes"
    ],
    image: "assets/byer/rome.jpg"
  },
  barcelona: {
    name: "Barcelona 🇪🇸",
    tagline: "Sol, liv og 'bare én sang mere'.",
    bullets: [
      "Strand + storby på én gang wuhhuuuuu 🏖️",
      "og sangiraaaaaa 🍷",
      "Tapas-date? Ja taaaaaak mand."
    ],
    image: "assets/byer/barcelona.jpg"
  },
  london: {
    name: "London 🇬🇧",
    tagline: "Shopping, kultur og god stemning",
    bullets: [
      "Museer, musicals og store oplevelser",
      "London klasse by jo",
      "Ideel til 'vi skal lige i én butik mere'"
    ],
    image: "assets/byer/london.jpg"
  },
  amsterdam: {
    name: "Amsterdam 🇳🇱",
    tagline: "Hyggelig, smuk og lidt 'vi tager den bare på feeling'.",
    bullets: [
      "Kanaler, caféer og vibe på max hygge",
      "Nem at opleve til fods/cykel",
      "Perfekt til afslappet storbytur"
    ],
    image: "assets/byer/amsterdam.jpg"
  },
  prague: {
    name: "Prag 🇨🇿",
    tagline: "Eventyrby + julemarkeder = kæmpe ja.",
    bullets: [
      "Sindssyg flot arkitektur og hygge",
      "God hvis du elsker 'magisk stemning'"
    ],
    image: "assets/byer/prague.jpg"
  },
  berlin: {
    name: "Berlin 🇩🇪",
    tagline: "Cool storby, god mad.",
    bullets: [
      "Streetfood, kultur og masser at lave",
      "Livlig by med masser af energi",
      "Perfekt hvis du vil have både chill og oplevelser"
    ],
    image: "assets/byer/berlin.jpg"
  }
};

// --- Quiz questions ---
// Hver option giver "points" til 1-2 byer. (Let at tweake)
const QUESTIONS = [
  {
    title: "1) Hvis vi rejser i 3-4 dage, hvad skal det mest føles som?",
    answers: [
      { text: "Romantisk og lidt film-agtigt ❤️", points: { paris: 3, rome: 2 } },
      { text: "Masser af liv, energi og måske en lille sangria 🎉", points: { barcelona: 3, berlin: 2 } },
      { text: "Hyggeligt, smukt og roligt 😌", points: { amsterdam: 3, prague: 2 } },
      { text: "Storby-klassiker med alt (shopping + kultur) 🛍️", points: { london: 3, paris: 1 } }
    ]
  },
  {
    title: "2) Hvad glæder du dig mest til på turen?",
    answers: [
      { text: "Mad og gode steder 🍝", points: { rome: 3, barcelona: 2 } },
      { text: "Oplevelser og seværdigheder 🏛️", points: { paris: 2, prague: 3 } },
      { text: "Shopping og storby-liv 🛍️", points: { london: 3, berlin: 2 } },
      { text: "Bare hygge sammen med din lille pussetrold hihihi 🥰", points: { barcelona: 3, paris: 1 } }
    ]
  },
  {
    title: "3) Hvilken tempo skal ferien være i?",
    answers: [
      { text: "Roligt: 1-2 store ting om dagen, resten café 😌", points: { amsterdam: 2, paris: 1 } },
      { text: "Planlagt: vi skal nå en masse ✔️", points: { london: 2, prague: 1, rome: 1 } },
      { text: "Spontant: vi ser hvad der sker 😄", points: { barcelona: 3, london: 2 } },
      { text: "Lidt af det hele – fleksibel 🧭", points: { paris: 2, london: 1, barcelona: 1 } }
    ]
  },
  {
    title: "4) Hvad betyder vejret og omgivelserne for dig?",
    answers: [
      { text: "Sol, strand og varmt vejr er vigtigt ☀️🏖️", points: { barcelona: 3, rome: 2 } },
      { text: "Hyggelige gader og pænt vejr, strand er bonus 🌤️", points: { amsterdam: 2, paris: 2, prague: 1 } },
      { text: "Storby-oplevelser er vigtigst, vejret er sekundært 🏙️", points: { london: 3, berlin: 2 } },
      { text: "Varmt og godt til at gå rundt i byen ☀️🚶‍♀️", points: { rome: 2, barcelona: 3, paris: 1 } }
    ]
  },
  {
    title: "5) Hvor fancy må det gerne være?",
    answers: [
      { text: "Lidt luksus: gode restauranter og fine oplevelser ✨", points: { paris: 3, london: 2, rome: 1 } },
      { text: "Afslappet: streetfood og autentiske steder 🍕", points: { berlin: 3, barcelona: 2, rome: 1 } },
      { text: "Godt værdi for pengene og masser af oplevelser 💰", points: { prague: 2, berlin: 2, barcelona: 3 } },
      { text: "Balance: nogle forkælelsesoplevelser + chill vibes 🎯", points: { amsterdam: 2, barcelona: 3, paris: 1 } }
    ]
  }
];

// --- State ---
let currentIndex = 0;
let selected = Array(QUESTIONS.length).fill(null); // store chosen answer index per question
let scores = initScores();

// --- DOM ---
const startCard = document.getElementById("startCard");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");

const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const qCounter = document.getElementById("qCounter");
const questionTitle = document.getElementById("questionTitle");
const answersEl = document.getElementById("answers");
const progressBar = document.getElementById("progressBar");

const cityName = document.getElementById("cityName");
const cityTagline = document.getElementById("cityTagline");
const cityBullets = document.getElementById("cityBullets");
const cityImg = document.getElementById("cityImg");
const imgFallback = document.getElementById("imgFallback");

const restartBtn = document.getElementById("restartBtn");
const copyBtn = document.getElementById("copyBtn");
const copyToast = document.getElementById("copyToast");

// --- Helpers ---
function initScores(){
  const base = {};
  for (const key of Object.keys(CITIES)) base[key] = 0;
  return base;
}

function applyPoints(pointsObj, multiplier = 1){
  for (const [city, pts] of Object.entries(pointsObj)){
    scores[city] = (scores[city] ?? 0) + pts * multiplier;
  }
}

function recomputeScores(){
  scores = initScores();
  for (let i = 0; i < selected.length; i++){
    const ansIndex = selected[i];
    if (ansIndex === null) continue;
    applyPoints(QUESTIONS[i].answers[ansIndex].points, 1);
  }
}

function renderQuestion(){
  const q = QUESTIONS[currentIndex];
  qCounter.textContent = `Spørgsmål ${currentIndex + 1}/${QUESTIONS.length}`;
  questionTitle.textContent = q.title;

  // progress
  const pct = (currentIndex / QUESTIONS.length) * 100;
  progressBar.style.width = `${pct}%`;

  // answers
  answersEl.innerHTML = "";
  q.answers.forEach((a, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer" + (selected[currentIndex] === idx ? " selected" : "");
    btn.type = "button";
    btn.textContent = a.text;
    btn.addEventListener("click", () => {
      selected[currentIndex] = idx;
      recomputeScores();
      // update selection UI
      [...answersEl.children].forEach(el => el.classList.remove("selected"));
      btn.classList.add("selected");
      nextBtn.disabled = false;
    });
    answersEl.appendChild(btn);
  });

  backBtn.disabled = currentIndex === 0;
  nextBtn.disabled = selected[currentIndex] === null;
  nextBtn.textContent = (currentIndex === QUESTIONS.length - 1) ? "Se hvor vi skal heeen 🎁" : "Næste";
}

function computeWinner(){
  // find max score, tie-breaker via deterministic priority list
  const priority = ["paris","rome","barcelona","london","amsterdam","prague","berlin"];
  let bestCity = priority[0];
  let bestScore = -Infinity;

  for (const city of Object.keys(scores)){
    const sc = scores[city];
    if (sc > bestScore){
      bestScore = sc;
      bestCity = city;
    } else if (sc === bestScore){
      // tie-breaker: earlier in priority list wins
      if (priority.indexOf(city) < priority.indexOf(bestCity)){
        bestCity = city;
      }
    }
  }
  return { cityKey: bestCity, score: bestScore };
}

function showResult(){
  const { cityKey } = computeWinner();
  const c = CITIES[cityKey];

  cityName.textContent = c.name;
  cityTagline.textContent = c.tagline;
  cityBullets.innerHTML = "";
  c.bullets.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    cityBullets.appendChild(li);
  });

  // city image (optional)
  cityImg.style.display = "none";
  imgFallback.style.display = "grid";
  cityImg.src = c.image;

  cityImg.onload = () => {
    imgFallback.style.display = "none";
    cityImg.style.display = "block";
  };
  cityImg.onerror = () => {
    // keep fallback
    imgFallback.textContent = "📍";
  };

  startCard.classList.add("hidden");
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");

  progressBar.style.width = "100%";
}

function resetQuiz(){
  currentIndex = 0;
  selected = Array(QUESTIONS.length).fill(null);
  scores = initScores();

  resultCard.classList.add("hidden");
  quizCard.classList.add("hidden");
  startCard.classList.remove("hidden");

  progressBar.style.width = "0%";
}

// --- Events ---
startBtn.addEventListener("click", () => {
  startCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  renderQuestion();
});

backBtn.addEventListener("click", () => {
  if (currentIndex === 0) return;
  currentIndex--;
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  if (selected[currentIndex] === null) return;

  if (currentIndex === QUESTIONS.length - 1){
    showResult();
    return;
  }
  currentIndex++;
  renderQuestion();
});

restartBtn.addEventListener("click", () => {
  resetQuiz();
});

copyBtn.addEventListener("click", async () => {
  const { cityKey } = computeWinner();
  const c = CITIES[cityKey];
  const text =
`🎄 Julequiz resultat:
Vi skal til, uhhhh drumsolo: ${c.name}
Tilskud: 1.000 kr fra mig❤️`;

  try{
    await navigator.clipboard.writeText(text);
    copyToast.classList.remove("hidden");
    setTimeout(() => copyToast.classList.add("hidden"), 1200);
  }catch{
    alert("Kunne ikke kopiere automatisk på denne enhed. Her er teksten:\n\n" + text);
  }
});
