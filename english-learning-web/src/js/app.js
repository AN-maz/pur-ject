import words from '../data/words.json'
import quizzes from '../data/quiz.json'

const app = document.querySelector('#app')

let currentIndex = 0
let learnedWords = 0
let score = 0

function speakWord(text) {
  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)

  utterance.lang = 'en-US'
  utterance.rate = 0.9

  speechSynthesis.speak(utterance)
}

function nextWord() {
  currentIndex++

  learnedWords++

  if (currentIndex >= words.length) {
    currentIndex = 0
  }

  renderWord()
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++
  }

  renderWord()
}

function renderQuiz() {
  const quiz = quizzes[currentIndex]

  return `
    <div class="mt-5">

      <h4 class="mb-3">
        Mini Quiz
      </h4>

      <div class="d-grid gap-2">

        ${quiz.options
          .map(
            (option) => `
            <button
              class="btn btn-outline-primary quiz-btn"
              data-option="${option}"
            >
              ${option}
            </button>
          `
          )
          .join('')}

      </div>

    </div>
  `
}

function renderWord() {
  const word = words[currentIndex]

  const progressPercent =
    ((currentIndex + 1) / words.length) * 100

  app.innerHTML = `
    <div class="container py-5">

      <div class="card shadow-lg p-4 mx-auto" style="max-width: 700px;">

        <div class="d-flex justify-content-between align-items-center mb-3">

          <h1 class="h3 m-0">
            Daily English
          </h1>

          <div class="d-flex gap-2">

            <span class="badge bg-success">
              Score: ${score}
            </span>

            <span class="badge bg-primary">
              Learned: ${learnedWords}
            </span>

          </div>

        </div>

        <div class="progress mb-4" style="height: 10px;">
          <div
            class="progress-bar"
            style="width: ${progressPercent}%"
          ></div>
        </div>

        <p class="text-secondary">
          Word ${currentIndex + 1} of ${words.length}
        </p>

        <h2 class="text-primary fw-bold">
          ${word.word}
        </h2>

        <p class="fs-5">
          ${word.meaning}
        </p>

        <div class="bg-light p-3 rounded text-dark">
          "${word.example}"
        </div>

        <div class="d-flex gap-2 mt-4">

          <button id="speakBtn" class="btn btn-dark w-100">
            🔊 Pronounce
          </button>

          <button id="nextBtn" class="btn btn-primary w-100">
            Next Word
          </button>

        </div>

        ${renderQuiz()}

      </div>

    </div>
  `

  const speakBtn = document.querySelector('#speakBtn')
  const nextBtn = document.querySelector('#nextBtn')
  const quizButtons =
    document.querySelectorAll('.quiz-btn')

  speakBtn.addEventListener('click', () => {
    speakWord(word.word)
  })

  nextBtn.addEventListener('click', () => {
    nextWord()
  })

  quizButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.option

      checkAnswer(selected, quizzes[currentIndex].answer)

      if (selected === quizzes[currentIndex].answer) {
        button.classList.remove('btn-outline-primary')
        button.classList.add('btn-success')
      } else {
        button.classList.remove('btn-outline-primary')
        button.classList.add('btn-danger')
      }
    })
  })
}

window.speechSynthesis.onvoiceschanged = () => {
  renderWord()
}

renderWord()