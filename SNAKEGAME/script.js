const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20; // Grid size for the game
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let apple = { x: 0, y: 0, letter: randomLetter() };
let velocity = { x: gridSize, y: 0 };

function randomLetter() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generates random letters from A to Z
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    placeApple(); // Place the apple when resizing the canvas
}

function drawBoundary() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.strokeRect(gridSize, gridSize, canvas.width - 2 * gridSize, canvas.height - 2 * gridSize);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize - 1, gridSize - 1);
    });
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(apple.letter, apple.x + 5, apple.y + 15);
}

function moveSnake() {
    let head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
    if (head.x < gridSize || head.x >= canvas.width - gridSize || head.y < gridSize || head.y >= canvas.height - gridSize) {
        return false; // Snake hits the boundary
    }
    snake.unshift(head);
    if (head.x === apple.x && head.y === apple.y) {
        playLetterSound(apple.letter); // Play sound when eating the apple
        placeApple();
    } else {
        snake.pop();
    }
    return true;
}

function placeApple() {
    let maxGridX = (canvas.width - 2 * gridSize) / gridSize;
    let maxGridY = (canvas.height - 2 * gridSize) / gridSize;
    apple.x = (Math.floor(Math.random() * maxGridX) + 1) * gridSize;
    apple.y = (Math.floor(Math.random() * maxGridY) + 1) * gridSize;
    apple.letter = randomLetter();
}

function playLetterSound(letter) {
    const soundElement = document.getElementById('letterSound');
    soundElement.src = `sounds/${letter}.mp3`; // Path to audio files
    soundElement.play();
}

function restartGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    placeApple();
    velocity = { x: gridSize, y: 0 };
    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoundary();
    drawSnake();
    drawApple();
    if (!moveSnake()) {
        setTimeout(restartGame, 2000); // Restart game after a delay if the snake hits the boundary
    } else {
        setTimeout(gameLoop, 100);
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && velocity.x === 0) velocity.x = -gridSize, velocity.y = 0;
    if (e.key === 'ArrowRight' && velocity.x === 0) velocity.x = gridSize, velocity.y = 0;
    if (e.key === 'ArrowUp' && velocity.y === 0) velocity.y = -gridSize, velocity.x = 0;
    if (e.key === 'ArrowDown' && velocity.y === 0) velocity.y = gridSize, velocity.x = 0;
});

window.addEventListener('resize', resizeCanvas, false);

// Start the game
window.onload = function() {
    resizeCanvas();
    gameLoop();
};

