// High Scores div
let highScores = document.getElementById("high-scores");

// Timer div
let timer = document.getElementById("timer");

const questions = [
  {
    question: 'What is the power level of Goku?',
    answers: [
      { text: '1', correct: false },
      { text: 'Over 9000', correct: true },
      { text: '100', correct: false },
      { text: 'Same as Vegeta', correct: false }
    ]
  },
  {
    question: 'What is the max cash stack on Runescape?',
    answers: [
      { text: '1 million', correct: false },
      { text: '2.147 billion', correct: true },
      { text: 'Whatever change I have in my pocket', correct: false },
      { text: 'The limit does not exist', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true },
      { text: '69', correct: false },
      { text: 'Leroy Jenkins', correct: false },
    ]
  }
]
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-btn")

let shuffledQuestions, currentQuestionIndex;

startButton.onclick = startGame;
// startButton.addEventListener("click", startGame());
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainer.classList.remove("hide")
  setNextQuestion()
};

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
};


function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonElement.appendChild(button)
  })
};

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add("hide")
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
}

function selectAnswer(event) {
  const selectedButton = event.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
  }
};

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

