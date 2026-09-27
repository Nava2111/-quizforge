/**
 * QuizForge - Quiz Engine & State Machine
 * Manages test initialization, question & option randomization, timer countdowns,
 * answer preservation, question navigation palette states, and result calculations.
 */

class QuizEngine {
  constructor(options = {}) {
    this.testConfig = null;
    this.questions = [];
    this.currentIndex = 0;
    this.userAnswers = {}; // { [index]: selectedOptionString }
    this.markedForReview = new Set();
    this.visitedIndices = new Set();
    
    // Timer state
    this.totalDurationSeconds = 0;
    this.remainingSeconds = 0;
    this.timerInterval = null;
    this.startTime = null;
    this.endTime = null;
    this.isTestActive = false;

    // Callbacks
    this.onTick = options.onTick || (() => {});
    this.onTimeExpired = options.onTimeExpired || (() => {});
    this.onStateChange = options.onStateChange || (() => {});
  }

  // Fisher-Yates shuffle algorithm
  static shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Initialize and start a test
  startTest(testConfig) {
    if (!testConfig) {
      throw new Error("No test configuration provided to QuizEngine.");
    }

    this.testConfig = testConfig;
    const rawQuestions = window.QUESTION_BANK[testConfig.category] || [];

    if (rawQuestions.length === 0) {
      throw new Error(`No questions found for category: ${testConfig.category}`);
    }

    // Clone and randomize questions
    const shuffledQuestions = QuizEngine.shuffleArray(rawQuestions);
    
    // Limit to questionCount if specified, else take all
    const selectedSlice = testConfig.questionCount 
      ? shuffledQuestions.slice(0, testConfig.questionCount) 
      : shuffledQuestions;

    // Deep clone and randomize options for each question
    this.questions = selectedSlice.map((q, idx) => {
      const shuffledOptions = QuizEngine.shuffleArray(q.options);
      return {
        ...q,
        index: idx,
        options: shuffledOptions
      };
    });

    this.currentIndex = 0;
    this.userAnswers = {};
    this.markedForReview = new Set();
    this.visitedIndices = new Set([0]);

    // Setup timer
    this.totalDurationSeconds = (testConfig.durationMinutes || 15) * 60;
    this.remainingSeconds = this.totalDurationSeconds;
    this.startTime = Date.now();
    this.endTime = null;
    this.isTestActive = true;

    this.startTimer();
    this.notifyState();
  }

  // Timer controls
  startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (!this.isTestActive) return;

      this.remainingSeconds--;
      const formatted = this.getFormattedTime(this.remainingSeconds);
      const isUrgent = this.remainingSeconds <= 120; // 2 minutes or less
      const percentRemaining = (this.remainingSeconds / this.totalDurationSeconds) * 100;

      this.onTick({
        remainingSeconds: this.remainingSeconds,
        formattedTime: formatted,
        isUrgent,
        percentRemaining
      });

      if (this.remainingSeconds <= 0) {
        this.clearTimer();
        this.isTestActive = false;
        this.endTime = Date.now();
        this.onTimeExpired();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getFormattedTime(totalSec) {
    if (totalSec < 0) totalSec = 0;
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  // Navigation
  goToQuestion(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      this.visitedIndices.add(index);
      this.notifyState();
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.goToQuestion(this.currentIndex + 1);
    }
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.goToQuestion(this.currentIndex - 1);
    }
  }

  // Answering & Marking
  selectOption(optionText) {
    if (!this.isTestActive) return;
    this.userAnswers[this.currentIndex] = optionText;
    this.notifyState();
  }

  clearCurrentAnswer() {
    if (!this.isTestActive) return;
    delete this.userAnswers[this.currentIndex];
    this.notifyState();
  }

  toggleMarkForReview() {
    if (!this.isTestActive) return;
    if (this.markedForReview.has(this.currentIndex)) {
      this.markedForReview.delete(this.currentIndex);
    } else {
      this.markedForReview.add(this.currentIndex);
    }
    this.notifyState();
  }

  // Get current status of a specific question for palette rendering
  getQuestionStatus(index) {
    const isCurrent = index === this.currentIndex;
    const isAnswered = this.userAnswers[index] !== undefined && this.userAnswers[index] !== null;
    const isMarked = this.markedForReview.has(index);
    const isVisited = this.visitedIndices.has(index);

    if (isMarked && isAnswered) return "marked-answered";
    if (isMarked) return "marked";
    if (isAnswered) return "answered";
    if (isVisited) return "unanswered";
    return "not-visited";
  }

  // Palette counts summary
  getPaletteSummary() {
    let answered = 0;
    let marked = 0;
    let markedAnswered = 0;
    let unanswered = 0;
    let notVisited = 0;

    for (let i = 0; i < this.questions.length; i++) {
      const status = this.getQuestionStatus(i);
      if (status === "answered") answered++;
      else if (status === "marked") marked++;
      else if (status === "marked-answered") markedAnswered++;
      else if (status === "unanswered") unanswered++;
      else notVisited++;
    }

    return {
      answered: answered + markedAnswered,
      pureAnswered: answered,
      marked,
      markedAnswered,
      unanswered: unanswered + notVisited,
      pureUnanswered: unanswered,
      notVisited,
      total: this.questions.length
    };
  }

  // Complete and calculate final results
  finishTest() {
    this.clearTimer();
    this.isTestActive = false;
    this.endTime = Date.now();

    const timeSpentSeconds = Math.max(1, this.totalDurationSeconds - this.remainingSeconds);
    const timeMins = Math.floor(timeSpentSeconds / 60);
    const timeSecs = timeSpentSeconds % 60;
    const timeFormatted = `${String(timeMins).padStart(2, "0")}m ${String(timeSecs).padStart(2, "0")}s`;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const detailedQuestions = this.questions.map((q, idx) => {
      const selectedOption = this.userAnswers[idx] || null;
      const isAnswered = selectedOption !== null;
      const isCorrect = isAnswered && selectedOption === q.answer;

      if (!isAnswered) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      return {
        id: q.id,
        category: q.category,
        question: q.question,
        options: q.options,
        selectedAnswer: selectedOption,
        correctAnswer: q.answer,
        isCorrect,
        isAnswered,
        isMarked: this.markedForReview.has(idx),
        explanation: q.explanation,
        difficulty: q.difficulty
      };
    });

    const totalQuestions = this.questions.length;
    const answeredCount = correctCount + incorrectCount;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    const attemptResult = {
      testId: this.testConfig.id,
      testTitle: this.testConfig.title,
      category: this.testConfig.category,
      difficulty: this.testConfig.difficulty,
      totalQuestions,
      answeredCount,
      unansweredCount,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      score: correctCount,
      maxScore: totalQuestions,
      percentage,
      accuracy,
      timeSpentSeconds,
      timeFormatted,
      questions: detailedQuestions
    };

    // Save to localStorage via StorageManager
    const savedAttempt = window.StorageManager.saveAttempt(attemptResult);

    return savedAttempt || attemptResult;
  }

  notifyState() {
    const currentQ = this.questions[this.currentIndex] || null;
    this.onStateChange({
      currentIndex: this.currentIndex,
      currentQuestion: currentQ,
      selectedAnswer: this.userAnswers[this.currentIndex] || null,
      isMarked: this.markedForReview.has(this.currentIndex),
      totalQuestions: this.questions.length,
      isFirst: this.currentIndex === 0,
      isLast: this.currentIndex === this.questions.length - 1,
      paletteSummary: this.getPaletteSummary()
    });
  }
}

// Export to window
if (typeof window !== "undefined") {
  window.QuizEngine = QuizEngine;
}
