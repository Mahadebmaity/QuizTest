const LEADERBOARD_KEY = 'iqtest_player_stats';

export function getPlayerStats() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      return {
        totalQuizzesPlayed: 0,
        totalCorrectAnswers: 0,
        currentStreak: 0,
        bestStreak: 0,
        history: []
      };
    }
    return JSON.parse(raw);
  } catch (e) {
    return {
      totalQuizzesPlayed: 0,
      totalCorrectAnswers: 0,
      currentStreak: 0,
      bestStreak: 0,
      history: []
    };
  }
}

export function recordQuizCompletion(quizTitle, scorePercentage, correctCount, totalCount) {
  try {
    const stats = getPlayerStats();

    stats.totalQuizzesPlayed += 1;
    stats.totalCorrectAnswers += correctCount;

    if (scorePercentage >= 70) {
      stats.currentStreak += 1;
      if (stats.currentStreak > stats.bestStreak) {
        stats.bestStreak = stats.currentStreak;
      }
    } else {
      stats.currentStreak = 0;
    }

    stats.history.unshift({
      id: `record_${Date.now()}`,
      title: quizTitle,
      scorePercentage,
      correctCount,
      totalCount,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    });

    // Keep last 15 records
    stats.history = stats.history.slice(0, 15);

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(stats));
    return stats;
  } catch (e) {
    console.error('Failed to record completion:', e);
    return getPlayerStats();
  }
}
