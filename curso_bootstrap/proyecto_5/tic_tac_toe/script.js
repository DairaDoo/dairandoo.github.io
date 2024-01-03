let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box')); // here we convert the collections of divs into  an array.
let gameIsOver = false;


let winnerIndicator = getComputedStyle( document.body ).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

// Array con elementos nulos para no permitir al jugador, jugar en un lugar donde ya se puso X o O.
let spaces = Array(9).fill(null); 

const startGame = () => {
    boxes.forEach( box => box.addEventListener( 'click', boxClicked ) )
}


function boxClicked( e ) {

    if ( gameIsOver ) { // if someone won, end the game
        return; 
    }

    const id = e.target.id;

    // if spaces are null, contiue
    if ( !spaces[id] ) {
        spaces[id] = currentPlayer; // we switch the null id value with the user X or O value.
        e.target.innerText = currentPlayer; // then we change the id current text (null) to the user value X or O.

        if ( playerHasWon() !== false ) { // if it receives a false, no one has won yet, if it receives the array someone won.
            playerText.innerText = `${currentPlayer} has won!`; // if player won, change Tic Tac Toe to this message.
            let winning_blocks = playerHasWon();

            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicator ); // this get the elements in the box and change the background.

            gameIsOver = true; // set game over to true.
            return;
            
        }

        // ternary operation | if currentPlayer equals X change it to O | else, if currentPlayer equals X, keep it.
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT; 

    }
} 

const winCombinations = [ // winning combiations for X list.
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for ( const condition of winCombinations ) {
        let [a, b, c] = condition; // save each value of the winning combinations in these 3 variables.

        if ( spaces[a] && ( spaces[a] == spaces[b] && spaces[a] == spaces[c] ) ) { // si spaces a que contendra X o O es igual a b o c, entonces gano.
            return [a,b,c];
        }
    }
    
    return false;
}

restartBtn.addEventListener( 'click', restart )

function restart () {
    spaces.fill(null); // we change all elements of the array to null again.

    boxes.forEach( box => { // we iterate for each element in the box and set the value with nothing.
        box.innerText = '';
        box.style.backgroundColor = ''; // restart the colors of the winner.
    })

    playerText.innerText = 'Tic Tac Toe';

    currentPlayer = X_TEXT;

    gameIsOver = false; // we restart the game again.
}


startGame(); // run game