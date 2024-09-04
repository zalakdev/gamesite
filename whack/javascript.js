const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

const highscoreBoard = document.querySelector('.highscore');

const timerDisplay = document.querySelector('.timer');
let countdown;

let lastHole;
let timeUp = false;
let score = 0;
let highScore = 0;

// Retrieve high score from localStorage
function getStoredHighscore() {
  const storedHighscore = localStorage.getItem('highscore');
  return storedHighscore ? parseInt(storedHighscore, 10) : 0;
}

// Save high score to localStorage
function saveHighscore(score) {
  localStorage.setItem('highscore', score);
}

// Initialize the game
function initializeGame() {
  highscore = getStoredHighscore();
  highscoreBoard.textContent = `Highscore: ${highscore}`;
}


//get random time between min and max time
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx]; //pick random hole betwwen 0 and 8

    //prevent same hole
    if (hole === lastHole) {
      console.log('duplicate hole');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  //peep() function to make a mole appears and disappear for a random amount of time
  function peep() {
    const time = randomTime(300, 1500); //random time between 200 and 1000
    const hole = randomHole(holes); //random hole between 0 and 8

    //show the mole
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up'); //remove the 'up' class after 0.5 seconds
        if (!timeUp) peep();
    }, time);
}

function startGame() {
 // Reset the timer and start the countdown
 let timeLeft = 60; // 60 seconds for the game
 timerDisplay.textContent = `Time: ${timeLeft}s`;

 countdown = setInterval(() => {
   timeLeft--;
   timerDisplay.textContent = `Time: ${timeLeft}s`;

   if (timeLeft <= 0) {
     clearInterval(countdown);
     timeUp = true;

     // Update high score if necessary
     if (score > highscore) {
       highscore = score;
       highscoreBoard.textContent = `Highscore: ${highscore}`;
       saveHighscore(highscore);
     }

     // Show popup with the final score
     document.getElementById('final-score').textContent = `Your score is: ${score}`;
     document.getElementById('popup').style.display = 'flex';
   }
 }, 1000); // Update the timer every second

 // Hide the Play button and show the Play Again button
 document.getElementById('play-button').style.display = 'none';
 document.getElementById('play-again-button').style.display = 'inline-block';

 scoreBoard.textContent = 0;
 timeUp = false;
 score = 0;

 peep();


  // // Hide the Play button and show the Play Again button
  // document.getElementById('play-button').style.display = 'none';
  // document.getElementById('play-again-button').style.display = 'inline-block';

  // scoreBoard.textContent = 0;
  // timeUp = false;
  // score = 0;

  // peep();
  // setTimeout(() =>
  //   {
  //       timeUp = true;
  //       // Update high score if necessary
  //       if (score > highscore) {
  //         highscore = score;
  //         highscoreBoard.textContent = `Highscore: ${highscore}`;
  //         saveHighscore(highscore);

  //       }
  //     // Show popup with the final score
  //     document.getElementById('final-score').textContent = `Your score is: ${score}`;
  //     document.getElementById('popup').style.display = 'flex';
  //   },

        
  //       10000); //game duration
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}


function whack(e) {
    if (!e.isTrusted) return; //prevent checting

    
  score += 10;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = `Score: ${score}`;
}

moles.forEach(mole => mole.addEventListener('click', whack));

initializeGame();



