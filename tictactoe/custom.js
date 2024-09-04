// Assigned HTML tags to JS variables
const tic_tac_game = document.getElementById('tic_tac_game');
const boxs = document.getElementsByClassName('box');

// Predict values
const players = ['X', 'O'];
let active_player = players[0];

// Creating Message Element
const endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.textAlign = 'center';
tic_tac_game.after(endMessage);

// Listing Winning Situations
const win_situation = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// Check for a Win Situation
function check_win_situation(active_player) {
    for (const [a, b, c] of win_situation) {
        if (boxs[a].textContent === active_player &&
            boxs[b].textContent === active_player &&
            boxs[c].textContent === active_player) {
            return true;
        }
    }
    return false;
}

// Check for a Tie Situation
function check_tie_situation() {
    for (const box of boxs) {
        if (box.textContent === '') {
            return false;
        }
    }
    return true;
}

// when a restart button is clicked
function restart_btn() {
    for (const box of boxs) {
        box.textContent = "";
        box.classList.remove('xclass', 'oclass'); // Remove player-specific classes
    }
    endMessage.textContent = `X's turn!`;
    active_player = players[0];
    document.body.classList.remove('gamewin', 'gametie'); // Remove any existing game outcome classes
}

// Loop for boxes
for (const box of boxs) {
    box.addEventListener('click', () => {
        if (box.textContent !== '') {
            return; // Ignore if the box is already filled
        }
        box.textContent = active_player; // Set the current player's symbol
        // Add class based on the current player
        if (active_player === 'X') {
            box.classList.add('xclass');
        } else {
            box.classList.add('oclass');
        }
        if (check_win_situation(active_player)) {
            endMessage.textContent = `${active_player} wins!`;
            document.body.classList.add('gamewin'); // Add class to body
            return;
        }
        if (check_tie_situation()) {
            endMessage.textContent = `Game is tied!`;
            document.body.classList.add('gametie'); // Add class to body
            return;
        }
        // Switch player
        active_player = (active_player === players[0]) ? players[1] : players[0];
        endMessage.textContent = `${active_player}'s turn!`;
    });
}
