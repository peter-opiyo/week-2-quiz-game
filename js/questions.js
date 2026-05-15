const quizQuestions = [
  // Kenya Trivia
  { question: "What is the highest mountain in Kenya?", answers: ["Mount Elgon", "Mount Kenya", "Mount Longonot", "Mount Suswa"], correct: 1, category: "kenya-trivia" },
  { question: "Which lake borders Kenya, Uganda, and Tanzania?", answers: ["Lake Turkana", "Lake Naivasha", "Lake Victoria", "Lake Baringo"], correct: 2, category: "kenya-trivia" },
  { question: "In which year did Kenya gain independence?", answers: ["1959", "1960", "1963", "1965"], correct: 2, category: "kenya-trivia" },
  { question: "What is the currency of Kenya?", answers: ["Kenyan Dollar", "Kenyan Shilling", "Kenyan Pound", "Kenyan Franc"], correct: 1, category: "kenya-trivia" },
  { question: "Which Kenyan runner held the official marathon world record in 2023?", answers: ["Eliud Kipchoge", "Kelvin Kiptum", "Paul Tergat", "David Rudisha"], correct: 1, category: "kenya-trivia" },
  { question: "What is the name of Kenya's parliament building?", answers: ["Harambee House", "Parliament House", "County Hall", "Nyayo House"], correct: 1, category: "kenya-trivia" },
  { question: "Which national park is closest to Nairobi's city centre?", answers: ["Tsavo East", "Amboseli", "Nairobi National Park", "Lake Nakuru"], correct: 2, category: "kenya-trivia" },
  { question: "What does the word Harambee mean?", answers: ["Welcome", "Pulling together", "Thank you", "Freedom"], correct: 1, category: "kenya-trivia" },
  { question: "Which county is known as the Home of Champions?", answers: ["Nandi County", "Nakuru County", "Mombasa County", "Kiambu County"], correct: 0, category: "kenya-trivia" },
  { question: "What is M-Pesa?", answers: ["A mobile money transfer service", "A national park", "A railway line", "A coffee brand"], correct: 0, category: "kenya-trivia" },

  // Technology
  { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "High Tech Machine Language", "Home Tool Markup Language", "Hyper Transfer Modern Logic"], correct: 0, category: "technology" },
  { question: "Which language adds interactivity to web pages?", answers: ["HTML", "CSS", "JavaScript", "SQL"], correct: 2, category: "technology" },
  { question: "Which CSS property changes the background colour?", answers: ["font-size", "background-color", "text-align", "border-radius"], correct: 1, category: "technology" },
  { question: "Which JavaScript method selects the first matching element?", answers: ["querySelector()", "push()", "setInterval()", "JSON.parse()"], correct: 0, category: "technology" },
  { question: "Which storage keeps data after the browser closes?", answers: ["localStorage", "console.log", "alert", "style.css"], correct: 0, category: "technology" },
  { question: "Which array method adds an item to the end?", answers: ["pop()", "shift()", "push()", "slice()"], correct: 2, category: "technology" },
  { question: "What does CSS mainly control?", answers: ["Database tables", "Page styling", "Server hosting", "Browser history"], correct: 1, category: "technology" },
  { question: "Which event fires when a button is clicked?", answers: ["submit", "input", "click", "keydown"], correct: 2, category: "technology" },
  { question: "Which function runs code repeatedly after a delay?", answers: ["setInterval()", "parseInt()", "preventDefault()", "addEventListener()"], correct: 0, category: "technology" },
  { question: "What is GitHub Pages used for?", answers: ["Writing CSS", "Deploying static websites", "Creating passwords", "Editing photos"], correct: 1, category: "technology" },

  // Sports
  { question: "How many players does one football team have on the field?", answers: ["9", "10", "11", "12"], correct: 2, category: "sports" },
  { question: "Which sport is associated with Wimbledon?", answers: ["Tennis", "Rugby", "Athletics", "Golf"], correct: 0, category: "sports" },
  { question: "In basketball, how many points is a shot from beyond the arc worth?", answers: ["1", "2", "3", "4"], correct: 2, category: "sports" },
  { question: "Which Kenyan athlete is famous for the 800m world record?", answers: ["David Rudisha", "Eliud Kipchoge", "Samuel Wanjiru", "Faith Kipyegon"], correct: 0, category: "sports" },
  { question: "Which country hosted the 2010 FIFA World Cup?", answers: ["Brazil", "South Africa", "Germany", "Japan"], correct: 1, category: "sports" },
  { question: "What is a hat-trick in football?", answers: ["Three goals by one player", "Three red cards", "Three corner kicks", "Three substitutions"], correct: 0, category: "sports" },
  { question: "Which sport uses a shuttlecock?", answers: ["Squash", "Badminton", "Table tennis", "Volleyball"], correct: 1, category: "sports" },
  { question: "How long is a standard marathon?", answers: ["21.1 km", "32 km", "42.195 km", "50 km"], correct: 2, category: "sports" },
  { question: "Which team sport uses tries and conversions?", answers: ["Cricket", "Rugby", "Hockey", "Handball"], correct: 1, category: "sports" },
  { question: "Which Kenyan football club is popularly known as K'Ogalo?", answers: ["AFC Leopards", "Tusker FC", "Gor Mahia", "Sofapaka"], correct: 2, category: "sports" }
];

const quizCategories = [
  { id: "kenya-trivia", name: "Kenya Trivia", icon: "🇰🇪", description: "Geography, history, culture, and Kenyan current knowledge." },
  { id: "technology", name: "Technology", icon: "💻", description: "HTML, CSS, JavaScript, browser tools, and web basics." },
  { id: "sports", name: "Sports", icon: "🏆", description: "Football, athletics, basketball, rugby, and global sports." }
];
