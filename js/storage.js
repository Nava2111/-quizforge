/**
 * QuizForge - Storage & Analytics Manager
 * Manages localStorage persistence for test attempts, history, and real-time dashboard analytics.
 */

const StorageManager = (() => {
  const STORAGE_KEY = "quizforge_attempts_v1";

  // Safe fetch from localStorage
  const getAttempts = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to read test history from localStorage:", e);
      return [];
    }
  };

  // Save a new completed test attempt
  const saveAttempt = (attempt) => {
    try {
      const current = getAttempts();
      const newAttempt = {
        id: attempt.id || "att_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        testId: attempt.testId,
        testTitle: attempt.testTitle,
        category: attempt.category,
        date: attempt.date || new Date().toISOString(),
        dateFormatted: attempt.dateFormatted || new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        totalQuestions: attempt.totalQuestions,
        answeredCount: attempt.answeredCount,
        unansweredCount: attempt.unansweredCount,
        correctAnswers: attempt.correctAnswers,
        incorrectAnswers: attempt.incorrectAnswers,
        score: attempt.score,
        maxScore: attempt.maxScore,
        percentage: attempt.percentage,
        accuracy: attempt.accuracy,
        timeSpentSeconds: attempt.timeSpentSeconds,
        timeFormatted: attempt.timeFormatted,
        difficulty: attempt.difficulty || "Medium",
        questions: attempt.questions || []
      };

      // Unshift to put newest first
      current.unshift(newAttempt);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      return newAttempt;
    } catch (e) {
      console.error("Failed to save test attempt:", e);
      return null;
    }
  };

  // Get specific attempt by ID
  const getAttemptById = (id) => {
    const attempts = getAttempts();
    return attempts.find((a) => a.id === id) || null;
  };

  // Delete a single attempt
  const deleteAttempt = (id) => {
    try {
      let attempts = getAttempts();
      attempts = attempts.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
      return true;
    } catch (e) {
      console.error("Failed to delete attempt:", e);
      return false;
    }
  };

  // Clear all test attempts
  const clearAllHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      console.error("Failed to clear history:", e);
      return false;
    }
  };

  // Calculate dynamic dashboard statistics
  const calculateDashboardStats = () => {
    const attempts = getAttempts();
    const totalTests = attempts.length;

    if (totalTests === 0) {
      return {
        totalTests: 0,
        testsCompleted: 0,
        averageScore: 0,
        bestScore: 0,
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
        averageAccuracy: 0,
        totalTimeSpentFormatted: "0m",
        categoryStats: {},
        recentAttempts: []
      };
    }

    let totalScorePercent = 0;
    let bestScore = 0;
    let totalQuestionsAttempted = 0;
    let totalQuestionsCorrect = 0;
    let totalTimeSeconds = 0;
    const categoryStats = {};

    attempts.forEach((att) => {
      totalScorePercent += att.percentage;
      if (att.percentage > bestScore) {
        bestScore = att.percentage;
      }

      totalQuestionsAttempted += att.answeredCount || 0;
      totalQuestionsCorrect += att.correctAnswers || 0;
      totalTimeSeconds += att.timeSpentSeconds || 0;

      // Group by category
      if (!categoryStats[att.category]) {
        categoryStats[att.category] = {
          category: att.category,
          attempts: 0,
          totalScore: 0,
          bestScore: 0,
          totalAnswered: 0,
          totalCorrect: 0
        };
      }
      const cat = categoryStats[att.category];
      cat.attempts += 1;
      cat.totalScore += att.percentage;
      if (att.percentage > cat.bestScore) {
        cat.bestScore = att.percentage;
      }
      cat.totalAnswered += att.answeredCount || 0;
      cat.totalCorrect += att.correctAnswers || 0;
    });

    const averageScore = Math.round(totalScorePercent / totalTests);
    const averageAccuracy = totalQuestionsAttempted > 0
      ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100)
      : 0;

    // Format total time spent
    const totalHours = Math.floor(totalTimeSeconds / 3600);
    const totalMins = Math.floor((totalTimeSeconds % 3600) / 60);
    const totalTimeSpentFormatted = totalHours > 0
      ? `${totalHours}h ${totalMins}m`
      : `${totalMins}m`;

    // Process category averages
    Object.keys(categoryStats).forEach((catKey) => {
      const item = categoryStats[catKey];
      item.averageScore = Math.round(item.totalScore / item.attempts);
      item.accuracy = item.totalAnswered > 0 ? Math.round((item.totalCorrect / item.totalAnswered) * 100) : 0;
    });

    return {
      totalTests,
      testsCompleted: totalTests,
      averageScore,
      bestScore: Math.round(bestScore),
      totalQuestionsAttempted,
      totalQuestionsCorrect,
      averageAccuracy,
      totalTimeSpentFormatted,
      categoryStats,
      recentAttempts: attempts.slice(0, 6)
    };
  };

  return {
    getAttempts,
    saveAttempt,
    getAttemptById,
    deleteAttempt,
    clearAllHistory,
    calculateDashboardStats
  };
})();

// Export to window
if (typeof window !== "undefined") {
  window.StorageManager = StorageManager;
}
