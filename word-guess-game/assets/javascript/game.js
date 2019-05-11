var turnsRemaining = 0;
var maxGuesses = 10;
var guesses = "";
var results = "";
var playText = document.getElementById("play-text");
var guessesRemainingText = document.getElementById("guesses-remaining-text");
var guessText = document.getElementById("guess-text");
var birdimage = document.getElementById("birdimage");
var birdSpecies = [
    "Amazon",
    "Macaw",
    "Cockatoo",
    "Parakeet",
    "Cockatiel",
    "Ringneck",
    "Parrotlet",
    "Lovebird",
    "Finch",
    "Conure",
    "Dove",
    "Pigeon",
    "Quaker",
    "Caique",
    "Eclectus",
    "Lorikeet",
    "Pionus",
    "Canary",
    "Chicken",
    "Duck",
    "Senegal",
    "Toucan",      
];

var chosenWord = "";
var gameEnded = false;
var messageArea = document.getElementById("message-area");


function reset(){
    gameEnded = false;
    turnsRemaining = maxGuesses;
    guessesRemainingText.innerText = `Guesses Remaining: ${turnsRemaining}`;
    var arrayCount = birdSpecies.length; 
    var randomIndex = Math.floor(Math.random() * arrayCount);  
    console.log(randomIndex);
    chosenWord = birdSpecies[randomIndex];
    chosenWord = chosenWord.toLowerCase();
    console.log(chosenWord);
    var tempWord = "";
    for (var i=0; i < chosenWord.length; ++i) {
        tempWord = tempWord.concat("_");
    } 
    playText.innerHTML = tempWord; 
    guessText.innerHTML = "";
    messageArea.innerHTML = "Type to play";
    guesses = "";
}
reset();

document.addEventListener('keydown', function(event) {
    if (event.keyCode < 65 || event.keyCode > 90) {
        return;
    }
    var character = String.fromCharCode(event.keyCode); 
    character = character.toLowerCase();
    evaluate(character);
});

function evaluate(character) {    
    if (gameEnded) {
        return;
    }
    messageArea.innerHTML = "";
    console.log(character); 
    if (chosenWord.includes(character)) {
        console.log("Correct!");
        correct(character);
    } else {
        console.log("Wrong!");
        wrong(character);
    }
}

function correct(character) {
    var playWord = playText.innerHTML;
    for (var i = 0; i < chosenWord.length; ++i) {
        if (chosenWord[i] === character && playWord[i] === "_") {
            playWord = playWord.substring(0, i) + chosenWord[i] + playWord.substring(i + 1, chosenWord.length);
        }
    }
    playText.innerHTML = playWord;
    if (!playWord.includes("_")) {
        win();
    }
}

function wrong(character) {
    if (guesses.includes(character)) {
        return;
    }
    guesses = guesses.concat(character);
    guessText.innerHTML = guesses;

    turnsRemaining = turnsRemaining - 1;
    if (turnsRemaining === 0) {
        lose();
    }

    guessesRemainingText.innerText = `Guesses Remaining: ${turnsRemaining}`;
}

function win() {
    gameEnded = true;
    messageArea.innerHTML = "You Won!!";
    revealBird();
    reset();
}

function lose() {
    gameEnded = true;
    messageArea.innerHTML = "You Lose!!";
    // window.alert("You lose!! :-(");
    revealBird();
    reset();
}

function revealBird() {
    birdimage.style.backgroundImage = `url(assets/images/${chosenWord}.jpg)`;

}

