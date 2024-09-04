//DOM Elements
const playBoard = document.querySelector(".play-board");
const scoreElement  = document.querySelector(".score"); 
const highScoreElement = document.querySelector(".high-score");

let gameOver = false; //variable to track the game over status
let foodX, foodY; //variables to track the food position
let snakeX = 5, snakeY = 5; //initial position of the snake
let snakeBody = [];
let velocityX = 0, velocityY = 0; //snake movement
let setIntervalId;
let score = 0;

//getting high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML =  `High Score: ${highScore}`;


// Function to randomly generate the food's position on the board
const changeFoodPosition = () => {

    //passign random 0-30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Function to handle the game-over scenario

const handleGameOver = () => {
    clearInterval(setIntervalId); //stop the game loop
    document.getElementById('finalScore').innerText = score; //display final score
    document.getElementById('gameOverModal').style.display = 'block'; //show game-over modal
}

// Function to restart the game
const restartGame = () => {
    location.reload(); //reload the page
}
    

// Function to change the direction of the snake based on key presses
const changeDirection = (e) => {
    //changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY !== 1){
        velocityX = 0;
        velocityY = -1;

    } else if (e.key === "ArrowDown" && velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    }else if (e.key === "ArrowRight" && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
   
}

// Function to initialize and run the game loop
const initGame = () => {
    if(gameOver) 
        return handleGameOver(); //stop the game if game-over is true
    
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

//checking if the snake has eaten the food
if(snakeX === foodX && snakeY === foodY){
    changeFoodPosition(); //generate new food position
    snakeBody.push([foodX, foodY]); //add new part to the snake body
    score++; //Increase the score

    // Increase difficulty by reducing the interval time
    clearInterval(setIntervalId);
    let speed = 125 - (score * 5);  // Adjust speed based on score
    speed = speed < 50 ? 50 : speed;  // Cap the minimum speed
    setIntervalId = setInterval(initGame, speed);

    //update the highscore if the currect score 
    highScore = score >= highScore ? score: highScore;
    localStorage.setItem("high-score", highScore);

    //update the score and high score deplay
    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML =   `High Score: ${highScore}`;
}

//move snake body
for (let i = snakeBody.length - 1; i > 0; i--){
    snakeBody[i] = snakeBody[i - 1];

}
snakeBody[0] = [snakeX, snakeY]; //update the snake head position

   // Update the snake's position based on velocity
    snakeX += velocityX;
    snakeY += velocityY;


    //check if the snake has hit the boundries
if(snakeX <=0 || snakeX >= 30 || snakeY <= 0 || snakeY >= 30){
    
    gameOver = true; //end the game
}


   // Check if the snake has collided with itself
for(let i = 0; i < snakeBody.length; i++){
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // If the snake's head collides with any part of its body
    if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true; //end the game
    }
}

    // htmlMarkup += <div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>;
    playBoard.innerHTML = htmlMarkup; // Render the snake and food on the board
}

//generate the first food position
changeFoodPosition();

//start the game loop
setIntervalId = setInterval(initGame, 125);
//change the direction on key press
document.addEventListener("keydown", changeDirection);