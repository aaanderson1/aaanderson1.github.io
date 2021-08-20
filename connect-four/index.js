document.addEventListener('DOMContentLoaded', () => 
{
const squares = document.querySelectorAll('.grid div')
const result = document.querySelector('#result')
const displayCurrentPlayer = document.querySelector('#current-player')
let CurrentPlayer = 1

for (let i = 0; i < squares.length; i++) {
    squares[i].onClick = () => {
//if the square below your current square is taken, you can go on top of it
if (squares[i + 7].classList.contains('taken')){
    if (CurrentPlayer == 1) {
        squares[i].classList.add('taken')
        squares[i].classList.add('player-one')
        currentPlayer = 2
        displayCurrentPlayer.innerHTML = currentPlayer
    }
    if (squares[i + 7].classList.contains('taken')){
    } else if (CurrentPlayer == 1) {
            squares[i].classList.add('taken')
            squares[i].classList.add('player-two')
            currentPlayer = 1
            displayCurrentPlayer.innerHTML = currentPlayer
            } 
        } else alert('cannot go here')
}

})