// Set up canvas and context
var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");
document.body.style.overflow = "hidden";

// Initialize game state variables
var snake, food, direction, score, gameOver, gameLoop;

function initGame() {
    // Initialize game state
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    direction = "right";
    score = 0;
    gameOver = false;

    // Listen for keyboard input
    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 38 && direction !== "down") direction = "up";
        else if (event.keyCode === 40 && direction !== "up") direction = "down";
        else if (event.keyCode === 37 && direction !== "right") direction = "left";
        else if (event.keyCode === 39 && direction !== "left") direction = "right";
    });

    // Start the game loop
    clearInterval(gameLoop); // Prevent multiple loops
    gameLoop = setInterval(() => {
        moveSnake();
        draw();
        if (gameOver) {
            clearInterval(gameLoop);
            alert("Game Over! Your score: " + score);
        }
    }, 100);

    draw(); // Draw initial state
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#c869ff";
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }

    // Draw food
    ctx.fillStyle = "white";
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

function moveSnake() {
    var head = { x: snake[0].x, y: snake[0].y };

    // Move head
    if (direction === "up") head.y--;
    else if (direction === "down") head.y++;
    else if (direction === "left") head.x--;
    else if (direction === "right") head.x++;

    // Check collisions
    if (
        head.x < 0 || head.x >= canvas.width / 10 ||
        head.y < 0 || head.y >= canvas.height / 10
    ) {
        gameOver = true;
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            return;
        }
    }

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head); // Add head
        score += 10;
        food.x = Math.floor(Math.random() * (canvas.width / 10));
        food.y = Math.floor(Math.random() * (canvas.height / 10));
    } else {
        // Move snake
        snake.pop();        // Remove tail
        snake.unshift(head); // Add new head
    }
}

