const questions = [
  {
    question: 'Who came up with the theory of relativity?',
    answers: [
      'Sir Isaac Newton',
      'Nicolaus Copernicus',
      'Albert Einstein',
      'Ralph Waldo Emmerson'
    ],
    correctAnswer: 'Albert Einstein'
  },
  {
    question: 'Who is on the two dollar bill?',
    answers: [
      'Thomas Jefferson',
      'Dwight D. Eisenhower',
      'Benjamin Franklin',
      'Abraham Lincoln'
    ],
    correctAnswer: 'Thomas Jefferson'
  },
  {
    question: 'What event began on April 12, 1861?',
    answers: [
      'First manned flight',
      'California became a state',
      'American Civil War began',
      'Declaration of Independence'
    ],
    correctAnswer: 'American Civil War began'
  }
]

const checkButton = document.getElementById('check-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const correctMsg = document.getElementById('correct-msg');
const wrongMsg = document.getElementById('wrong-msg');
const scoreMsg = document.getElementById('score-msg');
let selectedButton = null;
let currentQuestionIndex = 0;
let score = 0;
let answer = null;


setNextQuestion();

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  if (currentQuestionIndex >= questions.length) {
    scoreMsg.innerHTML = 'Your score is ' + score;
    scoreMsg.classList.remove('hide')
    correctMsg.classList.add('hide');
    wrongMsg.classList.add('hide');
    checkButton.classList.add('hide');
    nextButton.classList.add('hide');
    questionElement.classList.add('hide');
    answerButtonsElement.classList.add('hide');
  } else {
    setNextQuestion()
  }
})

checkButton.addEventListener('click', checkAnswer)

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer
    button.classList.add('btn')
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  checkButton.classList.remove('hide');
  nextButton.classList.add('hide');
  correctMsg.classList.add('hide');
  wrongMsg.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  selectedButton = e.target;
  answer = selectedButton.innerText;
  selectedButton.classList.add('selected');
}

function checkAnswer() {
  if (answer) {
    if (questions[currentQuestionIndex].correctAnswer === answer) {
      score++;
      correctMsg.classList.remove('hide');
      wrongMsg.classList.add('hide');
    } else {
      wrongMsg.classList.remove('hide');
      correctMsg.classList.add('hide');
      selectedButton.classList.remove('selected');
    }
    checkButton.classList.add('hide');
    nextButton.classList.remove('hide');
  }
}