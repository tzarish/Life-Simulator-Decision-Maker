let currentAge = 0;
let currentPhase = "birth";
let playerCountry = null;
let awaitingChoice = false;

const scenariosByPhase = {
  childhood: [
    {
      prompt: "A kid at school keeps picking on you. What do you do?",
      choices: [
        { text: "Stand up to them", outcome: "You stood your ground. The bullying stopped and you gained confidence." },
        { text: "Tell a teacher", outcome: "The teacher intervened. Things calmed down but some kids called you a snitch." },
      ],
    },
    {
      prompt: "You find $20 on the playground. What do you do?",
      choices: [
        { text: "Keep it", outcome: "You bought candy and toys. It felt great in the moment." },
        { text: "Hand it in", outcome: "The teacher praised you. You felt proud of yourself." },
      ],
    },
    {
      prompt: "Your parents sign you up for an after-school activity.",
      choices: [
        { text: "Join the sports team", outcome: "You made lots of friends and got really fit." },
        { text: "Join the art club", outcome: "You discovered a love for creativity that stuck with you." },
      ],
    },
    {
      prompt: "A new kid joins your class and sits alone at lunch.",
      choices: [
        { text: "Invite them to sit with you", outcome: "You became best friends and stayed close for years." },
        { text: "Leave them alone", outcome: "They eventually found other friends, but you always wondered what could have been." },
      ],
    },
  ],

  adolescence: [
    {
      prompt: "Your friends dare you to skip school for the day.",
      choices: [
        { text: "Skip school", outcome: "You had a fun day but got caught and had detention for a week." },
        { text: "Refuse and go to class", outcome: "You aced a surprise quiz that day. Your grades improved." },
      ],
    },
    {
      prompt: "You develop a crush on someone. What do you do?",
      choices: [
        { text: "Tell them how you feel", outcome: "They felt the same way. Your first relationship begins." },
        { text: "Keep it to yourself", outcome: "You never told them. They started dating someone else." },
      ],
    },
    {
      prompt: "A friend offers you something at a party that you're unsure about.",
      choices: [
        { text: "Decline and leave the party", outcome: "You avoided a bad situation. Your parents never found out." },
        { text: "Give in to the pressure", outcome: "You regretted it the next morning. It was a hard lesson to learn." },
      ],
    },
    {
      prompt: "You have to choose between studying for exams or going to a big party.",
      choices: [
        { text: "Study hard", outcome: "You passed with flying colours and got into your first choice school." },
        { text: "Go to the party", outcome: "You had a great night but barely scraped through your exams." },
      ],
    },
  ],

  youngAdulthood: [
    {
      prompt: "You get two job offers at the same time.",
      choices: [
        { text: "Take the high paying corporate job", outcome: "You earned well but worked long stressful hours." },
        { text: "Take the lower paid job you're passionate about", outcome: "You earned less but loved what you did every day." },
      ],
    },
    {
      prompt: "Your partner wants to move to another city for their dream job.",
      choices: [
        { text: "Move with them", outcome: "It was tough at first but you both built a great life there." },
        { text: "Stay behind", outcome: "The long distance was hard. You eventually grew apart." },
      ],
    },
    {
      prompt: "You have enough savings to invest.",
      choices: [
        { text: "Invest in stocks", outcome: "The market did well. Your savings grew significantly." },
        { text: "Start your own small business", outcome: "It was risky but it paid off. You became your own boss." },
      ],
    },
    {
      prompt: "A close friend asks to borrow a large sum of money.",
      choices: [
        { text: "Lend them the money", outcome: "They paid you back eventually, but it strained the friendship for a while." },
        { text: "Decline politely", outcome: "They were upset at first but understood. The friendship survived." },
      ],
    },
  ],

  oldAdulthood: [
    {
      prompt: "You're offered early retirement.",
      choices: [
        { text: "Retire early", outcome: "You spent your golden years travelling and relaxing. No regrets." },
        { text: "Keep working", outcome: "You stayed sharp and mentored younger colleagues. It gave you purpose." },
      ],
    },
    {
      prompt: "Your adult child asks you to move in with them.",
      choices: [
        { text: "Move in with them", outcome: "You grew closer as a family and helped raise your grandchildren." },
        { text: "Stay independent", outcome: "You valued your independence and kept active in your community." },
      ],
    },
    {
      prompt: "You're diagnosed with a minor health issue. What do you do?",
      choices: [
        { text: "Follow the doctor's advice strictly", outcome: "You managed it well and stayed healthy into old age." },
        { text: "Ignore it and hope for the best", outcome: "It got worse over time and required more serious treatment." },
      ],
    },
    {
      prompt: "You have a chance to reconnect with an old friend you lost touch with.",
      choices: [
        { text: "Reach out to them", outcome: "You rekindled the friendship and it brought you great joy in your later years." },
        { text: "Leave the past in the past", outcome: "You sometimes wondered how they were doing." },
      ],
    },
  ],
};

