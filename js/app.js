/**
 * QuizForge - Main Application Controller & UI Coordinator
 * Handles view routing, dynamic catalog rendering, user interactions,
 * audio FX synthesizer, JSON export/import, keyboard shortcuts, modals, and result animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    currentView: "dashboard",
    activeEngine: null,
    currentTestConfig: null,
    lastCompletedAttempt: null,
    reviewActiveAttempt: null,
    reviewFilter: "all",
    soundEnabled: true
  };

  // Web Audio Synthesizer for UI sound effects
  const AudioEngine = (() => {
    let audioCtx = null;

    const initAudio = () => {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
    };

    const playClick = () => {
      if (!state.soundEnabled) return;
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    };

    const playSuccess = () => {
      if (!state.soundEnabled) return;
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.2);
      });
    };

    const playUrgentTick = () => {
      if (!state.soundEnabled) return;
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    };

    return { playClick, playSuccess, playUrgentTick };
  })();

  // DOM Elements - Navigation & Views
  const views = {
    dashboard: document.getElementById("view-dashboard"),
    catalog: document.getElementById("view-catalog"),
    quiz: document.getElementById("view-quiz"),
    results: document.getElementById("view-results"),
    review: document.getElementById("view-review"),
    history: document.getElementById("view-history")
  };

  const navLinks = document.querySelectorAll("#main-nav .nav-link");
  const brandLink = document.getElementById("brand-link");
  const headerExploreBtn = document.getElementById("header-explore-btn");
  const btnToggleSound = document.getElementById("btn-toggle-sound");
  const soundIconOn = document.getElementById("sound-icon-on");
  const soundIconOff = document.getElementById("sound-icon-off");
  const soundStatusLabel = document.getElementById("sound-status-label");

  // Dashboard DOM Elements
  const statTotalTests = document.getElementById("stat-total-tests");
  const statCompletedTests = document.getElementById("stat-completed-tests");
  const statAvgScore = document.getElementById("stat-avg-score");
  const statBestScore = document.getElementById("stat-best-score");
  const statTotalQuestions = document.getElementById("stat-total-questions");
  const statAvgAccuracy = document.getElementById("stat-avg-accuracy");
  const dashCategoryMastery = document.getElementById("dash-category-mastery");
  const dashFeaturedGrid = document.getElementById("dash-featured-grid");
  const dashRecentAttemptsContainer = document.getElementById("dash-recent-attempts-container");
  const dashStartBtn = document.getElementById("dash-start-btn");
  const dashCustomTestBtn = document.getElementById("dash-custom-test-btn");
  const dashViewHistoryBtn = document.getElementById("dash-view-history-btn");
  const dashSeeAllTests = document.getElementById("dash-see-all-tests");
  const dashOpenHistoryBtn = document.getElementById("dash-open-history-btn");

  // Catalog DOM Elements
  const catalogFullGrid = document.getElementById("catalog-full-grid");
  const catalogSearchInput = document.getElementById("catalog-search-input");
  const catalogCategoryFilter = document.getElementById("catalog-category-filter");
  const catalogDifficultyFilter = document.getElementById("catalog-difficulty-filter");

  // Quiz DOM Elements
  const activeQuizTitle = document.getElementById("active-quiz-title");
  const activeQuizCategory = document.getElementById("active-quiz-category");
  const activeQuizTimer = document.getElementById("active-quiz-timer");
  const activeQuizTimerWrap = document.getElementById("active-quiz-timer-wrap");
  const quizProgressFill = document.getElementById("quiz-progress-fill");
  const qNumberBadge = document.getElementById("q-number-badge");
  const qDifficultyTag = document.getElementById("q-difficulty-tag");
  const qTextContent = document.getElementById("q-text-content");
  const qOptionsContainer = document.getElementById("q-options-container");
  const btnPrevQuestion = document.getElementById("btn-prev-question");
  const btnNextQuestion = document.getElementById("btn-next-question");
  const btnMarkReview = document.getElementById("btn-mark-review");
  const btnClearChoice = document.getElementById("btn-clear-choice");
  const btnQuitQuiz = document.getElementById("btn-quit-quiz");
  const btnSubmitTest = document.getElementById("btn-submit-test");
  const paletteMatrix = document.getElementById("palette-matrix");
  const palCountAns = document.getElementById("pal-count-ans");
  const palCountUnans = document.getElementById("pal-count-unans");
  const palCountRev = document.getElementById("pal-count-rev");
  const palCountRevans = document.getElementById("pal-count-revans");

  // Results DOM Elements
  const resultGaugeFill = document.getElementById("result-gauge-fill");
  const resScorePercent = document.getElementById("res-score-percent");
  const resScoreFraction = document.getElementById("res-score-fraction");
  const resStatusTitle = document.getElementById("res-status-title");
  const resStatusDesc = document.getElementById("res-status-desc");
  const resAccuracyVal = document.getElementById("res-accuracy-val");
  const resCorrectVal = document.getElementById("res-correct-val");
  const resIncorrectVal = document.getElementById("res-incorrect-val");
  const resUnansweredVal = document.getElementById("res-unanswered-val");
  const resTimeVal = document.getElementById("res-time-val");
  const resTotalVal = document.getElementById("res-total-val");
  const btnResReview = document.getElementById("btn-res-review");
  const btnResRetake = document.getElementById("btn-res-retake");
  const btnResDashboard = document.getElementById("btn-res-dashboard");

  // Review DOM Elements
  const revPageTitle = document.getElementById("rev-page-title");
  const revPageSubtitle = document.getElementById("rev-page-subtitle");
  const reviewCardsList = document.getElementById("review-cards-list");
  const btnReviewBackResults = document.getElementById("btn-review-back-results");
  const reviewTabs = document.querySelectorAll(".review-tab");
  const revCntAll = document.getElementById("rev-cnt-all");
  const revCntCorrect = document.getElementById("rev-cnt-correct");
  const revCntIncorrect = document.getElementById("rev-cnt-incorrect");
  const revCntUnanswered = document.getElementById("rev-cnt-unanswered");

  // History DOM Elements
  const historyTableWrapper = document.getElementById("history-table-wrapper");
  const historyTableBody = document.getElementById("history-table-body");
  const historyEmptyState = document.getElementById("history-empty-state");
  const historySearchInput = document.getElementById("history-search-input");
  const historyCategoryFilter = document.getElementById("history-category-filter");
  const btnExportHistory = document.getElementById("btn-export-history");
  const btnImportHistoryTrigger = document.getElementById("btn-import-history-trigger");
  const fileImportHistory = document.getElementById("file-import-history");
  const btnClearAllHistory = document.getElementById("btn-clear-all-history");
  const btnHistoryEmptyStart = document.getElementById("btn-history-empty-start");

  // Modals DOM Elements
  const modalCustomTest = document.getElementById("modal-custom-test");
  const customCatSelect = document.getElementById("custom-cat-select");
  const customCountSelect = document.getElementById("custom-count-select");
  const customDurationSelect = document.getElementById("custom-duration-select");
  const modalCustomCancel = document.getElementById("modal-custom-cancel");
  const modalCustomStartBtn = document.getElementById("modal-custom-start-btn");

  const modalSubmitConfirm = document.getElementById("modal-submit-confirm");
  const modalSubmitStatsText = document.getElementById("modal-submit-stats-text");
  const modalSubmitCancel = document.getElementById("modal-submit-cancel");
  const modalSubmitConfirmBtn = document.getElementById("modal-submit-confirm-btn");

  const modalQuitConfirm = document.getElementById("modal-quit-confirm");
  const modalQuitCancel = document.getElementById("modal-quit-cancel");
  const modalQuitConfirmBtn = document.getElementById("modal-quit-confirm-btn");

  const modalClearHistory = document.getElementById("modal-clear-history");
  const modalClearCancel = document.getElementById("modal-clear-cancel");
  const modalClearConfirmBtn = document.getElementById("modal-clear-confirm-btn");

  const modalTimeExpired = document.getElementById("modal-time-expired");
  const modalTimeExpiredBtn = document.getElementById("modal-time-expired-btn");

  const toastContainer = document.getElementById("toast-container");

  /* =========================================================================
     TOAST NOTIFICATIONS & SOUND TOGGLE
     ========================================================================= */
  const showToast = (message, type = "info") => {
    const toast = document.createElement("div");
    toast.className = "toast";

    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === "warning") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 250ms ease";
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  };

  btnToggleSound.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    soundIconOn.style.display = state.soundEnabled ? "block" : "none";
    soundIconOff.style.display = state.soundEnabled ? "none" : "block";
    soundStatusLabel.textContent = state.soundEnabled ? "Sound" : "Muted";
    showToast(state.soundEnabled ? "Sound Effects Enabled" : "Sound Effects Muted", "info");
  });

  /* =========================================================================
     VIEW ROUTING & SWITCHING
     ========================================================================= */
  const switchView = (targetViewName) => {
    // If navigating away from active quiz, ask confirmation
    if (state.currentView === "quiz" && targetViewName !== "quiz" && state.activeEngine && state.activeEngine.isTestActive) {
      openModal(modalQuitConfirm);
      return;
    }

    Object.keys(views).forEach((key) => {
      if (views[key]) {
        views[key].classList.toggle("active-view", key === targetViewName);
      }
    });

    state.currentView = targetViewName;

    // Update Header active nav
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-target") === targetViewName);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Refresh view specific data
    if (targetViewName === "dashboard") {
      refreshDashboard();
    } else if (targetViewName === "catalog") {
      renderCatalogGrid();
    } else if (targetViewName === "history") {
      renderHistoryView();
    }
  };

  // Nav link click events
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      AudioEngine.playClick();
      const target = link.getAttribute("data-target");
      switchView(target);
    });
  });

  brandLink.addEventListener("click", () => { AudioEngine.playClick(); switchView("dashboard"); });
  headerExploreBtn.addEventListener("click", () => { AudioEngine.playClick(); switchView("catalog"); });
  dashStartBtn.addEventListener("click", () => { AudioEngine.playClick(); switchView("catalog"); });
  dashCustomTestBtn.addEventListener("click", () => { AudioEngine.playClick(); openModal(modalCustomTest); });
  dashViewHistoryBtn.addEventListener("click", () => { AudioEngine.playClick(); switchView("history"); });
  dashSeeAllTests.addEventListener("click", () => { AudioEngine.playClick(); switchView("catalog"); });
  dashOpenHistoryBtn.addEventListener("click", () => { AudioEngine.playClick(); switchView("history"); });
  btnHistoryEmptyStart.addEventListener("click", () => { AudioEngine.playClick(); switchView("catalog"); });

  /* =========================================================================
     DASHBOARD REFRESH & STATS CALCULATION
     ========================================================================= */
  const refreshDashboard = () => {
    const stats = window.StorageManager.calculateDashboardStats();

    statTotalTests.textContent = stats.totalTests;
    statCompletedTests.textContent = stats.testsCompleted;
    statAvgScore.textContent = `${stats.averageScore}%`;
    statBestScore.textContent = `${stats.bestScore}%`;
    statTotalQuestions.textContent = stats.totalQuestionsAttempted;
    statAvgAccuracy.textContent = `${stats.averageAccuracy}%`;

    // Render Subject Mastery Progress Cards
    renderCategoryMastery(stats.categoryStats);

    // Render Featured Tests (first 3)
    renderFeaturedCards();

    // Render Recent Attempts preview
    renderRecentAttempts(stats.recentAttempts);
  };

  const renderCategoryMastery = (catStats) => {
    dashCategoryMastery.innerHTML = "";

    const categories = window.TEST_CONFIGS.map(c => c.category);
    categories.forEach((catName) => {
      const item = catStats[catName] || { attempts: 0, averageScore: 0, accuracy: 0 };
      const card = document.createElement("div");
      card.className = "mastery-card";
      card.innerHTML = `
        <div class="mastery-card-top">
          <span class="mastery-title">${catName}</span>
          <span class="mastery-val">${item.attempts > 0 ? `${item.averageScore}% Avg` : 'Not Attempted'}</span>
        </div>
        <div class="mastery-bar-wrap">
          <div class="mastery-bar-fill" style="width: ${item.averageScore}%;"></div>
        </div>
      `;
      dashCategoryMastery.appendChild(card);
    });
  };

  const getCategoryIconSvg = (iconName) => {
    const icons = {
      code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      "git-merge": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>`,
      terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
      coffee: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
      database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
      bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>`,
      zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
    };
    return icons[iconName] || icons.code;
  };

  const renderFeaturedCards = () => {
    const featured = window.TEST_CONFIGS.slice(0, 3);
    dashFeaturedGrid.innerHTML = "";

    featured.forEach((test) => {
      const card = createTestCardElement(test);
      dashFeaturedGrid.appendChild(card);
    });
  };

  const renderRecentAttempts = (attempts) => {
    if (!attempts || attempts.length === 0) {
      dashRecentAttemptsContainer.innerHTML = `
        <div class="empty-state" style="padding: 2.5rem 1.5rem;">
          <svg class="empty-icon" style="width: 44px; height: 44px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <h3 style="font-size: 1.1rem; margin-bottom: 0.35rem;">No Recent Attempts</h3>
          <p style="font-size: 0.85rem; margin-bottom: 1rem;">Complete your first mock test above to view detailed score trends.</p>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('dash-start-btn').click()">Select a Test</button>
        </div>
      `;
      return;
    }

    let rowsHtml = attempts.slice(0, 4).map((att) => {
      let badgeClass = "low";
      if (att.percentage >= 75) badgeClass = "high";
      else if (att.percentage >= 50) badgeClass = "mid";

      return `
        <tr>
          <td>
            <strong>${att.testTitle}</strong>
            <br><span style="font-size: 0.75rem; color: var(--text-muted);">${att.category}</span>
          </td>
          <td>${att.dateFormatted}</td>
          <td><span class="history-score-badge ${badgeClass}">${att.score} / ${att.maxScore}</span></td>
          <td><strong>${att.percentage}%</strong></td>
          <td>${att.accuracy}%</td>
          <td>${att.timeFormatted}</td>
          <td>
            <button class="btn btn-secondary btn-sm btn-open-attempt-review" data-attempt-id="${att.id}">
              Review
            </button>
          </td>
        </tr>
      `;
    }).join("");

    dashRecentAttemptsContainer.innerHTML = `
      <div class="history-table-card">
        <table class="history-table">
          <thead>
            <tr>
              <th>Test & Category</th>
              <th>Date</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Accuracy</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;

    // Attach review handlers
    dashRecentAttemptsContainer.querySelectorAll(".btn-open-attempt-review").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioEngine.playClick();
        const id = btn.getAttribute("data-attempt-id");
        const attempt = window.StorageManager.getAttemptById(id);
        if (attempt) {
          openReviewView(attempt);
        }
      });
    });
  };

  /* =========================================================================
     CATALOG VIEW RENDERING & FILTERING
     ========================================================================= */
  const createTestCardElement = (test) => {
    const card = document.createElement("div");
    card.className = "test-card";

    const diffClass = test.difficulty.toLowerCase();

    card.innerHTML = `
      <div>
        <div class="test-card-top">
          <div class="test-card-icon" style="color: ${test.color};">
            ${getCategoryIconSvg(test.icon)}
          </div>
          <span class="test-badge ${diffClass}">${test.difficulty}</span>
        </div>
        <h3>${test.title}</h3>
        <p>${test.description}</p>
        <div class="test-meta-pills">
          <span class="meta-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            ${test.questionCount || 15} Questions
          </span>
          <span class="meta-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${test.durationMinutes} Minutes
          </span>
          <span class="meta-pill" style="color: #60a5fa;">
            ${test.category}
          </span>
        </div>
      </div>
      <button class="btn btn-primary btn-start-test-direct" data-test-id="${test.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Start Mock Test
      </button>
    `;

    card.querySelector(".btn-start-test-direct").addEventListener("click", () => {
      AudioEngine.playClick();
      startQuizSession(test);
    });

    return card;
  };

  const renderCatalogGrid = () => {
    const query = (catalogSearchInput.value || "").toLowerCase().trim();
    const category = catalogCategoryFilter.value;
    const difficulty = catalogDifficultyFilter.value;

    const filtered = window.TEST_CONFIGS.filter((test) => {
      const matchQuery = !query || 
        test.title.toLowerCase().includes(query) || 
        test.description.toLowerCase().includes(query) ||
        test.category.toLowerCase().includes(query);

      const matchCategory = category === "ALL" || test.category === category;
      const matchDifficulty = difficulty === "ALL" || test.difficulty.toLowerCase() === difficulty.toLowerCase();

      return matchQuery && matchCategory && matchDifficulty;
    });

    catalogFullGrid.innerHTML = "";

    if (filtered.length === 0) {
      catalogFullGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3>No Matching Tests Found</h3>
          <p>Try adjusting your search keywords or resetting the category and difficulty filters.</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("btn-reset-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          catalogSearchInput.value = "";
          catalogCategoryFilter.value = "ALL";
          catalogDifficultyFilter.value = "ALL";
          renderCatalogGrid();
        });
      }
      return;
    }

    filtered.forEach((test) => {
      catalogFullGrid.appendChild(createTestCardElement(test));
    });
  };

  catalogSearchInput.addEventListener("input", renderCatalogGrid);
  catalogCategoryFilter.addEventListener("change", renderCatalogGrid);
  catalogDifficultyFilter.addEventListener("change", renderCatalogGrid);

  // Custom Exam Start
  modalCustomStartBtn.addEventListener("click", () => {
    const selectedCat = customCatSelect.value;
    const count = parseInt(customCountSelect.value, 10);
    const duration = parseInt(customDurationSelect.value, 10);

    closeModal(modalCustomTest);

    if (selectedCat === "MIXED") {
      // Gather pool of all questions across all categories
      const allQuestions = [];
      Object.keys(window.QUESTION_BANK).forEach(cat => {
        allQuestions.push(...window.QUESTION_BANK[cat]);
      });

      const customConfig = {
        id: "custom-mixed",
        category: "Full Stack CS (Mixed)",
        title: "Full Stack CS Custom Assessment",
        description: "Custom mixed exam spanning all computer science categories.",
        durationMinutes: duration,
        difficulty: "Medium",
        questionCount: count
      };

      // Temporarily register pool
      window.QUESTION_BANK["Full Stack CS (Mixed)"] = allQuestions;

      startQuizSession(customConfig);
    } else {
      const baseConfig = window.TEST_CONFIGS.find(c => c.category === selectedCat) || window.TEST_CONFIGS[0];
      const customConfig = {
        ...baseConfig,
        id: "custom-" + baseConfig.id,
        title: `Custom ${baseConfig.category} Mock Exam`,
        durationMinutes: duration,
        questionCount: count
      };

      startQuizSession(customConfig);
    }
  });

  modalCustomCancel.addEventListener("click", () => closeModal(modalCustomTest));

  /* =========================================================================
     ACTIVE QUIZ ENGINE INITIALIZATION & INTERACTIONS
     ========================================================================= */
  const startQuizSession = (testConfig) => {
    state.currentTestConfig = testConfig;

    // Instantiate Quiz Engine
    state.activeEngine = new window.QuizEngine({
      onTick: (timerData) => {
        activeQuizTimer.textContent = timerData.formattedTime;
        activeQuizTimerWrap.classList.toggle("urgent", timerData.isUrgent);
        if (timerData.isUrgent && timerData.remainingSeconds % 10 === 0) {
          AudioEngine.playUrgentTick();
        }
      },
      onTimeExpired: () => {
        handleTimeExpiredSubmission();
      },
      onStateChange: (engineState) => {
        renderQuizQuestion(engineState);
        renderQuizPalette(engineState);
      }
    });

    // Start test runtime
    try {
      state.activeEngine.startTest(testConfig);
      
      activeQuizTitle.textContent = testConfig.title;
      activeQuizCategory.textContent = `Category: ${testConfig.category} • ${testConfig.durationMinutes} Min Test`;
      
      switchView("quiz");
      showToast(`Started ${testConfig.title}. Good luck!`, "info");
    } catch (e) {
      console.error(e);
      showToast("Error starting quiz session: " + e.message, "warning");
    }
  };

  // Render question content, options and navigation state
  const renderQuizQuestion = (engineState) => {
    const q = engineState.currentQuestion;
    if (!q) return;

    // Progress Bar and Badges
    const currentNum = engineState.currentIndex + 1;
    const total = engineState.totalQuestions;
    const progressPercent = Math.round((currentNum / total) * 100);

    qNumberBadge.textContent = `Question ${currentNum} of ${total}`;
    qDifficultyTag.textContent = `${q.difficulty || "Medium"} Difficulty`;
    quizProgressFill.style.width = `${progressPercent}%`;

    // Question content (escaped HTML formatting for code blocks)
    qTextContent.innerHTML = formatCodeAndMarkdown(q.question);

    // Options rendering
    qOptionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D", "E", "F"];

    q.options.forEach((optText, optIdx) => {
      const optionItem = document.createElement("div");
      const isSelected = engineState.selectedAnswer === optText;

      optionItem.className = `option-item ${isSelected ? "selected" : ""}`;
      optionItem.innerHTML = `
        <div class="option-radio"></div>
        <span class="option-letter">${letters[optIdx]}.</span>
        <span class="option-text">${formatCodeAndMarkdown(optText)}</span>
      `;

      optionItem.addEventListener("click", () => {
        AudioEngine.playClick();
        state.activeEngine.selectOption(optText);
      });

      qOptionsContainer.appendChild(optionItem);
    });

    // Navigation Buttons State
    btnPrevQuestion.disabled = engineState.isFirst;
    btnNextQuestion.innerHTML = engineState.isLast 
      ? `Finish Review <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>` 
      : `Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;

    // Mark For Review Button State
    btnMarkReview.classList.toggle("is-marked", engineState.isMarked);
    btnMarkReview.innerHTML = engineState.isMarked
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Marked for Review`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Mark for Review`;
  };

  // Render question palette numbers grid
  const renderQuizPalette = (engineState) => {
    paletteMatrix.innerHTML = "";
    const total = engineState.totalQuestions;

    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");
      const status = state.activeEngine.getQuestionStatus(i);
      const isCurrent = i === engineState.currentIndex;

      btn.className = `palette-btn status-${status} ${isCurrent ? "is-current" : ""}`;
      btn.textContent = i + 1;
      btn.title = `Jump to Question ${i + 1} (${status.replace("-", " ")})`;

      btn.addEventListener("click", () => {
        AudioEngine.playClick();
        state.activeEngine.goToQuestion(i);
      });

      paletteMatrix.appendChild(btn);
    }

    // Update Palette Header Summary Badges
    const summary = engineState.paletteSummary;
    palCountAns.textContent = summary.pureAnswered;
    palCountUnans.textContent = summary.unanswered;
    palCountRev.textContent = summary.marked;
    palCountRevans.textContent = summary.markedAnswered;
  };

  // Helper formatting for inline code and markdown ticks
  const formatCodeAndMarkdown = (text) => {
    if (!text) return "";
    let safe = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code blocks ```code```
    safe = safe.replace(/```([a-zA-Z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Inline `code`
    safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Bold **text**
    safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

    return safe;
  };

  // Button Action Listeners inside Quiz
  btnPrevQuestion.addEventListener("click", () => {
    AudioEngine.playClick();
    if (state.activeEngine) state.activeEngine.previousQuestion();
  });

  btnNextQuestion.addEventListener("click", () => {
    AudioEngine.playClick();
    if (!state.activeEngine) return;
    if (state.activeEngine.currentIndex === state.activeEngine.questions.length - 1) {
      promptSubmitConfirmation();
    } else {
      state.activeEngine.nextQuestion();
    }
  });

  btnMarkReview.addEventListener("click", () => {
    AudioEngine.playClick();
    if (state.activeEngine) state.activeEngine.toggleMarkForReview();
  });

  btnClearChoice.addEventListener("click", () => {
    AudioEngine.playClick();
    if (state.activeEngine) {
      state.activeEngine.clearCurrentAnswer();
      showToast("Choice cleared for current question.", "info");
    }
  });

  btnQuitQuiz.addEventListener("click", () => {
    AudioEngine.playClick();
    openModal(modalQuitConfirm);
  });

  btnSubmitTest.addEventListener("click", () => {
    AudioEngine.playClick();
    promptSubmitConfirmation();
  });

  // Prompt Submit Modal
  const promptSubmitConfirmation = () => {
    if (!state.activeEngine) return;
    const summary = state.activeEngine.getPaletteSummary();
    
    modalSubmitStatsText.innerHTML = `
      You have answered <strong>${summary.answered}</strong> out of <strong>${summary.total}</strong> questions.
      <br><span style="color: ${summary.unanswered > 0 ? '#f87171' : '#34d399'};">
        ${summary.unanswered} question${summary.unanswered === 1 ? '' : 's'} remain unanswered.
      </span>
      <br><span style="color: #c084fc;">
        ${summary.marked + summary.markedAnswered} marked for review.
      </span>
      <br><br>Are you sure you want to finish and view your results?
    `;

    openModal(modalSubmitConfirm);
  };

  // Submit Confirm Action
  modalSubmitConfirmBtn.addEventListener("click", () => {
    closeModal(modalSubmitConfirm);
    finalizeTestSubmission();
  });

  // Auto-submit on Time Expired
  const handleTimeExpiredSubmission = () => {
    openModal(modalTimeExpired);
  };

  modalTimeExpiredBtn.addEventListener("click", () => {
    closeModal(modalTimeExpired);
    finalizeTestSubmission();
  });

  // Finalize Submission
  const finalizeTestSubmission = () => {
    if (!state.activeEngine) return;

    const attemptResult = state.activeEngine.finishTest();
    state.lastCompletedAttempt = attemptResult;
    state.activeEngine = null;

    AudioEngine.playSuccess();
    showToast("Test successfully submitted!", "success");
    renderResultsView(attemptResult);
    switchView("results");
  };

  /* =========================================================================
     RESULT VIEW & CIRCULAR GAUGE ANIMATION
     ========================================================================= */
  const renderResultsView = (attempt) => {
    if (!attempt) return;

    // Animate Circular Gauge
    const radius = 70;
    const circumference = 2 * Math.PI * radius; // ~439.82
    resultGaugeFill.style.strokeDasharray = `${circumference}`;
    resultGaugeFill.style.strokeDashoffset = `${circumference}`;

    // Status titles based on percentage
    const pct = attempt.percentage;
    resScorePercent.textContent = `${pct}%`;
    resScoreFraction.textContent = `${attempt.score} / ${attempt.maxScore} Score`;

    if (pct >= 80) {
      resStatusTitle.textContent = "Outstanding Performance!";
      resStatusTitle.style.color = "#34d399";
      resStatusDesc.textContent = `Phenomenal mastery in ${attempt.category}. You are well prepared for technical interviews!`;
      resultGaugeFill.style.stroke = "var(--success)";
    } else if (pct >= 60) {
      resStatusTitle.textContent = "Solid Technical Effort!";
      resStatusTitle.style.color = "#60a5fa";
      resStatusDesc.textContent = `Good competency demonstrated in ${attempt.category}. Review incorrect questions to reach mastery.`;
      resultGaugeFill.style.stroke = "var(--primary)";
    } else if (pct >= 40) {
      resStatusTitle.textContent = "Average - Needs Reinforcement";
      resStatusTitle.style.color = "#fbbf24";
      resStatusDesc.textContent = `Decent foundation, but several core concepts require revision before assessment.`;
      resultGaugeFill.style.stroke = "var(--warning)";
    } else {
      resStatusTitle.textContent = "Needs Focused Improvement";
      resStatusTitle.style.color = "#f87171";
      resStatusDesc.textContent = `Strengthen your fundamentals in ${attempt.category} and reattempt this test.`;
      resultGaugeFill.style.stroke = "var(--danger)";
    }

    // Trigger stroke offset animation
    setTimeout(() => {
      const offset = circumference - (pct / 100) * circumference;
      resultGaugeFill.style.strokeDashoffset = offset;
    }, 150);

    // Metrics
    resAccuracyVal.textContent = `${attempt.accuracy}%`;
    resCorrectVal.textContent = attempt.correctAnswers;
    resIncorrectVal.textContent = attempt.incorrectAnswers;
    resUnansweredVal.textContent = attempt.unansweredCount;
    resTimeVal.textContent = attempt.timeFormatted;
    resTotalVal.textContent = attempt.totalQuestions;
  };

  btnResReview.addEventListener("click", () => {
    AudioEngine.playClick();
    if (state.lastCompletedAttempt) {
      openReviewView(state.lastCompletedAttempt);
    }
  });

  btnResRetake.addEventListener("click", () => {
    AudioEngine.playClick();
    if (state.currentTestConfig) {
      startQuizSession(state.currentTestConfig);
    } else if (state.lastCompletedAttempt) {
      const config = window.TEST_CONFIGS.find((c) => c.category === state.lastCompletedAttempt.category) || window.TEST_CONFIGS[0];
      startQuizSession(config);
    }
  });

  btnResDashboard.addEventListener("click", () => {
    AudioEngine.playClick();
    switchView("dashboard");
  });

  /* =========================================================================
     ANSWER REVIEW VIEW
     ========================================================================= */
  const openReviewView = (attempt) => {
    state.reviewActiveAttempt = attempt;
    state.reviewFilter = "all";

    revPageTitle.textContent = `Review: ${attempt.testTitle}`;
    revPageSubtitle.textContent = `Completed on ${attempt.dateFormatted} • Score: ${attempt.score}/${attempt.maxScore} (${attempt.percentage}%)`;

    // Update filter counts
    const correctCount = attempt.questions.filter((q) => q.isCorrect).length;
    const incorrectCount = attempt.questions.filter((q) => q.isAnswered && !q.isCorrect).length;
    const unansweredCount = attempt.questions.filter((q) => !q.isAnswered).length;

    revCntAll.textContent = attempt.questions.length;
    revCntCorrect.textContent = correctCount;
    revCntIncorrect.textContent = incorrectCount;
    revCntUnanswered.textContent = unansweredCount;

    // Reset tab active
    reviewTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.getAttribute("data-review-filter") === "all");
    });

    renderReviewList();
    switchView("review");
  };

  const renderReviewList = () => {
    const attempt = state.reviewActiveAttempt;
    if (!attempt || !attempt.questions) return;

    const filter = state.reviewFilter;
    const filteredQuestions = attempt.questions.filter((q) => {
      if (filter === "correct") return q.isCorrect;
      if (filter === "incorrect") return q.isAnswered && !q.isCorrect;
      if (filter === "unanswered") return !q.isAnswered;
      return true;
    });

    reviewCardsList.innerHTML = "";

    if (filteredQuestions.length === 0) {
      reviewCardsList.innerHTML = `
        <div class="empty-state" style="padding: 2.5rem 1.5rem;">
          <h3>No Questions Match Filter</h3>
          <p>There are no questions in this category (${filter}).</p>
        </div>
      `;
      return;
    }

    filteredQuestions.forEach((q, idx) => {
      const card = document.createElement("div");
      let statusClass = "is-unanswered";
      let badgeHtml = `<span class="review-status-badge unanswered">Unanswered</span>`;

      if (q.isAnswered) {
        if (q.isCorrect) {
          statusClass = "is-correct";
          badgeHtml = `<span class="review-status-badge correct"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Correct</span>`;
        } else {
          statusClass = "is-incorrect";
          badgeHtml = `<span class="review-status-badge incorrect"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Incorrect</span>`;
        }
      }

      const letters = ["A", "B", "C", "D", "E", "F"];
      let optionsHtml = q.options.map((opt, optIdx) => {
        const isUserChoice = q.selectedAnswer === opt;
        const isTargetCorrect = q.correctAnswer === opt;

        let rowClass = "";
        let checkTag = "";

        if (isUserChoice && isTargetCorrect) {
          rowClass = "is-user-correct";
          checkTag = `<strong style="margin-left: auto; color: #34d399; font-size: 0.8rem;">✓ Your Choice (Correct)</strong>`;
        } else if (isUserChoice && !isTargetCorrect) {
          rowClass = "is-user-wrong";
          checkTag = `<strong style="margin-left: auto; color: #f87171; font-size: 0.8rem;">✗ Your Choice (Wrong)</strong>`;
        } else if (isTargetCorrect) {
          rowClass = "is-correct-target";
          checkTag = `<strong style="margin-left: auto; color: #34d399; font-size: 0.8rem;">✓ Correct Answer</strong>`;
        }

        return `
          <div class="review-option-row ${rowClass}">
            <span style="font-weight: 700; color: var(--text-muted); width: 20px;">${letters[optIdx]}.</span>
            <span>${formatCodeAndMarkdown(opt)}</span>
            ${checkTag}
          </div>
        `;
      }).join("");

      card.className = `review-card ${statusClass}`;
      card.innerHTML = `
        <div class="review-card-top">
          <span style="font-size: 0.9rem; font-weight: 700; color: #60a5fa;">Question #${idx + 1} (${q.id || "Q"})</span>
          ${badgeHtml}
        </div>
        <div class="review-question-text">${formatCodeAndMarkdown(q.question)}</div>
        <div class="review-options-grid">${optionsHtml}</div>
        <div class="review-explanation">
          <strong>Key Explanation & Takeaway:</strong>
          ${formatCodeAndMarkdown(q.explanation)}
        </div>
      `;

      reviewCardsList.appendChild(card);
    });
  };

  reviewTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      AudioEngine.playClick();
      reviewTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      state.reviewFilter = tab.getAttribute("data-review-filter");
      renderReviewList();
    });
  });

  btnReviewBackResults.addEventListener("click", () => {
    AudioEngine.playClick();
    if (state.lastCompletedAttempt) {
      switchView("results");
    } else {
      switchView("history");
    }
  });

  /* =========================================================================
     TEST HISTORY VIEW & ATTEMPTS MANAGEMENT
     ========================================================================= */
  const renderHistoryView = () => {
    const attempts = window.StorageManager.getAttempts();
    const query = (historySearchInput.value || "").toLowerCase().trim();
    const category = historyCategoryFilter.value;

    const filtered = attempts.filter((att) => {
      const matchQuery = !query || 
        att.testTitle.toLowerCase().includes(query) ||
        att.category.toLowerCase().includes(query);

      const matchCategory = category === "ALL" || att.category === category;
      return matchQuery && matchCategory;
    });

    if (attempts.length === 0) {
      historyTableWrapper.style.display = "none";
      historyEmptyState.style.display = "block";
      return;
    }

    historyTableWrapper.style.display = "block";
    historyEmptyState.style.display = "none";

    if (filtered.length === 0) {
      historyTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
            No history records match the selected search query and category filter.
          </td>
        </tr>
      `;
      return;
    }

    historyTableBody.innerHTML = filtered.map((att) => {
      let badgeClass = "low";
      if (att.percentage >= 75) badgeClass = "high";
      else if (att.percentage >= 50) badgeClass = "mid";

      return `
        <tr>
          <td>
            <strong style="color: var(--text-primary);">${att.testTitle}</strong>
            <br><span style="font-size: 0.75rem; color: #60a5fa;">${att.category}</span>
          </td>
          <td style="font-size: 0.85rem;">${att.dateFormatted}</td>
          <td><span class="history-score-badge ${badgeClass}">${att.score} / ${att.maxScore}</span></td>
          <td><strong style="color: var(--text-primary); font-size: 1rem;">${att.percentage}%</strong></td>
          <td>${att.accuracy}%</td>
          <td>${att.timeFormatted}</td>
          <td>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-secondary btn-sm btn-hist-review" data-attempt-id="${att.id}">
                Review
              </button>
              <button class="btn btn-danger btn-sm btn-hist-delete" data-attempt-id="${att.id}" title="Delete this attempt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Attach row events
    historyTableBody.querySelectorAll(".btn-hist-review").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioEngine.playClick();
        const id = btn.getAttribute("data-attempt-id");
        const attempt = window.StorageManager.getAttemptById(id);
        if (attempt) openReviewView(attempt);
      });
    });

    historyTableBody.querySelectorAll(".btn-hist-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioEngine.playClick();
        const id = btn.getAttribute("data-attempt-id");
        if (window.StorageManager.deleteAttempt(id)) {
          showToast("Attempt record deleted.", "info");
          renderHistoryView();
        }
      });
    });
  };

  historySearchInput.addEventListener("input", renderHistoryView);
  historyCategoryFilter.addEventListener("change", renderHistoryView);

  // JSON Export / Import
  btnExportHistory.addEventListener("click", () => {
    const attempts = window.StorageManager.getAttempts();
    if (attempts.length === 0) {
      showToast("No test history available to export.", "warning");
      return;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(attempts, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `QuizForge_History_Backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast("History exported successfully as JSON!", "success");
  });

  btnImportHistoryTrigger.addEventListener("click", () => {
    fileImportHistory.click();
  });

  fileImportHistory.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          localStorage.setItem("quizforge_attempts_v1", JSON.stringify(importedData));
          showToast("History restored successfully from JSON!", "success");
          renderHistoryView();
        } else {
          showToast("Invalid JSON format for QuizForge history.", "danger");
        }
      } catch (err) {
        showToast("Error parsing JSON file.", "danger");
      }
    };
    reader.readAsText(file);
    fileImportHistory.value = "";
  });

  btnClearAllHistory.addEventListener("click", () => {
    AudioEngine.playClick();
    const attempts = window.StorageManager.getAttempts();
    if (attempts.length === 0) {
      showToast("History is already empty.", "info");
      return;
    }
    openModal(modalClearHistory);
  });

  modalClearConfirmBtn.addEventListener("click", () => {
    window.StorageManager.clearAllHistory();
    closeModal(modalClearHistory);
    showToast("All test history and dashboard stats cleared.", "success");
    renderHistoryView();
  });

  /* =========================================================================
     MODAL CONTROLS & ESCAPE LISTENERS
     ========================================================================= */
  const openModal = (modalEl) => {
    if (modalEl) modalEl.classList.add("active");
  };

  const closeModal = (modalEl) => {
    if (modalEl) modalEl.classList.remove("active");
  };

  modalSubmitCancel.addEventListener("click", () => closeModal(modalSubmitConfirm));
  modalQuitCancel.addEventListener("click", () => closeModal(modalQuitConfirm));
  modalClearCancel.addEventListener("click", () => closeModal(modalClearHistory));

  modalQuitConfirmBtn.addEventListener("click", () => {
    if (state.activeEngine) {
      state.activeEngine.clearTimer();
      state.activeEngine.isTestActive = false;
      state.activeEngine = null;
    }
    closeModal(modalQuitConfirm);
    showToast("Test exited without saving.", "warning");
    switchView("dashboard");
  });

  // Global Escape & Backdrop click to dismiss modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.active").forEach(closeModal);
    }
  });

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        if (backdrop !== modalTimeExpired) {
          closeModal(backdrop);
        }
      }
    });
  });

  /* =========================================================================
     KEYBOARD SHORTCUTS FOR ACCESSIBILITY & SPEED
     ========================================================================= */
  window.addEventListener("keydown", (e) => {
    // Only process keyboard shortcuts while taking an active quiz and not typing in an input
    if (state.currentView !== "quiz" || !state.activeEngine || !state.activeEngine.isTestActive) {
      return;
    }

    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    // Number keys 1, 2, 3, 4 or letters A, B, C, D to pick options
    const currentQ = state.activeEngine.questions[state.activeEngine.currentIndex];
    if (!currentQ) return;

    if (e.key === "1" || e.key === "a" || e.key === "A") {
      if (currentQ.options[0]) { AudioEngine.playClick(); state.activeEngine.selectOption(currentQ.options[0]); }
    } else if (e.key === "2" || e.key === "b" || e.key === "B") {
      if (currentQ.options[1]) { AudioEngine.playClick(); state.activeEngine.selectOption(currentQ.options[1]); }
    } else if (e.key === "3" || e.key === "c" || e.key === "C") {
      if (currentQ.options[2]) { AudioEngine.playClick(); state.activeEngine.selectOption(currentQ.options[2]); }
    } else if (e.key === "4" || e.key === "d" || e.key === "D") {
      if (currentQ.options[3]) { AudioEngine.playClick(); state.activeEngine.selectOption(currentQ.options[3]); }
    } else if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") {
      AudioEngine.playClick();
      state.activeEngine.nextQuestion();
    } else if (e.key === "ArrowLeft" || e.key === "p" || e.key === "P") {
      AudioEngine.playClick();
      state.activeEngine.previousQuestion();
    } else if (e.key === "m" || e.key === "M") {
      AudioEngine.playClick();
      state.activeEngine.toggleMarkForReview();
    }
  });

  /* =========================================================================
     INITIAL APP BOOTSTRAP
     ========================================================================= */
  refreshDashboard();
});
