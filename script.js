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
let timeLeft = 90

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

    // When time runs out, end the quiz
    if (timeLeft < 0) {
      clearInterval(timerInterval)
      endQuiz()
      console.log("Time's up!")
    }
  }, 1000)
}

/**
 * Function to provide visual feedback and move to the next question
 */
function showFeedbackAndProceed(isCorrect, selectedElement) {
  if (isCorrect) {
    selectedElement.classList.add("is-success")
  } else {
    selectedElement.classList.add("is-danger")
  }

  // Wait 1.5 seconds before moving to the next question so user can see the feedback
  setTimeout(() => {
    currentQuestionIndex++
    if (currentQuestionIndex < quizData.length) {
      displayQuestion()
    } else {
      endQuiz()
      console.log("Quiz over!")
      console.log("Final score:", score)
    }
  }, 1500)
}

/**
 * Event handler for the submit button to validate and process the user's answer
 * @returns {void}
 */
submitButton.addEventListener("click", () => {
  const currentQuestion = quizData[currentQuestionIndex]

  // Handle multiple-choice and true/false questions
  if (
    currentQuestion.type === "aneka-pilihan" ||
    currentQuestion.type === "betul-salah"
  ) {
    const selectedOption = optionsElement.querySelector(".is-selected")
    if (!selectedOption) {
      alert("Please select an answer.")
      return
    }

    const isCorrect =
      selectedOption.textContent === currentQuestion.correctAnswer
    // Check if the selected answer is correct
    if (isCorrect) {
      score++
      showFeedbackAndProceed(isCorrect, selectedOption)
      console.log("Correct! Your score:", score)
    } else {
      showFeedbackAndProceed(isCorrect, selectedOption)
      console.log("Incorrect!")
    }
  }
  // Handle fill-in-the-blank questions
  else if (currentQuestion.type === "isi-tempat-kosong") {
    const inputElement = document.getElementById("isi-tempat-kosong")
    const userAnswer = inputElement.value.trim()

    if (!userAnswer) {
      alert("Please fill in the blank.")
      return
    }

    const isCorrect =
      userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    if (isCorrect) {
      score++
      showFeedbackAndProceed(isCorrect, inputElement)
      console.log("Correct! Your score:", score)
    } else {
      showFeedbackAndProceed(isCorrect, inputElement)
      console.log("Incorrect!")
    }
  }

  // Replace with function - showFeedbackAndProceed(isCorrect, selectedOption)
  // currentQuestionIndex++
  // if (currentQuestionIndex < quizData.length) {
  //   displayQuestion()
  // } else {
  //   endQuiz()
  //   console.log("Quiz over!")
  //   console.log("Final score:", score)
  // }
})

/**
 * Function to end the quiz and display the final score
 * @returns {void}
 */
function endQuiz() {
  timeLeft = 0
  questionElement.textContent = "Time's up!"
  optionsElement.innerHTML = ""
  submitButton.disabled = true
  resultElement.classList.remove("is-hidden")
  resultElement.textContent = `Final score: ${score}`
}

// Start the quiz by displaying the first question and starting the timer
displayQuestion()
startTimer()
