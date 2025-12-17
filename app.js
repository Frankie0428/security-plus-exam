// app.js
"use strict";

// ========================================
// CONFIG
// ========================================
const EXAM_QUESTION_COUNT = 90;
const EXAM_TIME_SECONDS = 90 * 60;
const STORAGE_KEY = "secplus_exam_progress";

// ========================================
// STATE
// ========================================
let examQuestions = [];
let currentQuestion = 0;
let userAnswers = [];
let timerInterval = null;
let examStarted = false;
let examSubmitted = false;

// ========================================
// HELPERS
// ========================================
const byId = (id) => document.getElementById(id);

function mustGet(id) {
  const el = byId(id);
  if (!el) {
    console.error(`❌ Missing element: #${id}`);
  }
  return el;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function safeHide(id) {
  const el = byId(id);
  if (el) el.classList.add("hidden");
}

function safeShow(id) {
  const el = byId(id);
  if (el) el.classList.remove("hidden");
}

// ========================================
// BUILD EXAM (SAFE + FAST)
// ========================================
function buildExamForm() {
  if (!Array.isArray(window.questionBank) || window.questionBank.length === 0) {
    alert("❌ Question bank not loaded. Check questions.js and script order in index.html.");
    return false;
  }

  const totalAvailable = window.questionBank.length;
  const count = Math.min(EXAM_QUESTION_COUNT, totalAvailable);

  if (totalAvailable < EXAM_QUESTION_COUNT) {
    alert(
      `⚠️ PRACTICE MODE\n\n` +
      `You have ${totalAvailable} questions.\n` +
      `Exam will run with ${count} questions.\n\n` +
      `Add ${EXAM_QUESTION_COUNT - totalAvailable} more to unlock full exam mode.`
    );
  }

  // pick unique random indexes
  const picked = new Set();
  while (picked.size < count) {
    picked.add(Math.floor(Math.random() * totalAvailable));
  }

  examQuestions = Array.from(picked).map((i) => window.questionBank[i]);
  userAnswers = new Array(examQuestions.length).fill(null);
  currentQuestion = 0;

  return true;
}

// ========================================
// INIT (runs after DOM is ready)
// ========================================
function initApp() {
  // Don’t crash if some ids are missing — just log it
  const loadingScreen = mustGet("loadingScreen");
  const startScreen = mustGet("startScreen");

  // Wire buttons (NO inline onclick needed)
  const startBtn = byId("startBtn");
  if (startBtn) startBtn.addEventListener("click", startExam);

  const prevBtn = byId("prevBtn");
  if (prevBtn) prevBtn.addEventListener("click", previousQuestion);

  const nextBtn = byId("nextBtn");
  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);

  const submitBtn = byId("submitBtn");
  if (submitBtn) submitBtn.addEventListener("click", confirmSubmit);

  // Show start screen
  if (loadingScreen) loadingScreen.classList.add("hidden");
  if (startScreen) startScreen.classList.remove("hidden");

  console.log("✅ App initialized");
}

window.addEventListener("DOMContentLoaded", initApp);

// ========================================
// START EXAM
// ========================================
function startExam() {
  if (!buildExamForm()) return;

  examStarted = true;
  examSubmitted = false;

  safeHide("startScreen");
  safeShow("examContainer");
  safeHide("results");

  const totalQ = byId("totalQ");
  if (totalQ) totalQ.textContent = String(examQuestions.length);

  loadQuestion();
  startTimer(EXAM_TIME_SECONDS);
}

// ========================================
// TIMER
// ========================================
function startTimer(seconds) {
  let remaining = Number.isFinite(seconds) ? seconds : EXAM_TIME_SECONDS;
  const timerEl = mustGet("timer");

  if (timerInterval) clearInterval(timerInterval);

  if (timerEl) timerEl.textContent = formatTime(remaining);

  timerInterval = setInterval(() => {
    if (examSubmitted) {
      clearInterval(timerInterval);
      return;
    }

    remaining--;
    if (timerEl) timerEl.textContent = formatTime(Math.max(0, remaining));

    if (remaining === 600) alert("⚠️ 10 minutes remaining");
    if (remaining === 300) alert("⚠️ 5 minutes remaining");

    if (remaining <= 0) {
      alert("⏰ Time expired. Submitting exam.");
      submitExam();
    }
  }, 1000);
}

