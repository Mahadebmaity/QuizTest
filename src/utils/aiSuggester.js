// AI Question & Answer Database for real-time autocomplete and smart suggestions

export const AI_SUGGESTION_DATABASE = [
  {
    topic: 'Geography',
    keywords: ['capital', 'country', 'india', 'new delhi', 'city', 'asia'],
    question: 'What is the capital of India?',
    explanation: '💡 Fun Fact: New Delhi replaced Kolkata as the official capital in 1911.',
    options: [
      { text: 'New Delhi', isCorrect: true },
      { text: 'Mumbai', isCorrect: false },
      { text: 'Kolkata', isCorrect: false },
      { text: 'Bengaluru', isCorrect: false }
    ]
  },
  {
    topic: 'Geography',
    keywords: ['capital', 'japan', 'tokyo', 'asia', 'city'],
    question: 'What is the capital city of Japan?',
    explanation: '💡 Fun Fact: Tokyo is the largest metropolitan area in the world by population.',
    options: [
      { text: 'Kyoto', isCorrect: false },
      { text: 'Osaka', isCorrect: false },
      { text: 'Tokyo', isCorrect: true },
      { text: 'Sapporo', isCorrect: false }
    ]
  },
  {
    topic: 'Geography',
    keywords: ['mountain', 'highest', 'everest', 'peak', 'himalaya'],
    question: 'Which is the highest mountain peak in the world?',
    explanation: '💡 Fun Fact: Mount Everest sits on the border between Nepal and China.',
    options: [
      { text: 'K2', isCorrect: false },
      { text: 'Mount Everest', isCorrect: true },
      { text: 'Kangchenjunga', isCorrect: false },
      { text: 'Lhotse', isCorrect: false }
    ]
  },
  {
    topic: 'Geography',
    keywords: ['ocean', 'largest', 'pacific', 'water', 'sea'],
    question: 'Which is the largest ocean on Earth by surface area?',
    explanation: '💡 Fun Fact: The Pacific Ocean covers over 30% of Earth’s total surface area.',
    options: [
      { text: 'Atlantic Ocean', isCorrect: false },
      { text: 'Pacific Ocean', isCorrect: true },
      { text: 'Indian Ocean', isCorrect: false },
      { text: 'Arctic Ocean', isCorrect: false }
    ]
  },
  {
    topic: 'Geography',
    keywords: ['country', 'capital', 'australia', 'canberra', 'sydney'],
    question: 'What is the capital city of Australia?',
    explanation: '💡 Fun Fact: Canberra was chosen as capital to resolve rivalry between Sydney and Melbourne.',
    options: [
      { text: 'Sydney', isCorrect: false },
      { text: 'Melbourne', isCorrect: false },
      { text: 'Canberra', isCorrect: true },
      { text: 'Perth', isCorrect: false }
    ]
  },
  {
    topic: 'Space & Astronomy',
    keywords: ['planet', 'red', 'mars', 'space', 'solar system'],
    question: 'Which planet is known as the Red Planet?',
    explanation: '💡 Fun Fact: Mars appears red due to iron oxide (rust) on its surface.',
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
    explanation: '💡 Fun Fact: Jupiter is so large that all other planets in the solar system could fit inside it!',
    options: [
      { text: 'Saturn', isCorrect: false },
      { text: 'Jupiter', isCorrect: true },
      { text: 'Neptune', isCorrect: false },
      { text: 'Uranus', isCorrect: false }
    ]
  },
  {
    topic: 'Space & Astronomy',
    keywords: ['star', 'sun', 'light', 'earth', 'galaxy'],
    question: 'How long does it take for light from the Sun to reach Earth?',
    explanation: '💡 Fun Fact: Sunlight travels at 300,000 km/s and arrives on Earth in just over 8 minutes.',
    options: [
      { text: 'About 8 minutes', isCorrect: true },
      { text: 'About 1 hour', isCorrect: false },
      { text: 'About 30 seconds', isCorrect: false },
      { text: 'Instantaneously', isCorrect: false }
    ]
  },
  {
    topic: 'Science & Chemistry',
    keywords: ['element', 'gold', 'chemical', 'symbol', 'science', 'au'],
    question: 'What is the chemical symbol for Gold?',
    explanation: '💡 Fun Fact: "Au" is derived from the Latin word "Aurum", meaning "glowing dawn".',
    options: [
      { text: 'Au', isCorrect: true },
      { text: 'Ag', isCorrect: false },
      { text: 'Fe', isCorrect: false },
      { text: 'Cu', isCorrect: false }
    ]
  },
  {
    topic: 'Science & Chemistry',
    keywords: ['water', 'formula', 'h2o', 'molecule', 'chemistry'],
    question: 'What is the chemical formula for pure water?',
    explanation: '💡 Fun Fact: Water consists of two hydrogen atoms covalently bonded to one oxygen atom.',
    options: [
      { text: 'H2O', isCorrect: true },
      { text: 'CO2', isCorrect: false },
      { text: 'NaCl', isCorrect: false },
      { text: 'O2', isCorrect: false }
    ]
  },
  {
    topic: 'Science & Biology',
    keywords: ['human', 'bone', 'body', 'skeleton', 'anatomy'],
    question: 'How many bones are in the adult human body?',
    explanation: '💡 Fun Fact: Babies are born with about 300 bones, which fuse together as they grow.',
    options: [
      { text: '206', isCorrect: true },
      { text: '210', isCorrect: false },
      { text: '198', isCorrect: false },
      { text: '300', isCorrect: false }
    ]
  },
  {
    topic: 'Science & Biology',
    keywords: ['cell', 'mitochondria', 'energy', 'powerhouse', 'organelle'],
    question: 'Which organelle is known as the powerhouse of the cell?',
    explanation: '💡 Fun Fact: Mitochondria generate most of the chemical energy (ATP) needed by cells.',
    options: [
      { text: 'Ribosome', isCorrect: false },
      { text: 'Mitochondria', isCorrect: true },
      { text: 'Nucleus', isCorrect: false },
      { text: 'Golgi Apparatus', isCorrect: false }
    ]
  },
  {
    topic: 'Tech & Computing',
    keywords: ['computer', 'father', 'ai', 'turing', 'science', 'programming'],
    question: 'Who is known as the father of modern computer science?',
    explanation: '💡 Fun Fact: Alan Turing created the theoretical basis for modern computing and AI.',
    options: [
      { text: 'Alan Turing', isCorrect: true },
      { text: 'Charles Babbage', isCorrect: false },
      { text: 'Bill Gates', isCorrect: false },
      { text: 'Steve Jobs', isCorrect: false }
    ]
  },
  {
    topic: 'Tech & Programming',
    keywords: ['programming', 'javascript', 'browser', 'web', 'code'],
    question: 'Which programming language is natively executed in web browsers?',
    explanation: '💡 Fun Fact: JavaScript was created by Brendan Eich in just 10 days in 1995!',
    options: [
      { text: 'Python', isCorrect: false },
      { text: 'JavaScript', isCorrect: true },
      { text: 'C++', isCorrect: false },
      { text: 'Java', isCorrect: false }
    ]
  },
  {
    topic: 'Tech & Hardware',
    keywords: ['ram', 'memory', 'hardware', 'computer', 'byte'],
    question: 'What does "RAM" stand for in computer systems?',
    explanation: '💡 Fun Fact: RAM holds volatile data that CPU needs quickly while computing.',
    options: [
      { text: 'Random Access Memory', isCorrect: true },
      { text: 'Read Access Module', isCorrect: false },
      { text: 'Rapid Array Machine', isCorrect: false },
      { text: 'Realtime Application Memory', isCorrect: false }
    ]
  },
  {
    topic: 'Pop Culture & Movies',
    keywords: ['movie', 'oscar', 'oppenheimer', 'film', 'cinema'],
    question: 'Which film won the Academy Award for Best Picture in 2024?',
    explanation: '💡 Fun Fact: Oppenheimer won 7 Academy Awards including Best Picture and Best Director.',
    options: [
      { text: 'Oppenheimer', isCorrect: true },
      { text: 'Barbie', isCorrect: false },
      { text: 'Avatar 2', isCorrect: false },
      { text: 'Killers of the Flower Moon', isCorrect: false }
    ]
  },
  {
    topic: 'Literature & History',
    keywords: ['author', 'shakespeare', 'hamlet', 'book', 'play'],
    question: 'Who wrote the legendary play "Hamlet"?',
    explanation: '💡 Fun Fact: Hamlet is William Shakespeare’s longest play and among his most influential.',
    options: [
      { text: 'William Shakespeare', isCorrect: true },
      { text: 'Charles Dickens', isCorrect: false },
      { text: 'Leo Tolstoy', isCorrect: false },
      { text: 'Mark Twain', isCorrect: false }
    ]
  },
  {
    topic: 'History',
    keywords: ['pyramid', 'egypt', 'giza', 'ancient', 'wonder'],
    question: 'In which country are the Great Pyramids of Giza located?',
    explanation: '💡 Fun Fact: The Pyramids of Giza were built over 4,500 years ago as tombs for Pharaohs.',
    options: [
      { text: 'Greece', isCorrect: false },
      { text: 'Egypt', isCorrect: true },
      { text: 'Rome', isCorrect: false },
      { text: 'Turkey', isCorrect: false }
    ]
  },
  {
    topic: 'History',
    keywords: ['ww2', 'world war', 'history', '1945', 'year'],
    question: 'In which year did World War II officially end?',
    explanation: '💡 Fun Fact: WWII ended in 1945 following the Allied victory.',
    options: [
      { text: '1943', isCorrect: false },
      { text: '1945', isCorrect: true },
      { text: '1950', isCorrect: false },
      { text: '1939', isCorrect: false }
    ]
  }
];

