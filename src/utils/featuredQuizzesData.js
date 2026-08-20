// Curated, In-Built Featured Quizzes ready to play, test, and share!

export const FEATURED_QUIZZES = [
  {
    id: 'featured-iq-test',
    title: '🧠 Official IQ & General Knowledge Assessment',
    intro: 'Challenge your brain with 5 classic logic, science, and general knowledge questions to test your IQ tier!',
    type: 'standard',
    category: 'IQ & Logic',
    badge: 'Popular',
    createdAt: '2026-08-20T10:00:00.000Z',
    questions: [
      {
        id: 'fq1',
        text: 'Which planet is known as the Red Planet?',
        options: [
          { id: 'a', text: 'Venus', isCorrect: false },
          { id: 'b', text: 'Mars', isCorrect: true },
          { id: 'c', text: 'Jupiter', isCorrect: false },
          { id: 'd', text: 'Saturn', isCorrect: false }
        ]
      },
      {
        id: 'fq2',
        text: 'If a doctor gives you 3 pills and tells you to take one every half hour, how long will they last?',
        options: [
          { id: 'a', text: '1.5 hours', isCorrect: false },
          { id: 'b', text: '1 hour', isCorrect: true },
          { id: 'c', text: '2 hours', isCorrect: false },
          { id: 'd', text: '45 minutes', isCorrect: false }
        ]
      },
      {
        id: 'fq3',
        text: 'What is the capital city of India?',
        options: [
          { id: 'a', text: 'Mumbai', isCorrect: false },
          { id: 'b', text: 'New Delhi', isCorrect: true },
          { id: 'c', text: 'Kolkata', isCorrect: false },
          { id: 'd', text: 'Bengaluru', isCorrect: false }
        ]
      },
      {
        id: 'fq4',
        text: 'Which element has the chemical symbol "Au"?',
        options: [
          { id: 'a', text: 'Silver', isCorrect: false },
          { id: 'b', text: 'Gold', isCorrect: true },
          { id: 'c', text: 'Copper', isCorrect: false },
          { id: 'd', text: 'Iron', isCorrect: false }
        ]
      },
      {
        id: 'fq5',
        text: 'Which is the highest mountain peak above sea level in the world?',
        options: [
          { id: 'a', text: 'K2', isCorrect: false },
          { id: 'b', text: 'Mount Everest', isCorrect: true },
          { id: 'c', text: 'Kangchenjunga', isCorrect: false },
          { id: 'd', text: 'Mount Kilimanjaro', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'featured-space-quiz',
    title: '🚀 Space, Astronomy & Solar System Challenge',
    intro: 'Explore the mysteries of the universe, planets, and galaxies in this cosmic trivia challenge.',
    type: 'standard',
    category: 'Space',
    badge: 'Trending',
    createdAt: '2026-08-20T10:30:00.000Z',
    questions: [
      {
        id: 'sq1',
        text: 'What is the largest planet in our Solar System?',
        options: [
          { id: 'a', text: 'Saturn', isCorrect: false },
          { id: 'b', text: 'Jupiter', isCorrect: true },
          { id: 'c', text: 'Neptune', isCorrect: false },
          { id: 'd', text: 'Uranus', isCorrect: false }
        ]
      },
      {
        id: 'sq2',
        text: 'Which star is at the center of our Solar System?',
        options: [
          { id: 'a', text: 'Sirius', isCorrect: false },
          { id: 'b', text: 'The Sun', isCorrect: true },
          { id: 'c', text: 'Alpha Centauri', isCorrect: false },
          { id: 'd', text: 'Polaris', isCorrect: false }
        ]
      },
      {
        id: 'sq3',
        text: 'How many planets are currently recognized in our Solar System?',
        options: [
          { id: 'a', text: '7', isCorrect: false },
          { id: 'b', text: '8', isCorrect: true },
          { id: 'c', text: '9', isCorrect: false },
          { id: 'd', text: '10', isCorrect: false }
        ]
      },
      {
        id: 'sq4',
        text: 'What galaxy does our Solar System belong to?',
        options: [
          { id: 'a', text: 'Andromeda', isCorrect: false },
          { id: 'b', text: 'Milky Way', isCorrect: true },
          { id: 'c', text: 'Triangulum', isCorrect: false },
          { id: 'd', text: 'Sombrero', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'featured-tech-quiz',
    title: '💻 Tech & Programming Mastermind',
    intro: 'Test your knowledge of computer science, AI, famous tech founders, and coding concepts.',
    type: 'standard',
    category: 'Technology',
    badge: 'Tech Spec',
    createdAt: '2026-08-20T11:00:00.000Z',
    questions: [
      {
        id: 'tq1',
        text: 'Who is recognized as the father of modern computer science?',
        options: [
          { id: 'a', text: 'Alan Turing', isCorrect: true },
          { id: 'b', text: 'Charles Babbage', isCorrect: false },
          { id: 'c', text: 'Bill Gates', isCorrect: false },
          { id: 'd', text: 'Ada Lovelace', isCorrect: false }
        ]
      },
      {
        id: 'tq2',
        text: 'Which programming language executes natively inside modern web browsers?',
        options: [
          { id: 'a', text: 'Python', isCorrect: false },
          { id: 'b', text: 'JavaScript', isCorrect: true },
          { id: 'c', text: 'C++', isCorrect: false },
          { id: 'd', text: 'Java', isCorrect: false }
        ]
      },
      {
        id: 'tq3',
        text: 'What does "HTML" stand for in web development?',
        options: [
          { id: 'a', text: 'Hyper Text Markup Language', isCorrect: true },
          { id: 'b', text: 'High Tech Modern Language', isCorrect: false },
          { id: 'c', text: 'Hyperlink Transfer Machine Logic', isCorrect: false },
          { id: 'd', text: 'Home Tool Management Layer', isCorrect: false }
        ]
      },
      {
        id: 'tq4',
        text: 'What does "CPU" stand for?',
        options: [
          { id: 'a', text: 'Central Processing Unit', isCorrect: true },
          { id: 'b', text: 'Computer Performance Utility', isCorrect: false },
          { id: 'c', text: 'Central Power Unit', isCorrect: false },
          { id: 'd', text: 'Core Programming Unit', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'featured-snack-personality',
    title: '🍿 Fun Personality Quiz: Which Snack Are You?',
    intro: 'Answer 4 quick personality questions to discover your ultimate snack alter-ego!',
    type: 'personality',
    category: 'Personality',
    badge: 'Fun',
    createdAt: '2026-08-20T11:15:00.000Z',
    questions: [
      {
        id: 'pq1',
        text: 'How do you spend a rainy Friday night?',
        options: [
          { id: 'a', text: 'Binge-watching movies with cozy blankets', isCorrect: true },
          { id: 'b', text: 'Partying with friends until late', isCorrect: false },
          { id: 'c', text: 'Reading a mystery book or gaming', isCorrect: false },
          { id: 'd', text: 'Trying a new recipe in the kitchen', isCorrect: false }
        ]
      },
      {
        id: 'pq2',
        text: 'Pick your favorite flavor profile:',
        options: [
          { id: 'a', text: 'Crispy, salty & crunchy', isCorrect: true },
          { id: 'b', text: 'Sweet, rich & chocolatey', isCorrect: false },
          { id: 'c', text: 'Spicy & fiery hot', isCorrect: false },
          { id: 'd', text: 'Tangy, sour & zesty', isCorrect: false }
        ]
      },
      {
        id: 'pq3',
        text: 'What is your superpower in a group project?',
        options: [
          { id: 'a', text: 'The chill planner who keeps everyone calm', isCorrect: true },
          { id: 'b', text: 'The energetic presenter who hypes the team', isCorrect: false },
          { id: 'c', text: 'The quiet mastermind who solves complex problems', isCorrect: false },
          { id: 'd', text: 'The creative designer with wild ideas', isCorrect: false }
        ]
      },
      {
        id: 'pq4',
        text: 'Choose a vacation spot:',
        options: [
          { id: 'a', text: 'Sunny beach resort', isCorrect: true },
          { id: 'b', text: 'Theme park full of rollercoasters', isCorrect: false },
          { id: 'c', text: 'Cozy mountain cabin', isCorrect: false },
          { id: 'd', text: 'Bustling food market city', isCorrect: false }
        ]
      }
    ]
  }
];
