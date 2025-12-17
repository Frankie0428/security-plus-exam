// ========================================
// EXAM STATE MANAGEMENT
// ========================================
let currentQuestion = 0;
let userAnswers = new Array(85).fill(null); // Will be updated when questions.js loads
let flaggedQuestions = new Set();
let examStartTime;
let timerInterval;
let examSubmitted = false;
let examStarted = false;

// ========================================
// INITIALIZATION
// ========================================
function initApp() {
    // Update total questions based on loaded questions
    userAnswers = new Array(questions.length).fill(null);
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('startScreen').classList.remove('hidden');
        
        // Check for saved progress
        checkSavedProgress();
    }, 1000);
}

// ========================================
// SAVED PROGRESS
// ========================================
function checkSavedProgress() {
    const saved = localStorage.getItem('securityPlusExamProgress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            const timestamp = new Date(progress.timestamp);
            const now = new Date();
            const hoursDiff = (now - timestamp) / (1000 * 60 * 60);
            
            // Only show if less than 24 hours old
            if (hoursDiff < 24) {
                document.getElementById('savedProgress').classList.remove('hidden');
                document.getElementById('savedTime').textContent = timestamp.toLocaleString();
            } else {
                localStorage.removeItem('securityPlusExamProgress');
            }
        } catch (e) {
            localStorage.removeItem('securityPlusExamProgress');
        }
    }
}

function saveProgress() {
    if (examSubmitted || !examStarted) return;
    
    const progress = {
        currentQuestion,
        userAnswers,
        flaggedQuestions: Array.from(flaggedQuestions),
        timeRemaining: document.getElementById('timer').textContent,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('securityPlusExamProgress', JSON.stringify(progress));
}

function loadSavedProgress() {
    const saved = localStorage.getItem('securityPlusExamProgress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            currentQuestion = progress.currentQuestion;
            userAnswers = progress.userAnswers;
            flaggedQuestions = new Set(progress.flaggedQuestions);
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

// ========================================
// START EXAM
// ========================================
function startExam() {
    examStarted = true;
    examStartTime = Date.now();
    
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('examContainer').classList.remove('hidden');
    
    document.getElementById('totalQ').textContent = questions.length;
    loadQuestion();
    startTimer();
    
    // Auto-save every 30 seconds
    setInterval(saveProgress, 30000);
}

function continueExam() {
    const loaded = loadSavedProgress();
    if (loaded) {
        startExam();
    } else {
        alert('Could not load saved progress. Starting fresh exam.');
        startFreshExam();
    }
}

function startFreshExam() {
    localStorage.removeItem('securityPlusExamProgress');
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    flaggedQuestions = new Set();
    startExam();
}

// ========================================
// TIMER
// ========================================
function startTimer() {
    let timeRemaining = 90 * 60; // 90 minutes in seconds
    
    const timerEl = document.getElementById('timer');
    
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0 || examSubmitted) {
            clearInterval(timerInterval);
            if (!examSubmitted) {
                alert('⏰ Time expired! Submitting exam...');
                submitExam();
            }
            return;
        }
        
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Warning at 10 minutes
        if (timeRemaining === 600) {
            timerEl.classList.add('warning');
            alert('⚠️ Warning: Only 10 minutes remaining!');
        }
        
        // Warning at 5 minutes
        if (timeRemaining === 300) {
            alert('⚠️ Warning: Only 5 minutes remaining!');
        }
    }, 1000);
}