function getPhaseKey(age) {
  if (age <= 12) return "childhood";
  if (age <= 20) return "adolescence";
  if (age <= 40) return "youngAdulthood";
  return "oldAdulthood";
}

function getPhaseName(age) {
  if (age <= 12) return "Childhood";
  if (age <= 20) return "Adolescence";
  if (age <= 40) return "Young Adulthood";
  return "Old Adulthood";
}

function getRandomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomScenarios(pool, count = 2) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}

function addEntry(text, isHeader = false) {
  const log = document.getElementById("life-log");
  const entry = document.createElement("p");
  entry.textContent = text;
  if (isHeader) entry.style.fontWeight = "bold";
  log.insertBefore(entry, log.firstChild);
}

function showChoices(scenario, onComplete) {
  const log = document.getElementById("life-log");
  const button = document.querySelector(".birth-button");
  button.disabled = true;
  awaitingChoice = true;

  const promptEl = document.createElement("p");
  promptEl.textContent = scenario.prompt;
  promptEl.style.fontStyle = "italic";
  log.insertBefore(promptEl, log.firstChild);

  const choiceContainer = document.createElement("div");

  scenario.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.style.marginRight = "10px";

    btn.addEventListener("click", () => {

      addEntry(`➤ You chose: "${choice.text}"`);
      addEntry(`Outcome: ${choice.outcome}`);

      awaitingChoice = false;
      button.disabled = false;
      onComplete();
    }, { once: true });

    choiceContainer.appendChild(btn);
  });

  log.insertBefore(choiceContainer, log.firstChild);
}

function runScenarios(scenarios, index, onAllDone) {
  if (index >= scenarios.length) {
    onAllDone();
    return;
  }

  showChoices(scenarios[index], () => {
    runScenarios(scenarios, index + 1, onAllDone);
  });
}

async function getRandomCountry() {
  const response = await fetch("https://countriesnow.space/api/v0.1/countries/population/filter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      limit: 196,
      lt: 2000000000,
      gt: 500000,
      orderBy: "name",
      order: "asc",
    }),
  });

  const data = await response.json();
  const countries = data.data;
  return countries[Math.floor(Math.random() * countries.length)];
}

async function handleBirth() {
  playerCountry = await getRandomCountry();

  addEntry(`Country: ${playerCountry.country} (${playerCountry.code})`);
  addEntry(`Population: ${playerCountry.populationCounts.value.toLocaleString()} in ${playerCountry.populationCounts.year}`);
  addEntry(`— You were born —`, true);

  currentPhase = "childhood";
  currentAge = 0;

  const button = document.querySelector(".birth-button");
  button.textContent = "Age";
  button.removeEventListener("click", handleBirth);
  button.addEventListener("click", handleAge);
}

function handleAge() {
  if (awaitingChoice) return;

  const button = document.querySelector(".birth-button");
  let phaseKey;

  if (currentPhase === "childhood") {
    currentAge = getRandomAge(5, 12);
    phaseKey = "childhood";
    currentPhase = "adolescence";
  } else if (currentPhase === "adolescence") {
    currentAge = getRandomAge(13, 20);
    phaseKey = "adolescence";
    currentPhase = "youngAdulthood";
  } else if (currentPhase === "youngAdulthood") {
    currentAge = getRandomAge(21, 40);
    phaseKey = "youngAdulthood";
    currentPhase = "oldAdulthood";
  } else if (currentPhase === "oldAdulthood") {
    currentAge = getRandomAge(41, 90);
    phaseKey = "oldAdulthood";
    currentPhase = "dead";
  }

  const scenarios = getRandomScenarios(scenariosByPhase[phaseKey]);
  const phaseName = getPhaseName(currentAge);

  addEntry(`— ${phaseName} (Age ${currentAge}) —`, true);

  runScenarios(scenarios, 0, () => {
    if (currentPhase === "dead") {
      addEntry(`— You passed away at age ${currentAge}. Game over. —`, true);
      button.textContent = "Play Again";
      button.removeEventListener("click", handleAge);
      button.addEventListener("click", () => location.reload(), { once: true });
    }
  });
}

const button = document.querySelector(".birth-button");
button.addEventListener("click", handleBirth, { once: true });