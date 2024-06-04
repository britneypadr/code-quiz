const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const finalScoreElement = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitBtn = document.getElementById('submit-btn');

let shuffledQuestions, currentQuestionIndex;
let time = 60;
let timer;

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'High Text Markup Language', correct: false },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Creative Style Sheets', correct: false },
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'Which language is used for web development?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Java', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'C++', correct: false }
        ]
    },
    {
        question: 'Which company developed JavaScript?',
        answers: [
            { text: 'Netscape', correct: true },
            { text: 'Mozilla', correct: false },
            { text: 'Microsoft', correct: false },
            { text: 'Apple', correct: false }
        ]
    },
    {
        question: 'What does JSON stand for?',
        answers: [
            { text: 'JavaScript Object Notation', correct: true },
            { text: 'JavaScript Output Name', correct: false },
            { text: 'Java Standard Object Notation', correct: false },
            { text: 'JavaScript Online Notation', correct: false }
        ]
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        answers: [
            { text: 'style', correct: true },
            { text: 'class', correct: false },
            { text: 'font', correct: false },
            { text: 'styles', correct: false }
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<script>', correct: true },
            { text: '<js>', correct: false },
            { text: '<javascript>', correct: false },
            { text: '<scripting>', correct: false }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alert("Hello World");', correct: true },
            { text: 'msgBox("Hello World");', correct: false },
            { text: 'alertBox("Hello World");', correct: false },
            { text: 'msg("Hello World");', correct: false }
        ]
    }
];

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', saveScore);

function startGame() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
    timer = setInterval(updateTime, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (!correct) {
        time -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
}

function updateTime() {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    quizScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScoreElement.textContent = time;
}

function saveScore() {
    const initials = initialsInput.value;
    if (initials) {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const newScore = {
            score: time,
            initials: initials
        };
        highScores.push(newScore);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        // Optionally, you can redirect or show a high scores list
    }
}