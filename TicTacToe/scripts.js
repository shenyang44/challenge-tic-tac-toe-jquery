let boxes = document.querySelectorAll('div');
console.log(boxes)
let count = 0;
let board = ['', '', '', '', '', '', '', '', '']
let gameState;
let playerTurn = 'X';
document.querySelector('h2').innerText = 'X starts!';

boxes.forEach((value, index) => {
    boxes[index].addEventListener('click', () => clicked(value, index))
})

function clicked(value, index) {
    if (gameState == 'over') {
        return
    }
    else if (check(index)) {
        board[index] = playerTurn
        count++;
        updateVisuals(index)
        updatePlayers()
    }
    else {
        alert('that be occupied!')
    }
    winnerCheck()
}

function check(i) {
    if (board[i] == '') {
        return true;
    }
    else {
        return false;
    }
}

function updatePlayers() {
    if (playerTurn == 'X') {
        playerTurn = 'O'
    }
    else {
        playerTurn = 'X'
    }
    document.querySelector('h2').innerText = 'Current player: ' + playerTurn;
}

function winnerCheck() {

    let xOne = board.slice(0, 3)
    let xTwo = board.slice(3, 6)
    let xThree = board.slice(6, 9)
    let yOne = [board[0], board[3], board[6]]
    let yTwo = [board[1], board[4], board[7]]
    let yThree = [board[2], board[5], board[8]]
    let dOne = [board[0], board[4], board[8]]
    let dTwo = [board[2], board[4], board[6]]

    let bigArray = [xOne, xTwo, xThree, yOne, yTwo, yThree, dOne, dTwo]

    for (let i = 0; i < bigArray.length; i++) {
        if (bigArray[i].includes('X') && (bigArray[i].includes('O') || bigArray[i].includes(''))) {
            if (count == 9) {
                document.querySelector('h1').innerHTML = 'A draw!'
                gameState = 'over'
            }
        }
        else if (bigArray[i].includes('X')) {
            document.querySelector('h1').innerHTML = 'Yay! X has won!'
            gameState = 'over'
        }
        else if (bigArray[i].includes('O') && (bigArray[i].includes('X') || bigArray[i].includes(''))) {
            if (count == 9) {
                document.querySelector('h1').innerHTML = 'A draw!'
                gameState = 'over'
            }
        }
        else if (bigArray[i].includes('O')) {
            document.querySelector('h1').innerHTML = 'Yay! O has won!'
            gameState = 'over'
        }
    }
}

function updateVisuals(i) {
    boxes[i].innerHTML = playerTurn;
}

document.querySelector('button').addEventListener('click', () => restart())

function restart() {
    count = 0;
    board = ['', '', '', '', '', '', '', '', '']
    document.querySelector('h2').innerText = 'X starts!';
    playerTurn = 'X';
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = '';
    }
    document.querySelector('h1').innerHTML = '';
    gameState = ''
}