// ========================================
// QUESTION LOADING
// ========================================
function loadQuestion() {
    const q = questions[currentQuestion];
    
    // Update question number and domain
    document.getElementById('qNum').textContent = currentQuestion + 1;
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    document.getElementById('questionDomain').textContent = q.domain;
    document.getElementById('questionText').textContent = q.question;
    
    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        // Show correct/incorrect after submission
        if (examSubmitted) {
            optionDiv.classList.add('disabled');
            if (index === q.correct) {
                optionDiv.classList.add('correct');
            }
            if (userAnswers[currentQuestion] === index && index !== q.correct) {
                optionDiv.classList.add('incorrect');
            }
        }
        
        const inputId = `option-${currentQuestion}-${index}`;
        const isChecked = userAnswers[currentQuestion] === index;
        const isDisabled = examSubmitted;
        
        optionDiv.innerHTML = `
            <input type="radio" 
                   id="${inputId}" 
                   name="question-${currentQuestion}" 
                   value="${index}" 
                   ${isChecked ? 'checked' : ''}
                   ${isDisabled ? 'disabled' : ''}>
            <label for="${inputId}">${option}</label>
        `;
        
        if (!examSubmitted) {
            optionDiv.addEventListener('click', () => selectOption(index));
        }
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update flag button
    updateFlagButton();
    
    // Show/hide explanation
    updateExplanation();
    
    // Update navigation buttons
    updateNavigation();
    
    // Update stats
    updateStats();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateFlagButton() {
    const flagBtn = document.getElementById('flagBtn');
    
    if (examSubmitted) {
        flagBtn.style.display = 'none';
        return;
    }
    
    if (flaggedQuestions.has(currentQuestion)) {
        flagBtn.classList.add('flagged');
        flagBtn.textContent = '🚩 Flagged';
    } else {
        flagBtn.classList.remove('flagged');
        flagBtn.textContent = '🚩 Flag';
    }
}

function updateExplanation() {
    const explanationDiv = document.getElementById('explanation');
    
    if (examSubmitted) {
        const q = questions[currentQuestion];
        const isCorrect = userAnswers[currentQuestion] === q.correct;
        
        explanationDiv.classList.remove('hidden');
        explanationDiv.innerHTML = `
            <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong><br><br>
            ${q.explanation}
        `;
    } else {
        explanationDiv.classList.add('hidden');
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Previous button
    prevBtn.disabled = currentQuestion === 0;
    
    // Next/Submit button
    if (currentQuestion === questions.length - 1) {
        if (!examSubmitted) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// ========================================
// USER INTERACTIONS
// ========================================
function selectOption(index) {
    if (examSubmitted) return;
    
    userAnswers[currentQuestion] = index;
    
    // Update UI
    document.querySelectorAll('.option').forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        } else {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        }
    });
    
    updateStats();
    saveProgress();
}

function toggleFlag() {
    if (examSubmitted) return;
    
    if (flaggedQuestions.has(currentQuestion)) {
        flaggedQuestions.delete(currentQuestion);
    } else {
        flaggedQuestions.add(currentQuestion);
    }
    
    updateFlagButton();
    updateStats();
    saveProgress();
}

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
    document.getElementById('questionContainer').classList.add('hidden');
    document.getElementById('reviewScreen').classList.remove('hidden');
    
    const reviewGrid = document.getElementById('reviewGrid');
    reviewGrid.innerHTML = '';
    
    questions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'review-question-btn';
        btn.textContent = index + 1;
        
        // Add classes based on status
        if (userAnswers[index] !== null) {
            btn.classList.add('answered');
        }
        if (flaggedQuestions.has(index)) {
            btn.classList.add('flagged');
        }
        if (index === currentQuestion) {
            btn.classList.add('current');
        }
        
        btn.onclick = () => jumpToQuestion(index);
        reviewGrid.appendChild(btn);
    });
}

function closeReviewScreen() {
    document.getElementById('reviewScreen').classList.add('hidden');
    document.getElementById('questionContainer').classList.remove('hidden');
}

function jumpToQuestion(index) {
    currentQuestion = index;
    closeReviewScreen();
    loadQuestion();
}

// ========================================
// STATISTICS
// ========================================
function updateStats() {
    const answered = userAnswers.filter(a => a !== null).length;
    const progress = Math.round((answered / questions.length) * 100);
    
    document.getElementById('answeredCount').textContent = answered;
    document.getElementById('flaggedCount').textContent = flaggedQuestions.size;
    document.getElementById('progressPercent').textContent = progress + '%';
    document.getElementById('progressBar').style.width = progress + '%';
}

// ========================================
// SUBMIT EXAM
// ========================================
function confirmSubmit() {
    const unanswered = userAnswers.filter(a => a === null).length;
    
    let message = 'Are you sure you want to submit your exam for grading?';
    
    if (unanswered > 0) {
        message = `You have ${unanswered} unanswered question(s).\n\n${message}`;
    }
    
    if (confirm(message)) {
        submitExam();
    }
}

function submitExam() {
    examSubmitted = true;
    clearInterval(timerInterval);
    
    // Calculate scores
    const results = calculateResults();
    
    // Show results screen
    document.getElementById('questionContainer').classList.add('hidden');
    document.querySelector('.navigation').classList.add('hidden');
    document.getElementById('reviewScreen').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    
    displayResults(results);
    
    // Clear saved progress
    localStorage.removeItem('securityPlusExamProgress');
}

