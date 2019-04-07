var wins = 0;
var losses = 0;
var ultimateNumber = 0;
var currentScore = 0;
var pinkNumber = 20;
var blueNumber = 10;
var redNumber = 5;
var greenNumber =1;

$(document).ready( function() {
    $("#pinkgem").on("click", function() {
        pinkgem();
    });
    $("#bluegem").on("click", function() {
        bluegem();
    });
    $("#redgem").on("click", function() {
        redgem();
    });
    $("#greengem").on("click", function() {
        greengem();
    });
    reset();
});

function getRandom(lowNumber, highNumber) {
    var randomRange = (highNumber - lowNumber);
    var number = Math.floor(Math.random() * randomRange); 
    return number + lowNumber;
}
function reset() {
    ultimateNumber = getRandom(19, 121);
    var ultimateElement = $("#ultimateNumber");
    ultimateElement.text(ultimateNumber);
    updateScore(0);
    var winsElement = $("#wins");
    winsElement.text(`Wins: ${wins}`);
    var losesElement = $("#losses");
    losesElement.text(`Losses: ${losses}`);
    pinkNumber = getUniqueRandomGem();
    blueNumber = getUniqueRandomGem();
    redNumber = getUniqueRandomGem();
    greenNumber = getUniqueRandomGem();
    console.log(pinkNumber);
    console.log(blueNumber);
    console.log(redNumber);
    console.log(greenNumber);
} 

function updateScore(newScore){
    currentScore = newScore;
    var scoreElement = $("#score");
    scoreElement.text(currentScore);
    winlosecheck();
}
function pinkgem(){
    updateScore(currentScore + pinkNumber);
}
function bluegem(){
    updateScore(currentScore + blueNumber);
}
function redgem(){
    updateScore(currentScore + redNumber);
}
function greengem(){
    updateScore(currentScore + blueNumber);
}

function winlosecheck() {
// see if match to be winner
    if(currentScore === ultimateNumber) {
        wins = wins + 1;

        reset();
    } 
// see if exceeds limit
    if(currentScore > ultimateNumber) {
        losses = losses + 1;

        reset();
    }
}
function getUniqueRandomGem() {
    var randomNumber = getRandom(1, 13);
    while(!isRandomGemNumberUnique(randomNumber)){
        randomNumber = getRandom(1, 13);
    }
    return randomNumber;
}
function isRandomGemNumberUnique(randomNumber){
    if (randomNumber === pinkNumber ||
        randomNumber === blueNumber ||
        randomNumber === redNumber ||
        randomNumber === greenNumber) {
        return false;
    }
    
    return true;
}