// Helper to find AI suggestions based on live input string, filtering out existing questions in current quiz
export function getAiQuestionSuggestions(queryText, existingQuestions = []) {
  const existingTexts = existingQuestions.map(q => (q.text || '').trim().toLowerCase()).filter(Boolean);

  // Filter out any database item that already exists in the quiz
  const uniquePool = AI_SUGGESTION_DATABASE.filter(item => 
    !existingTexts.includes(item.question.trim().toLowerCase())
  );

  const pool = uniquePool.length > 0 ? uniquePool : AI_SUGGESTION_DATABASE;

  if (!queryText || queryText.trim().length < 2) {
    return pool.slice(0, 4); // Return top unique popular suggestions
  }

  const queryLower = queryText.toLowerCase().trim();

  // Search by keyword match or question text substring
  const matches = pool.filter(item => {
    const qMatches = item.question.toLowerCase().includes(queryLower);
    const kwMatches = item.keywords?.some(kw => kw.includes(queryLower) || queryLower.includes(kw));
    const topicMatches = item.topic.toLowerCase().includes(queryLower);
    return qMatches || kwMatches || topicMatches;
  });

  if (matches.length > 0) {
    return matches.slice(0, 4);
  }

  // Fallback AI generated template if no direct match
  return [
    {
      topic: 'AI Smart Prompt',
      question: `What is the key importance of ${queryText}?`,
      explanation: `💡 Smart Prompt: Generated trivia question based on "${queryText}".`,
      options: [
        { text: `Primary concept of ${queryText}`, isCorrect: true },
        { text: `Secondary element of ${queryText}`, isCorrect: false },
        { text: `Common misconception about ${queryText}`, isCorrect: false },
        { text: `Unrelated alternative theory`, isCorrect: false }
      ]
    },
    ...pool.slice(0, 3)
  ];
}

