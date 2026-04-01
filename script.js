let currentAge = 0;
let currentPhase = "birth";
let playerCountry = null;
let awaitingChoice = false;
let birthYear = null;

let youngAdulthoodEvent = null;

const scenariosByPhase = {
  childhood: [
    {
      prompt: "Your parents ground you for a week because they thought you were rebellious. You didn't do anything wrong. You're frustrated. How do you react?",
      choices: [
        { text: "Stand up to them", outcome: "Your parents were testing you. You learned to communicate your feelings better." },
        { text: "Suck it up", outcome: "You learned to handle frustration better." },
        { text: "Actually rebel this time", outcome: "Your parents were shocked. It was a hard lesson for everyone but you all grew from it." },
      ],
    },
    {
      prompt: "You find $20 on the school playground. What do you do?",
      choices: [
        { text: "Keep it", outcome: "You bought candy and toys. It felt great." },
        { text: "Hand it in", outcome: "The teacher praised you. They let you keep it." },
      ],
    },
    {
      prompt: "Your parents sign you up for an after-school activity.",
      choices: [
        { text: "Join the sports team", outcome: "You made lots of friends and got really fit." },
        { text: "Join the music club", outcome: "You discovered a love for creativity that stuck with you." },
        { text: "Join the science club", outcome: "You developed a curiosity for engineering that influenced your future career." },
        { text: "Skip it and play video games", outcome: "You had fun but missed out on socializing and learning new skills." },
      ],
    },
    {
      prompt: "Your friend group leaves you out of an activity for the first time. How do you respond?",
      choices: [
        { text: "Show up anyway", outcome: "They left you out on purpose. It felt awkward but you learned who your true friends are." },
        { text: "Leave them alone", outcome: "They eventually moved on, and so did you, but you always wondered what could have been." },
        { text: "Ask them why", outcome: "They were honest and said they just wanted to try something new. You understood and stayed friends." },
        { text: "Make new friends out of spite", outcome: "You found a new group that was a better fit for you. It was a tough lesson but it made you stronger." },
      ],
    },
    {
      prompt: "You collaborate with an adult on a project. They're incorrect about something important. What do you do?",
      choices: [
        { text: "Politely correct them", outcome: "They appreciated your input and you learned to speak up respectfully." },
        { text: "Go along with it", outcome: "You avoided conflict but missed out on a learning opportunity." },
      ],
    }
  ],

  adolescence: [
    {
      prompt: "You're eating dinner at a friend's house and they offer you something you don't want to eat. What do you do?",
      choices: [
        { text: "Eat it anyway", outcome: "You felt uncomfortable but didn't want to be rude." },
        { text: "Politely decline", outcome: "You maintained your boundaries and felt confident in your decision." },
        { text: "Make an excuse to leave the table", outcome: "You avoided the situation but felt guilty about it later." },
        { text: "Say you don't like it", outcome: "They were hurt by your response. They put effort into the meal and felt bad." },
      ],
    },
    {
      prompt: "You develop a crush on someone. What do you do?",
      choices: [
        { text: "Tell them how you feel", outcome: "They felt the same way. It develops into a long-term relationship." },
        { text: "Keep it to yourself", outcome: "You never told them. They started dating your friend instead." },
        { text: "Drop hints", outcome: "They found you weird and rejected you for not owning up to your feelings." },
      ],
    },
    {
      prompt: "A friend offers you something at a party that you're unsure about.",
      choices: [
        { text: "Decline and enjoy the party", outcome: "You avoided a bad situation. Your parents never found out." },
        { text: "Give in to the pressure", outcome: "Your skin broke out the next morning. It was a hard lesson to learn." },
        { text: "Leave the party awkwardly", outcome: "You missed out on the rest of the party and strained a friendship. You felt guilty." },
        { text: "Confront your friend about it", outcome: "They respected you for standing up for yourself. It strengthened your friendship." },
      ],
    },
    {
      prompt: "You have to choose between studying for exams or going to a big party.",
      choices: [
        { text: "Study hard", outcome: "You passed with flying colours and got into your first choice school." },
        { text: "Go to the party", outcome: "You had a great night but barely scraped through your exams." },
        { text: "Try to do both", outcome: "You ended up stressed and didn't do well on either." },
        { text: "Ask to reschedule the party", outcome: "Your friends were understanding and moved it to a different night. You aced your exams and still had fun at the party." },
      ],
    },
  ],

  youngAdulthood: [
    {
      prompt: "You get two job offers at the same time.",
      choices: [
        { text: "Take the high paying corporate job", outcome: "You earned well but worked long stressful hours." },
        { text: "Take the lower paid job you're passionate about", outcome: "You earned less but loved what you did every day." },
        { text: "Neither -> Start your own business", outcome: "It was risky but it paid off. You became your own boss and achieved financial independence." },
      ],
    },
    {
      prompt: "Your partner wants to move to another city for their dream job.",
      choices: [
        { text: "Move with them", outcome: "It was tough at first but you both built a great life together." },
        { text: "Stay behind", outcome: "The long distance was hard. You both found someone else." },
      ],
    },
    {
      prompt: "You have enough savings to invest.",
      choices: [
        { text: "Invest in stocks", outcome: "The market did well. Your savings grew significantly." },
        { text: "Invest in real estate", outcome: "You bought a property that appreciated in value. It skyrocketed your net worth." },
        { text: "Splurge on a hobby", outcome: "It turned out to be a great way to spend your time and money. It became part of your identity and a passion." },
      ],
    },
    {
      prompt: "You receive an opportunity to get into a prestigious graduate program, but it would require you to take on significant student debt.",
      choices: [
        { text: "Accept the offer", outcome: "You pursued your education and career goals, but with the burden of student debt. You ended up making a lot more anyway." },
        { text: "Decline the offer", outcome: "You chose to focus on other opportunities and avoided the burden of student debt. You found success in other areas." },
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

function showChoices(scenario, isYoungAdulthood, onComplete) {
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
      log.removeChild(choiceContainer);
      log.removeChild(promptEl);

      addEntry(`➤ You chose: "${choice.text}"`);
      addEntry(`Outcome: ${choice.outcome}`);
      if (isYoungAdulthood && youngAdulthoodEvent === null) {
        youngAdulthoodEvent = {
          prompt: scenario.prompt,
          choiceText: choice.text,
          outcome: choice.outcome,
        };
      }

      awaitingChoice = false;
      button.disabled = false;
      onComplete();
    }, { once: true });

    choiceContainer.appendChild(btn);
  });

  log.insertBefore(choiceContainer, log.firstChild);
}

