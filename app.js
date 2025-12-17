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
const byId = id => document.getElementById(id);
const formatTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// ========================================
// BUILD EXAM (SAFE + FAST)
// ========================================
function buildExamForm() {
  if (!Array.isArray(questionBank) || questionBank.length === 0) {
    alert("❌ Question bank not loaded.");
    return false;
  }

  const count = Math.min(EXAM_QUESTION_COUNT, questionBank.length);

  if (questionBank.length < EXAM_QUESTION_COUNT) {
    alert(
      `⚠️ PRACTICE MODE\n\n` +
      `You have ${questionBank.length} questions.\n` +
      `Exam will run with ${count} questions.\n\n` +
      `Add ${EXAM_QUESTION_COUNT - questionBank.length} more to unlock full exam mode.`
    );
  }

  const picked = new Set();
  while (picked.size < count) {
    picked.add(Math.floor(Math.random() * questionBank.length));
  }

  examQuestions = Array.from(picked).map(i => questionBank[i]);
  userAnswers = new Array(examQuestions.length).fill(null);
  flaggedQuestions = new Set();
  currentQuestion = 0;

  return true;
}

// ========================================
// INIT
// ========================================
window.addEventListener("load", () => {
  byId("loadingScreen").classList.add("hidden");
  byId("startScreen").classList.remove("hidden");
});

// ========================================
// START EXAM
// ========================================
function startExam() {
  if (!buildExamForm()) return;

  examStarted = true;
  examSubmitted = false;

  byId("startScreen").classList.add("hidden");
  byId("examContainer").classList.remove("hidden");
  byId("totalQ").textContent = examQuestions.length;

  loadQuestion();
  startTimer(EXAM_TIME_SECONDS);
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

  byId("qNum").textContent = currentQuestion + 1;
  byId("questionText").textContent = q.question;
  byId("questionDomain").textContent = q.domain;

  const container = byId("optionsContainer");
  container.innerHTML = "";

  q.options.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "option";
    if (userAnswers[currentQuestion] === i) div.classList.add("selected");

    div.innerHTML = `
      <input type="radio" name="q${currentQuestion}" ${userAnswers[currentQuestion] === i ? "checked" : ""}>
      <label>${text}</label>
    `;

    div.onclick = () => {
      userAnswers[currentQuestion] = i;
      loadQuestion();
    };

    container.appendChild(div);
  });

  updateNav();
  updateStats();
}

// ========================================
// NAV
// ========================================
function updateNav() {
  byId("prevBtn").disabled = currentQuestion === 0;
  byId("nextBtn").classList.toggle("hidden", currentQuestion === examQuestions.length - 1);
  byId("submitBtn").classList.toggle("hidden", currentQuestion !== examQuestions.length - 1);
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
  const answered = userAnswers.filter(x => x !== null).length;
  const percent = Math.round((answered / examQuestions.length) * 100);
  byId("answeredCount").textContent = answered;
  byId("progressPercent").textContent = `${percent}%`;
  byId("progressBar").style.width = `${percent}%`;
}

// ========================================
// SUBMIT
// ========================================
function submitExam() {
  examSubmitted = true;
  clearInterval(timerInterval);

  let correct = 0;
  userAnswers.forEach((a, i) => {
    if (a === examQuestions[i].correct) correct++;
  });

  const score = Math.round((correct / examQuestions.length) * 100);

  byId("examContainer").classList.add("hidden");
  byId("results").classList.remove("hidden");
  byId("scorePercentage").textContent = `${score}%`;
  byId("correctAnswers").textContent = correct;
  byId("totalQuestions").textContent = examQuestions.length;
}
