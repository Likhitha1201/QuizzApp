const questions = [
    {
        question: "Which of the following is a JavaScript data type?",
        answers: [
            { text: 'String', correct: true },
            { text: 'Integer', correct: false },
            { text: 'Character', correct: false },
            { text: 'float', correct: false },
        ]
    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        answers: [
            { text: '# This is a comment', correct: false },
            { text: '// This is a comment', correct: true },
            { text: '&lt;!-- This is a comment --&gt;', correct: false },
            { text: '* This is a comment*', correct: false },
        ]
    },
    {
        question: "What does typeof null return in JavaScript?",
        answers: [
            { text: 'null', correct: false },
            { text: 'undefined', correct: false },
            { text: 'object', correct: true },
            { text: 'boolean', correct: false },
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: 'variable x = 5', correct: false },
            { text: 'var x = 5', correct: true },
            { text: 'let = 5', correct: false },
            { text: 'int x = 5', correct: false },
        ]
    },
    {
        question: "Which method is used to output data to the browser console?",
        answers: [
            { text: 'alert()', correct: false },
            { text: 'promt()', correct: false },
            { text: 'console.log()', correct: true },
            { text: 'document.write()', correct: false },
        ]
    },
    {
        question: "What will 2 + '2' return in JavaScript?",
        answers: [
            { text: '4', correct: false },
            { text: '22', correct: true },
            { text: 'NaN', correct: false },
            { text: 'Error', correct: false },
        ]
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        answers: [
            { text: '=', correct: false },
            { text: '==', correct: false },
            { text: '===', correct: true },
            { text: '!=', correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz(); 
