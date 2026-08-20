// AI Question & Answer Database for real-time autocomplete and smart suggestions

export const AI_SUGGESTION_DATABASE = [
  {
    topic: 'Geography',
    keywords: ['capital', 'country', 'india', 'japan', 'france', 'city', 'river', 'mountain'],
    question: 'What is the capital of India?',
    options: [
      { text: 'New Delhi', isCorrect: true },
      { text: 'Mumbai', isCorrect: false },
      { text: 'Kolkata', isCorrect: false },
      { text: 'Bengaluru', isCorrect: false }
    ]
  },
  {
    topic: 'Geography',
    keywords: ['capital', 'japan', 'tokyo', 'asia'],
    question: 'What is the capital city of Japan?',
    options: [
      { text: 'Kyoto', isCorrect: false },
      { text: 'Osaka', isCorrect: false },
      { text: 'Tokyo', isCorrect: true },
      { text: 'Sapporo', isCorrect: false }
    ]
  },
  {
    topic: 'Geography',
    keywords: ['mountain', 'highest', 'everest', 'peak'],
    question: 'Which is the highest mountain peak in the world?',
    options: [
      { text: 'K2', isCorrect: false },
      { text: 'Mount Everest', isCorrect: true },
      { text: 'Kangchenjunga', isCorrect: false },
      { text: 'Lhotse', isCorrect: false }
    ]
  },
  {
    topic: 'Space & Astronomy',
    keywords: ['planet', 'red', 'mars', 'space'],
    question: 'Which planet is known as the Red Planet?',
    options: [
      { text: 'Venus', isCorrect: false },
      { text: 'Mars', isCorrect: true },
      { text: 'Jupiter', isCorrect: false },
      { text: 'Saturn', isCorrect: false }
    ]
  },
  {
    topic: 'Space & Astronomy',
    keywords: ['planet', 'largest', 'jupiter', 'sun', 'solar system'],
    question: 'What is the largest planet in our Solar System?',
    options: [
      { text: 'Saturn', isCorrect: false },
      { text: 'Jupiter', isCorrect: true },
      { text: 'Neptune', isCorrect: false },
      { text: 'Uranus', isCorrect: false }
    ]
  },
  {
    topic: 'Science & Chemistry',
    keywords: ['element', 'gold', 'chemical', 'symbol', 'science', 'atom'],
    question: 'What is the chemical symbol for Gold?',
    options: [
      { text: 'Au', isCorrect: true },
      { text: 'Ag', isCorrect: false },
      { text: 'Fe', isCorrect: false },
      { text: 'Cu', isCorrect: false }
    ]
  },
  {
    topic: 'Science & Biology',
    keywords: ['human', 'bone', 'body', 'blood', 'heart', 'organ'],
    question: 'How many bones are in the adult human body?',
    options: [
      { text: '206', isCorrect: true },
      { text: '210', isCorrect: false },
      { text: '198', isCorrect: false },
      { text: '300', isCorrect: false }
    ]
  },
  {
    topic: 'Tech & Computing',
    keywords: ['computer', 'father', 'ai', 'cpu', 'software', 'programming', 'internet'],
    question: 'Who is known as the father of modern computer science?',
    options: [
      { text: 'Alan Turing', isCorrect: true },
      { text: 'Charles Babbage', isCorrect: false },
      { text: 'Bill Gates', isCorrect: false },
      { text: 'Steve Jobs', isCorrect: false }
    ]
  },
  {
    topic: 'Tech & Programming',
    keywords: ['programming', 'python', 'language', 'web', 'code', 'javascript'],
    question: 'Which programming language is known for web development in browsers?',
    options: [
      { text: 'Python', isCorrect: false },
      { text: 'JavaScript', isCorrect: true },
      { text: 'C++', isCorrect: false },
      { text: 'Java', isCorrect: false }
    ]
  },
  {
    topic: 'Pop Culture & Movies',
    keywords: ['movie', 'oscar', 'disney', 'film', 'actor', 'music'],
    question: 'Which movie won the Academy Award for Best Picture in 2024?',
    options: [
      { text: 'Oppenheimer', isCorrect: true },
      { text: 'Barbie', isCorrect: false },
      { text: 'Avatar: The Way of Water', isCorrect: false },
      { text: 'Dune: Part Two', isCorrect: false }
    ]
  },
  {
    topic: 'Literature & History',
    keywords: ['author', 'book', 'wrote', 'hamlet', 'shakespeare', 'history'],
    question: 'Who wrote the famous tragedy "Hamlet"?',
    options: [
      { text: 'William Shakespeare', isCorrect: true },
      { text: 'Charles Dickens', isCorrect: false },
      { text: 'Mark Twain', isCorrect: false },
      { text: 'Leo Tolstoy', isCorrect: false }
    ]
  }
];

// Helper to find AI suggestions based on live input string
export function getAiQuestionSuggestions(queryText) {
  if (!queryText || queryText.trim().length < 2) {
    return AI_SUGGESTION_DATABASE.slice(0, 4); // Default popular suggestions
  }

  const queryLower = queryText.toLowerCase().trim();

  // Search by keyword match or question text substring
  const matches = AI_SUGGESTION_DATABASE.filter(item => {
    const qMatches = item.question.toLowerCase().includes(queryLower);
    const kwMatches = item.keywords.some(kw => kw.includes(queryLower) || queryLower.includes(kw));
    const topicMatches = item.topic.toLowerCase().includes(queryLower);
    return qMatches || kwMatches || topicMatches;
  });

  if (matches.length > 0) {
    return matches.slice(0, 4);
  }

  // Fallback AI generated template if no direct match
  return [
    {
      topic: 'AI Custom',
      question: `What is the main significance of ${queryText}?`,
      options: [
        { text: `Option A for ${queryText}`, isCorrect: true },
        { text: `Option B for ${queryText}`, isCorrect: false },
        { text: `Option C for ${queryText}`, isCorrect: false },
        { text: `Option D for ${queryText}`, isCorrect: false }
      ]
    },
    ...AI_SUGGESTION_DATABASE.slice(0, 3)
  ];
}
