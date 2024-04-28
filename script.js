
// Add event listeners for buttons
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('stop-button').addEventListener('click', stopGame);
document.getElementById('reboot-button').addEventListener('click', rebootGame);

// Get the canvas element
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let intervalId = null;
let level = 1;
let speed = 100; // initial speed

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set the snake and food positions
let snake = [[20, 20], [20, 21], [20, 22]];
let food = [10, 10];

// Set the snake direction
let dir = 'right';

// Set the points counter
let points = 0;

// Draw the game board
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
}
drawBoard()

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i][0] * 10, snake[i][1] * 10, 10, 10);
    }
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food[0] * 10, food[1] * 10, 10, 10);
}

// Update the game state
function update() {
    // Move the snake
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = [...snake[i - 1]];
    }
    if (dir == 'right') {
        snake[0][0]++;
    } else if (dir == 'left') {
        snake[0][0]--;
    } else if (dir == 'up') {
        snake[0][1]--;
    } else if (dir == 'down') {
        snake[0][1]++;
    }

    // Check for collisions
    if (
        snake[0][0] < 0 ||
        snake[0][0] >= canvas.width / 10 ||
        snake[0][1] < 0 ||
        snake[0][1] >= canvas.height / 10
    ) {
        return true; // Game Over
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
            return true; // Game Over
        }
    }

    // Check for food collision
    if (snake[0][0] == food[0] && snake[0][1] == food[1]) {
        snake.push([...snake[snake.length - 1]]);
        food = [Math.floor(Math.random() * (canvas.width / 10)), Math.floor(Math.random() * (canvas.height / 10))];
        points += 100; // Add 100 points for each food eaten
    }
    return false; // Game not over
}

// Update points counter outside of canvas
// speed control
function updatePointsCounter() {
    document.getElementById('points-counter').innerText = `Points: ${points}`;
    if (points >= level * 1000) {
        level++;
        speed *= 1.1; // increase speed by 10% each level
    }
    document.getElementById('level-counter').innerText = `Level: ${level}`;
}


// Draw the game
function draw() {
    drawBoard();
    drawSnake();
    drawFood();
    updatePointsCounter()
}

// Handle key presses
document.addEventListener('keydown', function (event) {
    if (event.key == 'ArrowUp' && dir != 'down') {
        dir = 'up';
    } else if (event.key == 'ArrowDown' && dir != 'up') {
        dir = 'down';
    } else if (event.key == 'ArrowLeft' && dir != 'right') {
        dir = 'left';
    } else if (event.key == 'ArrowRight' && dir != 'left') {
        dir = 'right';
    }
    // Add the new conditions here
    if (event.key == 'Escape') {
        resetGame();
    }
    if (event.key == 'Enter') {
        startGame();
    }
    if (event.key == ' ') {
        stopGame();
    }
});

// Reset the game
function resetGame() {
    snake = [[20, 20], [20, 21], [20, 22]];
    food = [10, 10];
    dir = 'right';
    points = 0;
    speed = 100;
    level = 1;
}

// Stop game function
function stopGame() {
    // Clear the interval
    clearInterval(intervalId);
    intervalId = null;
}

// Reboot game function
function rebootGame() {
    stopGame(); // Stop the existing game loop
    resetGame();
    startGame();// Start a new game loop
}

// Reset game function (unchanged)
function resetGame() {
    snake = [[20, 20], [20, 21], [20, 22]];
    food = [10, 10];
    dir = 'right';
    points = 0; // Reset points to 0
}


// Start game function
function startGame() {

    if (intervalId) {
        clearInterval(intervalId);
    }

    // Start game loop
    // Update and draw the game at 10fps
    intervalId = setInterval(function () {
        if (update()) {
            alert('Game Over!');
            resetGame(); // Reset the game
        }
        draw();
    }, speed);

}