function calculateResults() {
    let correct = 0;
    const domainScores = {};
    
    userAnswers.forEach((answer, index) => {
        const q = questions[index];
        const domain = q.domain;
        
        if (!domainScores[domain]) {
            domainScores[domain] = { correct: 0, total: 0 };
        }
        
        domainScores[domain].total++;
        
        if (answer === q.correct) {
            correct++;
            domainScores[domain].correct++;
        }
    });
    
    const percentage = Math.round((correct / questions.length) * 100);
    const passed = percentage >= 83;
    
    return {
        correct,
        total: questions.length,
        percentage,
        passed,
        domainScores
    };
}

function displayResults(results) {
    // Display score
    document.getElementById('scorePercentage').textContent = results.percentage + '%';
    document.getElementById('correctAnswers').textContent = results.correct;
    document.getElementById('totalQuestions').textContent = results.total;
    
    // Display pass/fail status
    const passStatus = document.getElementById('passStatus');
    if (results.passed) {
        passStatus.className = 'pass-status pass';
        passStatus.innerHTML = '🎉 PASSED! Congratulations!';
    } else {
        passStatus.className = 'pass-status fail';
        passStatus.innerHTML = `😔 Score: ${results.percentage}% (Passing: 83%)<br>Keep studying and try again!`;
    }
    
    // Display domain breakdown
    const domainBreakdown = document.getElementById('domainBreakdown');
    domainBreakdown.innerHTML = '';
    
    Object.keys(results.domainScores).sort().forEach(domain => {
        const score = results.domainScores[domain];
        const percent = Math.round((score.correct / score.total) * 100);
        
        let scoreClass = 'good';
        let performanceClass = 'good';
        if (percent < 70) {
            scoreClass = 'poor';
            performanceClass = 'poor';
        } else if (percent < 83) {
            scoreClass = 'average';
            performanceClass = 'average';
        }
        
        const domainDiv = document.createElement('div');
        domainDiv.className = `domain-result ${performanceClass}`;
        domainDiv.innerHTML = `
            <span class="domain-name">${domain}</span>
            <span class="domain-score ${scoreClass}">
                ${score.correct}/${score.total} (${percent}%)
            </span>
        `;
        domainBreakdown.appendChild(domainDiv);
    });
}

// ========================================
// REVIEW ANSWERS
// ========================================
function reviewAnswers() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('questionContainer').classList.remove('hidden');
    document.querySelector('.navigation').classList.remove('hidden');
    
    currentQuestion = 0;
    loadQuestion();
}

// ========================================
// RESTART EXAM
// ========================================
function restartExam() {
    if (confirm('This will reset all your answers and start a new exam. Continue?')) {
        localStorage.removeItem('securityPlusExamProgress');
        location.reload();
    }
}

// ========================================
// SOCIAL SHARING
// ========================================
function shareTwitter() {
    const text = `I just scored ${document.getElementById('scorePercentage').textContent} on the Security+ practice exam! 🎓🔐`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

// ========================================
// ABOUT MODAL
// ========================================
function showAbout() {
    document.getElementById('aboutModal').classList.remove('hidden');
}

function closeAbout() {
    document.getElementById('aboutModal').classList.add('hidden');
}

// ========================================
// PREVENT ACCIDENTAL PAGE CLOSURE
// ========================================
window.addEventListener('beforeunload', (e) => {
    if (examStarted && !examSubmitted && userAnswers.some(a => a !== null)) {
        e.preventDefault();
        e.returnValue = 'You have an exam in progress. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', (e) => {
    if (!examStarted || examSubmitted) return;
    
    // Don't trigger if user is in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key) {
        case 'ArrowLeft':
            if (currentQuestion > 0) previousQuestion();
            break;
        case 'ArrowRight':
            if (currentQuestion < questions.length - 1) nextQuestion();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex < questions[currentQuestion].options.length) {
                selectOption(optionIndex);
            }
            break;
        case 'f':
        case 'F':
            toggleFlag();
            break;
        case 'r':
        case 'R':
            showReviewScreen();
            break;
    }
});

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
window.addEventListener('load', initApp);
```

---

## **STEP 5: Visit Your Live Exam**

Your exam is now live at:
```
https://YOUR-GITHUB-USERNAME.github.io/security-plus-exam/
```

Example:
```
https://fortifymynetwork.github.io/security-plus-exam/
