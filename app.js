// app.js

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
let flaggedQuestions = new Set();
let timerInterval = null;
let examStarted = false;
let examSubmitted = false;

// ========================================
// HELPERS
// ========================================
const byId = (id) => document.getElementById(id);
const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function getQuestionBank() {
  // supports both styles:
  //   const questionBank = [...]
  //   window.questionBank = [...]
  return window.questionBank || (typeof questionBank !== "undefined" ? questionBank : null);
}

// ========================================
// BUILD EXAM (FAST + SAFE)
// ========================================
function buildExamForm() {
  const bank = getQuestionBank();

  if (!Array.isArray(bank) || bank.length === 0) {
    alert("questionBank not found. Check questions.js is loading correctly.");
    return false;
  }

  const count = Math.min(EXAM_QUESTION_COUNT, bank.length);

  if (bank.length < EXAM_QUESTION_COUNT) {
    alert(
      `⚠️ PRACTICE MODE\n\n` +
      `You have ${bank.length} questions.\n` +
      `Exam will run with ${count} questions.\n\n` +
      `Add ${EXAM_QUESTION_COUNT - bank.length} more to unlock full exam mode.`
    );
  }

  const picked = new Set();
  while (picked.size < count) {
    picked.add(Math.floor(Math.random() * bank.length));
  }

  examQuestions = Array.from(picked).map(i => bank[i]);
  userAnswers = new Array(examQuestions.length).fill(null);
  flaggedQuestions = new Set();
  currentQuestion = 0;

  return true;
}

// ========================================
// INIT
// ========================================
window.addEventListener("load", () => {
  // show start screen
  byId("loadingScreen").classList.add("hidden");
  byId("startScreen").classList.remove("hidden");

  // wire buttons
  const startBtn = byId("startBtn");
  const freshBtn = byId("freshBtn");
  const continueBtn = byId("continueBtn");
  const reviewBtn = byId("reviewBtn");
  const closeReviewBtn = byId("closeReviewBtn");

  if (startBtn) startBtn.addEventListener("click", startFreshExam);
  if (freshBtn) freshBtn.addEventListener("click", startFreshExam);
  if (continueBtn) continueBtn.addEventListener("click", continueExam);
  if (reviewBtn) reviewBtn.addEventListener("click", showReviewScreen);
  if (closeReviewBtn) closeReviewBtn.addEventListener("click", closeReviewScreen);

  byId("prevBtn")?.addEventListener("click", previousQuestion);
  byId("nextBtn")?.addEventListener("click", nextQuestion);
  byId("submitBtn")?.addEventListener("click", submitExam);
  byId("flagBtn")?.addEventListener("click", toggleFlag);

  // verify bank loads (silent)
  const bank = getQuestionBank();
  if (!Array.isArray(bank)) {
    // don’t alert here; user clicks start and will see the alert
    console.warn("questionBank missing. Verify questions.js loads without errors.");
  }
});

// ========================================
// START EXAM
// ========================================
function startFreshExam() {
  localStorage.removeItem(STORAGE_KEY);
  if (!buildExamForm()) return;

  examStarted = true;
  examSubmitted = false;

  byId("startScreen").classList.add("hidden");
  byId("examContainer").classList.remove("hidden");
  byId("totalQ").textContent = examQuestions.length;

  loadQuestion();
  startTimer(EXAM_TIME_SECONDS);
}

// (Optional) keep your continueExam later — for now startFreshExam is enough
function continueExam() {
  // placeholder (you can add saved progress later)
  startFreshExam();
}

// ========================================
// TIMER
// ========================================
function startTimer(seconds) {
  let remaining = seconds;
  const timerEl = byId("timer");

  clearInterval(timerInterval);
  timerEl.textContent = formatTime(remaining);

  timerInterval = setInterval(() => {
    if (examSubmitted) return clearInterval(timerInterval);

    remaining--;
    timerEl.textContent = formatTime(remaining);

    if (remaining === 600) alert("⚠️ 10 minutes remaining");
    if (remaining === 300) alert("⚠️ 5 minutes remaining");

    if (remaining <= 0) {
      alert("⏰ Time expired. Submitting exam.");
      submitExam();
    }
  }, 1000);
}

// ========================================
// QUESTIONS
// ========================================
function loadQuestion() {
  const q = examQuestions[currentQuestion];
  if (!q) return;

  byId("qNum").textContent = currentQuestion + 1;
  byId("currentQ").textContent = currentQuestion + 1;

  byId("questionText").textContent = q.question || "";
  byId("questionDomain").textContent = q.domain || "";

  const container = byId("optionsContainer");
  container.innerHTML = "";

  (q.options || []).forEach((text, i) => {

// BOOT
// ========================================
window.addEventListener("load", initApp);

  // Make functions available to inline onclick handlers in HTML
window.startFreshExam = startExam;

// If your HTML has Continue Saved Attempt, map it too (even if you aren’t using saves yet)
window.continueExam = startExam;

// Navigation buttons (if your HTML uses onclick="nextQuestion()" etc.)
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.submitExam = submitExam;

