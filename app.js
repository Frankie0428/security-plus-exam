// ========================================
// SETTINGS
// ========================================
const EXAM_QUESTION_COUNT = 90;
const EXAM_TIME_SECONDS = 90 * 60;
const STORAGE_KEY = "securityPlusExamProgress_v2";

// ========================================
// EXAM STATE
// ========================================
let examQuestions = [];
let currentQuestion = 0;
let userAnswers = [];
let flaggedQuestions = new Set();

let timerInterval = null;
let examSubmitted = false;
let examStarted = false;

// ========================================
// HELPERS
// ========================================
function byId(id) {
  return document.getElementById(id);
}

function getQuestionBank() {
  // supports either style:
  // 1) const questionBank = [...]
  // 2) window.questionBank = [...]
  if (Array.isArray(window.questionBank)) return window.questionBank;
  if (typeof questionBank !== "undefined" && Array.isArray(questionBank)) return questionBank;
  return [];
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ========================================
// BUILD EXAM FORM (random selection)
// ========================================
function buildExamForm() {
  const qb = getQuestionBank();

  if (!Array.isArray(qb) || qb.length === 0) {
    alert("questionBank not found. Check questions.js is loading correctly.");
    return false;
  }

  if (qb.length < EXAM_QUESTION_COUNT) {
    alert(`You have ${qb.length} questions. Add ${EXAM_QUESTION_COUNT - qb.length} more.`);
    return false;
  }

  // Pick 90 unique random questions WITHOUT shuffling the whole bank
  const picked = new Set();
  while (picked.size < EXAM_QUESTION_COUNT) {
    picked.add(Math.floor(Math.random() * qb.length));
  }

  examQuestions = Array.from(picked).map(i => qb[i]);

  currentQuestion = 0;
  userAnswers = new Array(examQuestions.length).fill(null);
  flaggedQuestions = new Set();
  return true;
}

// ========================================
// INIT
// ========================================
function initApp() {
  // If HTML is missing IDs, fail loudly
  const requiredIds = ["loadingScreen", "startScreen", "examContainer"];
  for (const id of requiredIds) {
    if (!byId(id)) {
      console.error("Missing element:", id);
      alert(`HTML is missing required element: #${id}`);
      return;
    }
  }

  // Show start screen after tiny delay
  setTimeout(() => {
    byId("loadingScreen").classList.add("hidden");
    byId("startScreen").classList.remove("hidden");
    checkSavedProgress();
  }, 200);
}

// ========================================
// SAVE / LOAD PROGRESS
// ========================================
function checkSavedProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const progress = JSON.parse(saved);
    const ts = new Date(progress.timestamp);
    const hoursDiff = (Date.now() - ts.getTime()) / (1000 * 60 * 60);

    if (hoursDiff >= 24) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    byId("savedProgress").classList.remove("hidden");
    byId("savedTime").textContent = ts.toLocaleString();
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveProgress(timeRemainingSeconds) {
  if (examSubmitted || !examStarted) return;

  const payload = {
    examQuestions,
    currentQuestion,
    userAnswers,
    flaggedQuestions: Array.from(flaggedQuestions),
    timeRemainingSeconds,
    timestamp: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadSavedProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    const progress = JSON.parse(saved);

    if (!Array.isArray(progress.examQuestions) || progress.examQuestions.length !== EXAM_QUESTION_COUNT) return null;
    if (!Array.isArray(progress.userAnswers) || progress.userAnswers.length !== EXAM_QUESTION_COUNT) return null;

    examQuestions = progress.examQuestions;
    currentQuestion = progress.currentQuestion ?? 0;
    userAnswers = progress.userAnswers;
    flaggedQuestions = new Set(progress.flaggedQuestions || []);

    return progress;
  } catch {
    return null;
  }
}

// ========================================
// START EXAM
// ========================================
function startFreshExam() {
  localStorage.removeItem(STORAGE_KEY);
  if (!buildExamForm()) return;
  startExam(EXAM_TIME_SECONDS);
}

function continueExam() {
  const progress = loadSavedProgress();
  if (!progress) {
    alert("Could not load saved progress. Starting fresh exam.");
    return startFreshExam();
  }
  startExam(progress.timeRemainingSeconds ?? EXAM_TIME_SECONDS);
}

function startExam(timeRemainingSeconds) {
  examStarted = true;
  examSubmitted = false;

  byId("startScreen").classList.add("hidden");
  byId("examContainer").classList.remove("hidden");

  byId("totalQ").textContent = examQuestions.length;

  loadQuestion();
  startTimer(timeRemainingSeconds);
}

// ========================================
// TIMER
// ========================================
function startTimer(timeRemainingSeconds) {
  let remaining = Number.isFinite(timeRemainingSeconds) ? timeRemainingSeconds : EXAM_TIME_SECONDS;
  const timerEl = byId("timer");

  if (timerInterval) clearInterval(timerInterval);

  timerEl.classList.remove("warning");
  timerEl.textContent = formatTime(remaining);

  timerInterval = setInterval(() => {
    if (examSubmitted) {
      clearInterval(timerInterval);
      return;
    }

    remaining--;
    timerEl.textContent = formatTime(remaining);

    if (remaining === 600) {
      timerEl.classList.add("warning");
      alert("⚠️ 10 minutes remaining!");
    }
    if (remaining === 300) {
      alert("⚠️ 5 minutes remaining!");
    }
    if (remaining <= 0) {
      alert("⏰ Time expired! Submitting exam…");
      submitExam();
      return;
    }

    saveProgress(remaining);
  }, 1000);
}

// ========================================
// QUESTION UI
// ========================================
function loadQuestion() {
  const q = examQuestions[currentQuestion];

  byId("qNum").textContent = currentQuestion + 1;
  byId("currentQ").textContent = currentQuestion + 1;
  byId("questionDomain").textContent = q.domain || "";
  byId("questionText").textContent = q.question || "";

  const optionsContainer = byId("optionsContainer");
  optionsContainer.innerHTML = "";

  (q.options || []).forEach((optText, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option";

    if (userAnswers[currentQuestion] === index) optionDiv.classList.add("selected");

    if (examSubmitted) {
      optionDiv.classList.add("disabled");
      if (index === q.correct) optionDiv.classList.add("correct");
      if (userAnswers[currentQuestion] === index && index !== q.correct) optionDiv.classList.add("incorrect");
    }

    const inputId = `q${currentQuestion}_opt${index}`;
    optionDiv.innerHTML = `
      <input type="radio"
             id="${inputId}"
             name="q${currentQuestion}"
             value="${index}"
             ${userAnswers[currentQuestion] === index ? "checked" : ""}
             ${examSubmitted ? "disabled" : ""}>
      <label for="${inputId}">${optText}</label>
    `;

    if (!examSubmitted) optionDiv.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(optionDiv);
  });

  updateFlagButton();
  updateExplanation();
  updateNavigation();
  updateStats();
  window.scrollTo(0, 0);
}

function selectOption(index) {
  if (examSubmitted) return;

  userAnswers[currentQuestion] = index;

  document.querySelectorAll(".option").forEach((el, i) => {
    el.classList.toggle("selected", i === index);
    const input = el.querySelector("input");
    if (input) input.checked = (i === index);
  });

  updateStats();
}

function toggleFlag() {
  if (examSubmitted) return;

  if (flaggedQuestions.has(currentQuestion)) flaggedQuestions.delete(currentQuestion);
  else flaggedQuestions.add(currentQuestion);

  updateFlagButton();
  updateStats();
}

function updateFlagButton() {
  const btn = byId("flagBtn");
  if (examSubmitted) {
    btn.style.display = "none";
    return;
  }
  btn.style.display = "";
  if (flaggedQuestions.has(currentQuestion)) {
    btn.classList.add("flagged");
    btn.textContent = "🚩 Flagged";
  } else {
    btn.classList.remove("flagged");
    btn.textContent = "🚩 Flag";
  }
}

function updateExplanation() {
  const div = byId("explanation");
  if (!examSubmitted) {
    div.classList.add("hidden");
    div.innerHTML = "";
    return;
  }

  const q = examQuestions[currentQuestion];
  const isCorrect = userAnswers[currentQuestion] === q.correct;

  div.classList.remove("hidden");
  div.innerHTML = `<strong>${isCorrect ? "✅ Correct!" : "❌ Incorrect"}</strong><br><br>${q.explanation || ""}`;
}

function updateNavigation() {
  const prevBtn = byId("prevBtn");
  const nextBtn = byId("nextBtn");
  const submitBtn = byId("submitBtn");

  prevBtn.disabled = currentQuestion === 0;

  if (currentQuestion === examQuestions.length - 1 && !examSubmitted) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

function updateStats() {
  const answered = userAnswers.filter(x => x !== null).length;
  const progress = Math.round((answered / examQuestions.length) * 100);

  byId("answeredCount").textContent = answered;
  byId("flaggedCount").textContent = flaggedQuestions.size;
  byId("progressPercent").textContent = `${progress}%`;
  byId("progressBar").style.width = `${progress}%`;
}

// ========================================
// NAVIGATION
// ========================================
function nextQuestion() {
  if (currentQuestion < examQuestions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// ========================================
// REVIEW SCREEN
// ========================================
function showReviewScreen() {
  byId("questionContainer").classList.add("hidden");
  byId("reviewScreen").classList.remove("hidden");

  const grid = byId("reviewGrid");
  grid.innerHTML = "";

  examQuestions.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.className = "review-question-btn";
    btn.textContent = String(idx + 1);

    if (userAnswers[idx] !== null) btn.classList.add("answered");
    if (flaggedQuestions.has(idx)) btn.classList.add("flagged");
    if (idx === currentQuestion) btn.classList.add("current");

    btn.addEventListener("click", () => jumpToQuestion(idx));
    grid.appendChild(btn);
  });
}

function closeReviewScreen() {
  byId("reviewScreen").classList.add("hidden");
  byId("questionContainer").classList.remove("hidden");
}

function jumpToQuestion(idx) {
  currentQuestion = idx;
  closeReviewScreen();
  loadQuestion();
}

// ========================================
// SUBMIT / RESULTS
// ========================================
function confirmSubmit() {
  const unanswered = userAnswers.filter(a => a === null).length;
  const msg = unanswered > 0
    ? `You have ${unanswered} unanswered question(s).\n\nSubmit exam for grading?`
    : "Submit exam for grading?";

  if (confirm(msg)) submitExam();
}

function submitExam() {
  examSubmitted = true;
  if (timerInterval) clearInterval(timerInterval);

  const results = calculateResults();
  showResults(results);

  localStorage.removeItem(STORAGE_KEY);
}

function calculateResults() {
  let correct = 0;
  const domainScores = {};

  userAnswers.forEach((answer, i) => {
    const q = examQuestions[i];
    const d = q.domain || "Unknown";

    if (!domainScores[d]) domainScores[d] = { correct: 0, total: 0 };
    domainScores[d].total++;

    if (answer === q.correct) {
      correct++;
      domainScores[d].correct++;
    }
  });

  const percentage = Math.round((correct / examQuestions.length) * 100);
  const passed = percentage >= 83;

  return { correct, total: examQuestions.length, percentage, passed, domainScores };
}

function showResults(results) {
  byId("questionContainer").classList.add("hidden");
  document.querySelector(".navigation").classList.add("hidden");
  byId("reviewScreen").classList.add("hidden");
  byId("results").classList.remove("hidden");

  byId("scorePercentage").textContent = `${results.percentage}%`;
  byId("correctAnswers").textContent = results.correct;
  byId("totalQuestions").textContent = results.total;

  const passStatus = byId("passStatus");
  passStatus.className = results.passed ? "pass-status pass" : "pass-status fail";
  passStatus.textContent = results.passed
    ? "✅ PASSED! Great job!"
    : `❌ Not passed (Score: ${results.percentage}%, Passing: 83%)`;

  const breakdown = byId("domainBreakdown");
  breakdown.innerHTML = "";

  Object.keys(results.domainScores).sort().forEach(domain => {
    const s = results.domainScores[domain];
    const pct = Math.round((s.correct / s.total) * 100);

    let cls = "good";
    if (pct < 70) cls = "poor";
    else if (pct < 83) cls = "average";

    const row = document.createElement("div");
    row.className = "domain-result";
    row.innerHTML = `
      <span class="domain-name">${domain}</span>
      <span class="domain-score ${cls}">${s.correct}/${s.total} (${pct}%)</span>
    `;
    breakdown.appendChild(row);
  });
}

function reviewAnswers() {
  byId("results").classList.add("hidden");
  byId("questionContainer").classList.remove("hidden");
  document.querySelector(".navigation").classList.remove("hidden");

  currentQuestion = 0;
  loadQuestion();
}

function restartExam() {
  if (confirm("Reset all answers and start over?")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

// ========================================
// SAFETY: prevent accidental close
// ========================================
window.addEventListener("beforeunload", (e) => {
  if (examStarted && !examSubmitted && userAnswers.some(a => a !== null)) {
    e.preventDefault();
    e.returnValue = "";
  }
});

// ========================================
// BOOT
// ========================================
window.addEventListener("load", initApp);
