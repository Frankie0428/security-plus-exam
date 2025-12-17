// ========================================
// EXAM STATE
// ========================================
let currentQuestion = 0;
let userAnswers = [];
let flaggedQuestions = new Set();
let timerInterval = null;
let examSubmitted = false;
let examStarted = false;

// localStorage key
const STORAGE_KEY = "securityPlusExamProgress";

// ========================================
// INITIALIZATION
// ========================================
function initApp() {
  // Validate questions exist
  if (!Array.isArray(questions) || questions.length === 0) {
    alert("questions.js did not load or has no questions.");
    return;
  }

  userAnswers = new Array(questions.length).fill(null);

  // Show start screen after a brief load
  setTimeout(() => {
    byId("loadingScreen").classList.add("hidden");
    byId("startScreen").classList.remove("hidden");
    checkSavedProgress();
  }, 600);
}

function byId(id) {
  return document.getElementById(id);
}

// ========================================
// SAVED PROGRESS
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

    // basic sanity
    if (!Array.isArray(progress.userAnswers)) return null;

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
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  flaggedQuestions = new Set();
  startExam(90 * 60);
}

function continueExam() {
  const progress = loadSavedProgress();
  if (!progress) {
    alert("Could not load saved progress. Starting fresh.");
    return startFreshExam();
  }

  // if saved answers length doesn't match current questions length, reset
  if (progress.userAnswers.length !== questions.length) {
    alert("Saved progress doesn't match current question set. Starting fresh.");
    return startFreshExam();
  }

  startExam(progress.timeRemainingSeconds ?? 90 * 60);
}

function startExam(timeRemainingSeconds) {
  examStarted = true;
  examSubmitted = false;

  byId("startScreen").classList.add("hidden");
  byId("examContainer").classList.remove("hidden");

  byId("totalQ").textContent = questions.length;
  loadQuestion();
  startTimer(timeRemainingSeconds);
}

// ========================================
// TIMER
// ========================================
function startTimer(timeRemainingSeconds) {
  let remaining = Number.isFinite(timeRemainingSeconds) ? timeRemainingSeconds : 90 * 60;
  const timerEl = byId("timer");

  // clear any old timer
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

    // autosave every tick? (cheap + reliable)
    // If you want only every 30 seconds, we can throttle — but this is simple.
    saveProgress(remaining);
  }, 1000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ========================================
// QUESTION LOADING / UI
// ========================================
function loadQuestion() {
  const q = questions[currentQuestion];

  byId("qNum").textContent = currentQuestion + 1;
  byId("currentQ").textContent = currentQuestion + 1;
  byId("questionDomain").textContent = q.domain || "";
  byId("questionText").textContent = q.question || "";

  const optionsContainer = byId("optionsContainer");
  optionsContainer.innerHTML = "";

  q.options.forEach((optText, index) => {
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

  const q = questions[currentQuestion];
  const isCorrect = userAnswers[currentQuestion] === q.correct;

  div.classList.remove("hidden");
  div.innerHTML = `<strong>${isCorrect ? "✅ Correct!" : "❌ Incorrect"}</strong><br><br>${q.explanation || ""}`;
}

function updateNavigation() {
  const prevBtn = byId("prevBtn");
  const nextBtn = byId("nextBtn");
  const submitBtn = byId("submitBtn");

  prevBtn.disabled = currentQuestion === 0;

  if (currentQuestion === questions.length - 1 && !examSubmitted) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

function updateStats() {
  const answered = userAnswers.filter(x => x !== null).length;
  const progress = Math.round((answered / questions.length) * 100);

  byId("answeredCount").textContent = answered;
  byId("flaggedCount").textContent = flaggedQuestions.size;
  byId("progressPercent").textContent = `${progress}%`;
  byId("progressBar").style.width = `${progress}%`;
}

// ========================================
// NAVIGATION
// ========================================
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
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

  questions.forEach((_, idx) => {
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
// SUBMIT EXAM / RESULTS
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
    const q = questions[i];
    const d = q.domain || "Unknown";

    if (!domainScores[d]) domainScores[d] = { correct: 0, total: 0 };
    domainScores[d].total++;

    if (answer === q.correct) {
      correct++;
      domainScores[d].correct++;
    }
  });

  const percentage = Math.round((correct / questions.length) * 100);
  const passed = percentage >= 83;

  return { correct, total: questions.length, percentage, passed, domainScores };
}

function showResults(results) {
  byId("questionContainer").classList.add("hidden");
  const nav = document.querySelector(".nav");
  if (nav) nav.classList.add("hidden");
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
  const nav = document.querySelector(".nav");
  if (nav) nav.classList.remove("hidden");

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
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener("keydown", (e) => {
  if (!examStarted || examSubmitted) return;
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  if (e.key === "ArrowLeft") previousQuestion();
  if (e.key === "ArrowRight") nextQuestion();

  if (["1","2","3","4"].includes(e.key)) {
    const idx = parseInt(e.key, 10) - 1;
    const q = questions[currentQuestion];
    if (idx >= 0 && idx < q.options.length) selectOption(idx);
  }

  if (e.key === "f" || e.key === "F") toggleFlag();
  if (e.key === "r" || e.key === "R") showReviewScreen();
});

// ========================================
// BOOT
// ========================================
window.addEventListener("load", initApp);
