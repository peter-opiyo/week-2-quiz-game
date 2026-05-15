const screens = {
  home: document.querySelector("#homeScreen"),
  quiz: document.querySelector("#quizScreen"),
  results: document.querySelector("#resultsScreen"),
  review: document.querySelector("#reviewScreen")
};

const elements = {
  categoryGrid: document.querySelector("#categoryGrid"),
  playerName: document.querySelector("#playerName"),
  difficultySelect: document.querySelector("#difficultySelect"),
  highScoresBtn: document.querySelector("#highScoresBtn"),
  homeHighScores: document.querySelector("#homeHighScores"),
  quizCategory: document.querySelector("#quizCategory"),
  scoreDisplay: document.querySelector("#scoreDisplay"),
  timerDisplay: document.querySelector("#timerDisplay"),
  questionCounter: document.querySelector("#questionCounter"),
  difficultyBadge: document.querySelector("#difficultyBadge"),
  progressFill: document.querySelector("#progressFill"),
  questionText: document.querySelector("#questionText"),
  answersGrid: document.querySelector("#answersGrid"),
  finalScore: document.querySelector("#finalScore"),
  gradeBadge: document.querySelector("#gradeBadge"),
  resultMessage: document.querySelector("#resultMessage"),
  correctStat: document.querySelector("#correctStat"),
  incorrectStat: document.querySelector("#incorrectStat"),
  timeoutStat: document.querySelector("#timeoutStat"),
  categoryHighScores: document.querySelector("#categoryHighScores"),
  reviewBtn: document.querySelector("#reviewBtn"),
  playAgainBtn: document.querySelector("#playAgainBtn"),
  chooseCategoryBtn: document.querySelector("#chooseCategoryBtn"),
  reviewList: document.querySelector("#reviewList"),
  backToResultsBtn: document.querySelector("#backToResultsBtn"),
  shareScoreBtn: document.querySelector("#shareScoreBtn"),
  copyMessage: document.querySelector("#copyMessage"),
  homeLink: document.querySelector("#homeLink")
};

const difficultySettings = {
  easy: { seconds: 20, multiplier: 1 },
  medium: { seconds: 15, multiplier: 1.5 },
  hard: { seconds: 10, multiplier: 2 }
};

const state = {
  categoryId: null,
  categoryName: "",
  playerName: "Player",
  difficulty: "medium",
  questions: [],
  currentIndex: 0,
  score: 0,
  correct: 0,
  incorrect: 0,
  timedOut: 0,
  answers: [],
  timerId: null,
  timeLeft: 15,
  locked: false
};

function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
}

function getCategoryQuestionCount(categoryId) {
  return quizQuestions.filter(question => question.category === categoryId).length;
}

function renderCategories() {
  elements.categoryGrid.innerHTML = "";

  quizCategories.forEach(category => {
    const total = getCategoryQuestionCount(category.id);
    const card = document.createElement("article");
    card.className = "category-card";
    card.innerHTML = `
      <div class="category-icon">${category.icon}</div>
      <h2>${category.name}</h2>
      <p>${category.description}</p>
      <span>${total} Questions</span>
      <button class="primary-button">Start</button>
    `;

    card.querySelector("button").addEventListener("click", () => startQuiz(category));
    elements.categoryGrid.appendChild(card);
  });
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz(category) {
  const name = elements.playerName.value.trim();
  state.playerName = name || "Player";
  state.categoryId = category.id;
  state.categoryName = category.name;
  state.difficulty = elements.difficultySelect.value;
  state.questions = shuffleArray(quizQuestions.filter(question => question.category === category.id)).slice(0, 10);
  state.currentIndex = 0;
  state.score = 0;
  state.correct = 0;
  state.incorrect = 0;
  state.timedOut = 0;
  state.answers = [];
  state.locked = false;

  showScreen("quiz");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(state.timerId);
  state.locked = false;

  const question = state.questions[state.currentIndex];
  const totalQuestions = state.questions.length;
  elements.quizCategory.textContent = state.categoryName;
  elements.scoreDisplay.textContent = `${state.score}/${totalQuestions}`;
  elements.questionCounter.textContent = `Question ${state.currentIndex + 1} of ${totalQuestions}`;
  elements.difficultyBadge.textContent = `${capitalize(state.difficulty)} ×${difficultySettings[state.difficulty].multiplier}`;
  elements.progressFill.style.width = `${(state.currentIndex / totalQuestions) * 100}%`;
  elements.questionText.textContent = question.question;
  elements.answersGrid.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => handleAnswer(index));
    elements.answersGrid.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  clearInterval(state.timerId);
  state.timeLeft = difficultySettings[state.difficulty].seconds;
  updateTimerDisplay();

  state.timerId = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();

    if (state.timeLeft <= 0) {
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  elements.timerDisplay.textContent = state.timeLeft;
  elements.timerDisplay.classList.toggle("warning", state.timeLeft <= 5);
}

function handleAnswer(selectedIndex) {
  if (state.locked) return;
  state.locked = true;
  clearInterval(state.timerId);

  const question = state.questions[state.currentIndex];
  const isCorrect = selectedIndex === question.correct;

  if (isCorrect) {
    state.correct++;
    state.score += difficultySettings[state.difficulty].multiplier;
  } else {
    state.incorrect++;
  }

  saveAnswer(question, selectedIndex, isCorrect, false);
  showAnswerFeedback(selectedIndex, question.correct);
  setTimeout(moveToNextQuestion, 2000);
}

function handleTimeout() {
  if (state.locked) return;
  state.locked = true;
  clearInterval(state.timerId);

  const question = state.questions[state.currentIndex];
  state.timedOut++;
  saveAnswer(question, null, false, true);
  showAnswerFeedback(null, question.correct);
  setTimeout(moveToNextQuestion, 2000);
}

function saveAnswer(question, selectedIndex, isCorrect, timedOut) {
  state.answers.push({
    question: question.question,
    answers: question.answers,
    correctIndex: question.correct,
    selectedIndex,
    isCorrect,
    timedOut
  });
}

function showAnswerFeedback(selectedIndex, correctIndex) {
  const buttons = [...document.querySelectorAll(".answer-button")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("correct");
    if (index === selectedIndex && selectedIndex !== correctIndex) button.classList.add("wrong");
  });
}

function moveToNextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.questions.length) {
    showResults();
  } else {
    loadQuestion();
  }
}

function showResults() {
  clearInterval(state.timerId);
  const total = state.questions.length;
  const roundedScore = Math.round(state.score);
  const percentage = Math.round((state.correct / total) * 100);
  const grade = getGrade(percentage);

  elements.progressFill.style.width = "100%";
  elements.finalScore.textContent = `You scored ${state.correct}/${total}!`;
  elements.gradeBadge.textContent = grade;
  elements.gradeBadge.className = `grade-badge grade-${grade.toLowerCase()}`;
  elements.resultMessage.textContent = getPerformanceMessage(grade);
  elements.correctStat.textContent = state.correct;
  elements.incorrectStat.textContent = state.incorrect;
  elements.timeoutStat.textContent = state.timedOut;

  saveHighScore({
    name: state.playerName,
    score: roundedScore,
    rawCorrect: state.correct,
    total,
    category: state.categoryName,
    date: new Date().toLocaleDateString()
  });

  renderHighScores(elements.categoryHighScores, state.categoryName, 5);
  showScreen("results");
}

function getGrade(percentage) {
  if (percentage >= 80) return "A";
  if (percentage >= 60) return "B";
  if (percentage >= 40) return "C";
  return "F";
}

function getPerformanceMessage(grade) {
  const messages = {
    A: "Excellent work! You mastered this category.",
    B: "Great effort! A little more practice and you will be unstoppable.",
    C: "Good attempt. Review the missed answers and try again.",
    F: "Keep practicing. Every attempt improves your knowledge."
  };
  return messages[grade];
}

function renderReview() {
  elements.reviewList.innerHTML = "";

  state.answers.forEach((answer, index) => {
    const userAnswer = answer.selectedIndex === null ? "Timed out" : answer.answers[answer.selectedIndex];
    const correctAnswer = answer.answers[answer.correctIndex];
    const card = document.createElement("article");
    card.className = `review-card ${answer.isCorrect ? "review-correct" : "review-wrong"}`;
    card.innerHTML = `
      <h3>${index + 1}. ${answer.question}</h3>
      <p><strong>Your answer:</strong> <span>${userAnswer}</span></p>
      <p><strong>Correct answer:</strong> <span>${correctAnswer}</span></p>
      <p class="review-status">${answer.isCorrect ? "✓ Correct" : answer.timedOut ? "⏱ Timed out" : "✗ Incorrect"}</p>
    `;
    elements.reviewList.appendChild(card);
  });

  showScreen("review");
}

function saveHighScore(scoreEntry) {
  const scores = getHighScores();
  scores.push(scoreEntry);
  scores.sort((a, b) => b.score - a.score || b.rawCorrect - a.rawCorrect);
  localStorage.setItem("quizMasterHighScores", JSON.stringify(scores.slice(0, 10)));
}

function getHighScores() {
  const stored = localStorage.getItem("quizMasterHighScores");
  return stored ? JSON.parse(stored) : [];
}

function renderHighScores(container, categoryName = null, limit = 10) {
  const scores = getHighScores()
    .filter(score => !categoryName || score.category === categoryName)
    .slice(0, limit);

  if (scores.length === 0) {
    container.innerHTML = "<p class='empty-state'>No high scores yet. Play a quiz to set the first record.</p>";
    return;
  }

  container.innerHTML = scores.map((score, index) => `
    <div class="score-row">
      <span>${index + 1}. ${score.name}</span>
      <strong>${score.rawCorrect}/${score.total}</strong>
      <small>${score.category} • ${score.date}</small>
    </div>
  `).join("");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function shareScore() {
  const text = `I scored ${state.correct}/${state.questions.length} on QuizMaster ${state.categoryName}! Can you beat me?`;
  navigator.clipboard.writeText(text).then(() => {
    elements.copyMessage.textContent = "Copied to clipboard!";
    setTimeout(() => elements.copyMessage.textContent = "", 2000);
  });
}

function showHome() {
  clearInterval(state.timerId);
  renderHighScores(elements.homeHighScores, null, 10);
  showScreen("home");
}

renderCategories();
renderHighScores(elements.homeHighScores, null, 10);

elements.reviewBtn.addEventListener("click", renderReview);
elements.playAgainBtn.addEventListener("click", () => {
  const category = quizCategories.find(item => item.id === state.categoryId);
  startQuiz(category);
});
elements.chooseCategoryBtn.addEventListener("click", showHome);
elements.backToResultsBtn.addEventListener("click", () => showScreen("results"));
elements.highScoresBtn.addEventListener("click", () => {
  renderHighScores(elements.homeHighScores, null, 10);
  showScreen("home");
  elements.homeHighScores.scrollIntoView({ behavior: "smooth" });
});
elements.homeLink.addEventListener("click", event => {
  event.preventDefault();
  showHome();
});
elements.shareScoreBtn.addEventListener("click", shareScore);
