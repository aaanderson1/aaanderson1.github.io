var questions = [
    // question 1
    {
        question: "Whose house did they live in?",
        answers: [
            "Rose's",
            "Blanche's",
            "Dorothy's",
            "Sophia's",
        ],
        correct_index: 1,
        image_src: "assets/images/blanche.jpg"
    },
    // question 2
    {
        question: "What city do they live in?",
        answers: [
            "New Orleans, LA",
            "Nashville, TN",
            "Los Angeles, CA",
            "Miami, FL",
        ],
        correct_index: 3,
        image_src: "assets/images/blanche2.jpg"
    },
    // question 3
    {
        question: "What is their go-to dessert?",
        answers: [
            "Cherry Pie",
            "Chocolate Chip Cookies",
            "Cheesecake",
            "Macaroons",
        ],
        correct_index: 2,
        image_src: "assets/images/burtreynolds.jpg"
    },
    // question 4
    {
        question: "Where is Rose from?",
        answers: [
            "Chicago, IL",
            "Cleveland, OH",
            "St. Olaf, MN",
            "Nashville, TN",
        ],
        correct_index: 2,
        image_src: "assets/images/groupphoto2.jpg"
    },
    // question 5
    {
        question: "What retirement home did Sophia live in?",
        answers: [
            "Shady Pines",
            "Coconut Grove",
            "Sunrise Pointe",
            "Coral Gables",
        ],
        "correct_index": 0,
        image_src: "assets/images/sophia.jpg"
    },
    // question 6
    {
        question: "What was Rose's late husband's name?",
        answers: [
            "Frank",
            "Charlie",
            "Ralph",
            "Alfred",
        ],
        correct_index: 1,
        image_src: "assets/images/groupphoto3.jpg"
    },
    // question 7
    {
        question: "Where is Sophia from?",
        answers: [
            "Rome, Italy",
            "Sicily, Italy",
            "Venice, Italy",
            "Florence, Italy",
        ],
        correct_index: 1,
        image_src: "assets/images/sophia2.jpg"
    },
    // question 8
    {
        question: "What is Dorothy's ex-husband's name?",
        answers: [
            "Maurice",
            "Stan",
            "Lawrence",
            "Roland",
        ],
        correct_index: 1,
        image_src: "assets/images/dorothymad.jpg"
    },
    // question 9
    {
        question: "When Blanche's house gets robbed, where does she find her jewelry?",
        answers: [
            "In the freezer",
            "The Lanai",
            "Under the kitchen sink",
            "On the coffee table",
        ],
        correct_index: 0,
        image_src: "assets/images/groupphoto4.jpg"
    },
    // question 10
    {
        question: "What was Sophia's late husband's name?",
        answers: [
            "Walter",
            "Terrence",
            "Rupert",
            "Sal",
        ],
        correct_index: 3,
        image_src: "assets/images/jail.jpg"
    },
    // question 11
    {
        question: "True or False: Dorothy remarries her ex-husband",
        answers: [
            "True",
            "False",
        ],
        correct_index: 1,
        image_src: "assets/images/georgeclooney.jpg"
    },
    // question 12
    {
        question: "When did The Golden Girls air?",
        answers: [
            "1984 - 1995, 200 episodes, 8 seasons",
            "1985 - 1992, 180 episodes, 7 seasons",
            "1989 - 1993, 145 episodes, 6 seasons",
            "1987 - 1991, 125 episodes, 4 seasons",
        ],
        correct_index: 1,
        image_src: "assets/images/groupphoto5.jpg"
    },
    // question 13
    {
        question: "True or False - The actresses who played Rose and Blanche were originally going to play opposite roles?",
        answers: [
            "True",
            "False",
        ],
        correct_index: 0,
        image_src: "assets/images/slater.jpg"
    },
    // question 14
    {
        question: "Who took the longest to have her makeup done for each episode?",
        answers: [
            "Blanche",
            "Rose",
            "Dorothy",
            "Sophia",
        ],
        correct_index: 3,
        image_src: "assets/images/sophia.jpg"
    },
    // question 15
    {
        question: "Which Golden Girl is still living, having outlived the rest?",
        answers: [
            "Blanche, aka Rue McClanahan, age 85",
            "Betty White, aka Rose, age 97",
            "Bea Arthur, aka Dorothy, age 97",
            "Estelle Getty, aka Sophia, age 96",
        ],
        correct_index: 1,
        image_src: "assets/images/groupphoto2.jpg"
    },
];

