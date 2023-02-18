// Define the quiz questions and answers
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Huge Tigers & Mountain Lions", correct: false },
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hyperbolic Timetraveling Musical Lemurs", correct: false },
      { text: "Cascading Style Sheets", correct: false },
    ],
  },
  {
    question: "Why is the max cash stack in RuneScape 2.147 billion?",
    answers: [
      { text: "The devs thought that was enough cash", correct: false },
      { text: "Because the game uses 32-bit signed integers", correct: true },
      { text: "Who still plays that game?", correct: false },
      { text: "Who knows?", correct: false },
    ],
  },
  {
    question: "What is Spiderman's day job?",
    answers: [
      { text: "Web Developer", correct: false },
      { text: "Photogrpaher", correct: true },
      { text: "Door Repairman", correct: false },
      { text: "Philanthropist", correct: false },
    ],
  },
];

// Define other necessary variables
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const endContainer = document.getElementById("end-container");
const finalScoreElement = document.getElementById("final-score");
const submitButton = document.getElementById("submit-button");
const initialsInput = document.getElementById("initials");
const highscoresDiv = document.querySelector(".highscores");
const scoresList = document.getElementById("scores-list");
const scoreForm = document.getElementById("score-form");

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 60; // The starting time for the quiz
let scores = JSON.parse(localStorage.getItem("scores")) || [];

// Add an event listener to the start button
startButton.addEventListener("click", startQuiz);

// Add an event listener to the answer buttons container
answerButtons.addEventListener("click", selectAnswer);

// Add an event listener to the submit button
submitButton.addEventListener("click", saveScores);

// Add an event listener to the high scores button
document.getElementById("highscores-button").addEventListener("click", viewHighScores);

// function to display scores in list
function displayScores() {
  scoresList.innerHTML = "";
  scores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = `${score.initials}: ${score.score}`;
    scoresList.appendChild(li);
  });
}

// function to save scores to local storage and display them
function saveScores() {
  localStorage.setItem("scores", JSON.stringify(scores));
  displayScores();
}

// function to handle form submission
function submitScore(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim().toUpperCase();
  if (!initials) {
    return alert("Please enter your initials.");
  }
  const newScore = {
    score,
    initials,
  };
  scores.push(newScore);
  saveScores();
  highscoresDiv.classList.remove("hide");
  endContainer.classList.add("hide");
}

// function to handle clicking the high scores link
function viewHighScores() {
  displayScores();
  quizContainer.classList.add("hide");
  endContainer.classList.add("hide");
  highscoresDiv.classList.remove("hide");
}

// Start the quiz
function startQuiz() {
  // Hide the start container and show the quiz container
  document.getElementById("start-container").classList.add("hide");
  quizContainer.classList.remove("hide");

  // Shuffle the quiz
  shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;

  // Start the timer
  startTimer();

  // Display the first question
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Display a question and its answer choices
function showQuestion(question) {
  // Display the question
  questionElement.innerText = question.question;

  // Clear the answer buttons
  answerButtons.innerHTML = "";

  // Display the answer choices
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

// Handle selecting an answer
function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score += 10;
  } else {
    timeLeft -= 10;
  }
  setStatusClass(selectedButton, correct);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    setTimeout(() => {
      currentQuestionIndex++;
      showQuestion(shuffledQuestions[currentQuestionIndex]);
    }, 1000);
  } else {
    setTimeout(endQuiz, 1000);
  }
}

// Set the class of the button based on whether the answer is correct or incorrect
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

// Clear the class of the button
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

// End the quiz
function endQuiz() {
  clearInterval(timerInterval);
  endContainer.classList.remove("hide");
  quizContainer.classList.add("hide");
  finalScoreElement.innerText = score;
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
    document.getElementById("timer").innerText = timeLeft;
  }, 1000);
}