function runScenarios(scenarios, index, isYoungAdulthood, onAllDone) {
  if (index >= scenarios.length) {
    onAllDone();
    return;
  }

  showChoices(scenarios[index], isYoungAdulthood, () => {
    runScenarios(scenarios, index + 1, isYoungAdulthood, onAllDone);
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
  birthYear = new Date().getFullYear() - Math.floor(Math.random() * 30 + 20);

  addEntry(`— You were born —`, true);
  addEntry(`Country: ${playerCountry.country} (${playerCountry.code})`);
  addEntry(`Population: ${playerCountry.populationCounts.value.toLocaleString()} in ${playerCountry.populationCounts.year}`);
  addEntry(`Birth Year: ${birthYear}`);

  currentPhase = "childhood";
  currentAge = 0;

  const button = document.querySelector(".birth-button");
  button.textContent = "Age";
  button.removeEventListener("click", handleBirth);
  button.addEventListener("click", handleAge);
}

function handleAge() {
  if (awaitingChoice) return;
  if (currentPhase === "dead") return;

  const button = document.querySelector(".birth-button");
  let phaseKey;
  let isYoungAdulthood = false;

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
    isYoungAdulthood = true;
  } else if (currentPhase === "oldAdulthood") {
    currentAge = getRandomAge(41, 90);
    phaseKey = "oldAdulthood";
    currentPhase = "dead";
  }

  const scenarios = getRandomScenarios(scenariosByPhase[phaseKey]);
  const phaseName = getPhaseName(currentAge);

  addEntry(`— ${phaseName} (Age ${currentAge}) —`, true);

  runScenarios(scenarios, 0, isYoungAdulthood, () => {
    if (currentPhase === "dead") {
      addEntry(`— You passed away at age ${currentAge}. Game over. —`, true);

      localStorage.setItem("report_country", playerCountry.country);
      localStorage.setItem("report_age", currentAge);
      localStorage.setItem("report_year", birthYear);

      const eventToSave = youngAdulthoodEvent
        ? `"${youngAdulthoodEvent.prompt}" — You chose: ${youngAdulthoodEvent.choiceText}. ${youngAdulthoodEvent.outcome}`
        : "No defining moment was recorded.";
      localStorage.setItem("report_event", eventToSave);

      button.textContent = "See Your Report";
      button.removeEventListener("click", handleAge);
      button.addEventListener("click", () => {
        window.location.href = "report.html";
      }, { once: true });
    }
  });
}

const button = document.querySelector(".birth-button");
button.addEventListener("click", handleBirth, { once: true });