// ========================================
// QUESTIONS UI
// ========================================
function loadQuestion() {
  const q = examQuestions[currentQuestion];
  if (!q) return;

  const qNum = mustGet("qNum");
  const questionText = mustGet("questionText");
  const questionDomain = mustGet("questionDomain");
  const optionsContainer = mustGet("optionsContainer");

  if (qNum) qNum.textContent = String(currentQuestion + 1);
  if (questionText) questionText.textContent = q.question || "";
  if (questionDomain) questionDomain.textContent = q.domain || "";

  if (!optionsContainer) return;
  optionsContainer.innerHTML = "";

  q.options.forEach((text, i) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option";

    const inputId = `q${currentQuestion}_opt${i}`;
    const checked = userAnswers[currentQuestion] === i;

    if (checked) optionDiv.classList.add("selected");

    optionDiv.innerHTML = `
      <input type="radio" id="${inputId}" name="q${currentQuestion}" ${checked ? "checked" : ""} />
      <label for="${inputId}">${text}</label>
    `;

    // Clicking the whole row selects the option
    optionDiv.addEventListener("click", () => {
      if (examSubmitted) return;
      userAnswers[currentQuestion] = i;
      loadQuestion(); // re-render to update selected state
    });

    optionsContainer.appendChild(optionDiv);
  });

  updateNav();
  updateStats();
  window.scrollTo(0, 0);
}

// ========================================
// NAV
// ========================================
function updateNav() {
  const prevBtn = byId("prevBtn");
  const nextBtn = byId("nextBtn");
  const submitBtn = byId("submitBtn");

  if (prevBtn) prevBtn.disabled = currentQuestion === 0;

  const isLast = currentQuestion === examQuestions.length - 1;
  if (nextBtn) nextBtn.classList.toggle("hidden", isLast);
  if (submitBtn) submitBtn.classList.toggle("hidden", !isLast);
}

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
// STATS
// ========================================
function updateStats() {
  const answered = userAnswers.filter((x) => x !== null).length;
  const percent = examQuestions.length ? Math.round((answered / examQuestions.length) * 100) : 0;

  const answeredCount = byId("answeredCount");
  const progressPercent = byId("progressPercent");
  const progressBar = byId("progressBar");

  if (answeredCount) answeredCount.textContent = String(answered);
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressBar) progressBar.style.width = `${percent}%`;
}

// ========================================
// SUBMIT / RESULTS
// ========================================
function confirmSubmit() {
  const unanswered = userAnswers.filter((a) => a === null).length;
  const msg =
    unanswered > 0
      ? `You have ${unanswered} unanswered question(s).\n\nSubmit exam for grading?`
      : "Submit exam for grading?";

  if (confirm(msg)) submitExam();
}

function submitExam() {
  examSubmitted = true;
  if (timerInterval) clearInterval(timerInterval);

  let correct = 0;
  userAnswers.forEach((a, i) => {
    if (a === examQuestions[i].correct) correct++;
  });

  const score = examQuestions.length ? Math.round((correct / examQuestions.length) * 100) : 0;

  safeHide("examContainer");
  safeShow("results");

  const scorePercentage = byId("scorePercentage");
  const correctAnswers = byId("correctAnswers");
  const totalQuestions = byId("totalQuestions");

  if (scorePercentage) scorePercentage.textContent = `${score}%`;
  if (correctAnswers) correctAnswers.textContent = String(correct);
  if (totalQuestions) totalQuestions.textContent = String(examQuestions.length);

  // Optional: clear saved progress
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// ========================================
// SAFETY: prevent accidental close
// ========================================
window.addEventListener("beforeunload", (e) => {
  if (examStarted && !examSubmitted && userAnswers.some((a) => a !== null)) {
    e.preventDefault();
    e.returnValue = "";
  }
});