var correctAnswers;
var wrongAnswers;
var playQuestions;
var currentQuestion;

function shuffleArray(array) {
    var newArray = array.slice();
    for (var i = 0; i < newArray.length; ++i) {
        var randomIndex = Math.floor(Math.random() * newArray.length);
        var temp = newArray[randomIndex];
        newArray[randomIndex] = newArray[i];
        newArray[i] = temp;
    }
    return newArray;

}

function setupQuestions() {
    correctAnswers = 0;
    wrongAnswers = 0;
    playQuestions = shuffleArray(questions);
    currentQuestion = -1;
    selectQuestion();
}


var question = document.getElementById("question");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var startPage = document.getElementById("start");
var startButton = document.getElementById("start-button");
var game = document.getElementById("game");
var endPage = document.getElementById("end");
var stats = document.getElementById("stats");
var questionImage = document.getElementById("question-img");
button1.addEventListener("click", () => {
    checkAnswer(0);
});
button2.addEventListener("click", () => {
    checkAnswer(1);
});
button3.addEventListener("click", () => {
    checkAnswer(2);
});
button4.addEventListener("click", () => {
    checkAnswer(3);
});
var buttons = [button1, button2, button3, button4];

startButton.addEventListener("click", () => {
    reset();
});

var resetButtonEnd = document.getElementById("reset-button-end");
resetButtonEnd.addEventListener("click", () => {
    reset();
});

function selectQuestion() {
    if (++currentQuestion >= playQuestions.length) {
        endGame();
        return;
    }

    var questionObject = playQuestions[currentQuestion];
    question.innerHTML = questionObject.question;

    questionImage.src = questionObject.image_src;

    for (var i = 0; i < buttons.length; ++i) {
        var button = buttons[i];
        if (i >= questionObject.answers.length) {
            button.style.display = "none";
            continue;
        } else {
            button.style.display = "inline-block";
        }
        button.innerHTML = questionObject.answers[i];
    }
    resetTimer();
}

function checkAnswer(chosenIndex) {
    var correctIndex = playQuestions[currentQuestion].correct_index;
    if (chosenIndex === correctIndex) {
        ++correctAnswers;
    } else {
        ++wrongAnswers;
    }
    selectQuestion();
}

// timer section
function timeStringFromSeconds(seconds) {
    return `${formatNumber(seconds)}`;
}

function formatNumber(number) {
    return `${number}`.padStart(2, '0');
}

var intervalHandle;

function clearTimerInterval() {
    if (intervalHandle) {
        clearInterval(intervalHandle);
    }
    intervalHandle = undefined;
}

function resetTimer() {
    clearTimerInterval();
    var timer = document.getElementById("timer");
    var seconds = 15;
    timer.innerHTML = timeStringFromSeconds(seconds);
    intervalHandle = setInterval(() => {
        seconds -= 1;
        timer.innerHTML = timeStringFromSeconds(seconds);
        checkTimerEnd(seconds);
    }, 1000);
}

function reset() {
    startPage.style.display = "none";
    endPage.style.display = "none";
    game.style.display = "block";
    var resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        reset();
    });
    setupQuestions();
}

function endGame() {
    clearTimerInterval();
    game.style.display = "none";
    endPage.style.display = "block";
    var percentage = Math.floor(correctAnswers / playQuestions.length * 100);
    if (percentage < 50) {
        stats.innerText = `Unfortunately you got ${percentage}% correct. Better luck next time.`;
    } else if (percentage > 50 && percentage < 100) {
        stats.innerText = `Great job you got ${percentage}% correct. Try to get 100% next time.`;
    } else {
        stats.innerText = `No one knows the girls better than you.`;
    }
}

function checkTimerEnd(seconds, intervalHandle) {
    if (seconds <= 0) {
        clearTimerInterval();
        ++wrongAnswers;
        selectQuestion();
    }
}
