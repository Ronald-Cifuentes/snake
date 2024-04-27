// Get the canvas element
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set the snake and food positions
var snake = [[20, 20], [20, 21], [20, 22]];
var food = [10, 10];

// Set the snake direction
var dir = 'right';

// Draw the game board
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    for (var i = 0; i < snake.length; i++) {
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
    for (var i = snake.length - 1; i > 0; i--) {
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
    for (var i = 1; i < snake.length; i++) {
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
            return true; // Game Over
        }
    }

    // Check for food collision
    if (snake[0][0] == food[0] && snake[0][1] == food[1]) {
        snake.push([...snake[snake.length - 1]]);
        food = [Math.floor(Math.random() * (canvas.width / 10)), Math.floor(Math.random() * (canvas.height / 10))];
    }
    return false; // Game not over
}

// Draw the game
function draw() {
    drawBoard();
    drawSnake();
    drawFood();
}

// Update and draw the game at 10fps
setInterval(function () {
    if (update()) {
        alert('Game Over!');
        return;
    }
    draw();
}, 100);

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
});