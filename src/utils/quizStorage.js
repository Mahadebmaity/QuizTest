import LZString from 'lz-string';

const LOCAL_STORAGE_KEY = 'iqtest_saved_quizzes';

// Sample pre-built quizzes for initial testing & fun!
export const SAMPLE_QUIZZES = [
  {
    id: 'sample-iq-1',
    title: 'Friday Night Trivia & Brain Teasers',
    intro: 'Test your general knowledge, logic, and quick thinking in 5 fun questions!',
    type: 'standard',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        text: 'Which planet is known as the Red Planet?',
        options: [
          { id: 'a', text: 'Venus', isCorrect: false },
          { id: 'b', text: 'Mars', isCorrect: true },
          { id: 'c', text: 'Jupiter', isCorrect: false },
          { id: 'd', text: 'Saturn', isCorrect: false }
        ]
      },
      {
        id: 'q2',
        text: 'If a doctor gives you 3 pills and tells you to take one every half hour, how long will they last?',
        options: [
          { id: 'a', text: '1.5 hours', isCorrect: false },
          { id: 'b', text: '1 hour', isCorrect: true },
          { id: 'c', text: '2 hours', isCorrect: false },
          { id: 'd', text: '45 minutes', isCorrect: false }
        ]
      },
      {
        id: 'q3',
        text: 'What is the capital city of Japan?',
        options: [
          { id: 'a', text: 'Kyoto', isCorrect: false },
          { id: 'b', text: 'Osaka', isCorrect: false },
          { id: 'c', text: 'Tokyo', isCorrect: true },
          { id: 'd', text: 'Hiroshima', isCorrect: false }
        ]
      },
      {
        id: 'q4',
        text: 'Which element has the chemical symbol "O"?',
        options: [
          { id: 'a', text: 'Osmium', isCorrect: false },
          { id: 'b', text: 'Gold', isCorrect: false },
          { id: 'c', text: 'Oxygen', isCorrect: true },
          { id: 'd', text: 'Hydrogen', isCorrect: false }
        ]
      }
    ]
  }
];

// Compress quiz object into URL share hash
export function encodeQuizToUrl(quiz) {
  try {
    const jsonStr = JSON.stringify(quiz);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (err) {
    console.error('Failed to encode quiz:', err);
    return null;
  }
}

// Decompress quiz object from URL share hash
export function decodeQuizFromUrl(hashString) {
  try {
    if (!hashString) return null;
    const jsonStr = LZString.decompressFromEncodedURIComponent(hashString);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Failed to decode quiz:', err);
    return null;
  }
}

// LocalStorage helpers
export function getSavedQuizzes() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return SAMPLE_QUIZZES;
    return JSON.parse(raw);
  } catch (e) {
    return SAMPLE_QUIZZES;
  }
}

export function saveQuizLocally(quiz) {
  try {
    const quizzes = getSavedQuizzes();
    const existingIndex = quizzes.findIndex(q => q.id === quiz.id);
    if (existingIndex >= 0) {
      quizzes[existingIndex] = quiz;
    } else {
      quizzes.unshift(quiz);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quizzes));
    return quizzes;
  } catch (e) {
    console.error('Failed to save locally:', e);
    return [];
  }
}

export function deleteSavedQuiz(quizId) {
  try {
    const quizzes = getSavedQuizzes().filter(q => q.id !== quizId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quizzes));
    return quizzes;
  } catch (e) {
    return [];
  }
}

// Evaluate IQ Score Tier
export function getIQTier(scorePercentage) {
  if (scorePercentage === 100) {
    return {
      title: 'Genius Mastermind 🧠✨',
      grade: 'Top 1% IQ',
      color: 'from-purple-600 to-indigo-600',
      description: 'Flawless score! Your logical reasoning and speed are exceptional.'
    };
  } else if (scorePercentage >= 80) {
    return {
      title: 'Sharp Thinker 💡',
      grade: 'Top 10% IQ',
      color: 'from-indigo-500 to-blue-600',
      description: 'Outstanding performance! You have impressive analytical skills.'
    };
  } else if (scorePercentage >= 60) {
    return {
      title: 'Quick Learner ⚡',
      grade: 'Above Average',
      color: 'from-emerald-500 to-teal-600',
      description: 'Great job! You have solid problem solving abilities.'
    };
  } else {
    return {
      title: 'Curious Explorer 🔍',
      grade: 'Good Effort',
      color: 'from-amber-500 to-orange-600',
      description: 'Nice try! Review your answers and test your brain again.'
    };
  }
}
