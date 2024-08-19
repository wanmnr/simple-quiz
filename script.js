// /script.js

// Data structure to hold the quiz questions, types, and answers
const quizData = [
  {
    type: "aneka-pilihan",
    question: "Di manakah ibu negeri Perlis?",
    options: ["Ipoh", "Johor Bahru", "Kuching", "Kangar"],
    correctAnswer: "Kangar",
  },
  {
    type: "betul-salah",
    question: "Ibu negara Malaysia terletak di Putrajaya.",
    correctAnswer: "Salah",
  },
  {
    type: "isi-tempat-kosong",
    question: "Apakah negeri terbesar di Malaysia",
    correctAnswer: "Sarawak",
  },
]

// Global variables to track the quiz state
let currentQuestionIndex = 0
let score = 0
let timeLeft = 30

// DOM elements for the quiz interface
const quizContainer = document.getElementById("quiz-container")
const questionElement = document.getElementById("question")
const optionsElement = document.getElementById("options")
const submitButton = document.getElementById("submit")
const resultElement = document.getElementById("result")
const timerElement = document.getElementById("timer")

/**
 * Function to display the current question and its corresponding options based on question type
 * @returns {void}
 */
function displayQuestion() {
  // Get the current question from the quizData array
  const currentQuestion = quizData[currentQuestionIndex]
  questionElement.textContent = currentQuestion.question
  optionsElement.innerHTML = "" // Clear previous options

  // Handle multiple-choice questions
  if (currentQuestion.type === "aneka-pilihan") {
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button")
      button.className = "button is-light"
      button.textContent = option

      // Add event listener to handle option selection
      button.addEventListener("click", () => {
        selectOption(button)
      })
      optionsElement.appendChild(button)
    })
  }
  // Handle true/false questions
  else if (currentQuestion.type === "betul-salah") {
    ;["Betul", "Salah"].forEach((option) => {
      const button = document.createElement("button")
      button.className = "button is-light"
      button.textContent = option

      // Add event listener to handle option selection
      button.addEventListener("click", () => {
        selectOption(button)
      })
      optionsElement.appendChild(button)
    })
  }
  // Handle fill-in-the-blank questions
  else if (currentQuestion.type === "isi-tempat-kosong") {
    const inputElement = document.createElement("input")
    inputElement.type = "text"
    inputElement.className = "input"
    inputElement.id = "isi-tempat-kosong"
    optionsElement.appendChild(inputElement)
  }
  // Fallback for unknown question types
  else {
    console.log("Unknown question type")
  }
}

/**
 * Function to handle option selection and provide visual feedback
 * @param {HTMLElement} selectedButton - The button that was selected by the user
 * @returns {void}
 */
function selectOption(selectedButton) {
  const buttons = optionsElement.querySelectorAll(".button")
  buttons.forEach((btn) => btn.classList.remove("is-selected"))
  selectedButton.classList.add("is-selected")
}

/**
 * Function to start the quiz timer and handle time expiration
 * @returns {void}
 */
function startTimer() {
  const timerInterval = setInterval(() => {
    timerElement.textContent = `Time left: ${timeLeft} seconds`
    timeLeft--
    if (timeLeft < 0) {
      clearInterval(timerInterval)
      endQuiz()
      console.log("Time's up!")
    }
  }, 1000)
}

/**
 * Event handler for the submit button to validate and process the user's answer
 * @returns {void}
 */
submitButton.addEventListener("click", () => {
  const currentQuestion = quizData[currentQuestionIndex]

  if (
    currentQuestion.type === "aneka-pilihan" ||
    currentQuestion.type === "betul-salah"
  ) {
    const selectedOption = optionsElement.querySelector(".is-selected")
    if (!selectedOption) {
      alert("Please select an answer.")
      return
    }

    if (selectedOption.textContent === currentQuestion.correctAnswer) {
      score++
      console.log("Correct! Your score:", score)
    } else {
      // Handle incorrect answer
      console.log("Incorrect!")
    }
  } else if (currentQuestion.type === "isi-tempat-kosong") {
    const inputElement = document.getElementById("isi-tempat-kosong")
    const userAnswer = inputElement.value.trim()

    if (!userAnswer) {
      alert("Please fill in the blank.")
      return
    }

    if (
      userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    ) {
      score++
    }
  }

  currentQuestionIndex++
  if (currentQuestionIndex < quizData.length) {
    displayQuestion()
  } else {
    endQuiz()
    console.log("Quiz over!")
    console.log("Final score:", score)
  }
})

/**
 * Function to end the quiz and display the final score
 * @returns {void}
 */
function endQuiz() {
  questionElement.textContent = "Time's up!"
  optionsElement.innerHTML = ""
  submitButton.disabled = true
  resultElement.classList.remove("is-hidden")
  resultElement.textContent = `Final score: ${score}`
}

// Start the quiz by displaying the first question and starting the timer
displayQuestion()
displayQuestion()
startTimer()
