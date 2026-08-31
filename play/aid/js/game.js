import { Player, keys } from './player.js';
import { aliens, moveAliens, spawnAliens, alienBullets, moveAlienBullets, detectPlayerCollisions, detectAlienCollisions } from './enemy.js';
import { resizeCanvases, initResizeListener } from './canvas.js';  // Import the correct canvas function
import { bullets, shoot, updateBullets } from './projectile.js';
import { playShootSound } from './audio.js';

let gameCanvas, ctx;
let scoreElement, livesElement, startButton;
let score = 0;
let lives = 3;
let isGameRunning = false;
let lastFrameTime = 0;
let player;

function setLives(newLives) {
    lives = newLives;
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);  // Clear canvas before re-drawing UI
    drawUI();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the single canvas
    gameCanvas = document.getElementById('gameCanvas');

    if (!gameCanvas) {
        console.error("Game canvas not found!");
        return;
    }

    // Get the 2D drawing context for the game canvas
    ctx = gameCanvas.getContext('2d');

    // Get DOM elements for game controls
    scoreElement = document.getElementById('score');
    livesElement = document.getElementById('lives');
    startButton = document.getElementById('start-btn');

    // Initialize player
    player = new Player(starFighterLv1Url);

    // Resize the canvas
    initResizeListener([gameCanvas]);

    player.initPlayerPosition(gameCanvas);

    // Static background drawing (if needed)
    drawBackground();

    // Spawn initial alien(s)
    spawnAliens(gameCanvas);

    // Start game button event handler
    startButton.addEventListener('click', handleStartButtonClick);
});

// Add game loop and other logic here (gameLoop, initGame, etc.)

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === ' ') {
        shoot(player);
        playShootSound();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
});

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (isGameRunning) {
        // Clear the game canvas (everything gets redrawn each frame)
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Draw the background
        drawBackground();

        // Move and draw player
        player.movePlayer(deltaTime, gameCanvas, keys);
        player.drawPlayer(ctx);

        // Update bullets and move enemy bullets
        updateBullets(deltaTime, gameCanvas, ctx);
        moveAlienBullets(deltaTime, gameCanvas);

        // Collision detections
        detectPlayerCollisions(alienBullets, player, ctx, lives, setLives, endGame);
        detectAlienCollisions(bullets, ctx);

        // Move aliens and draw them
        moveAliens(deltaTime, gameCanvas);

        // Draw UI on top
        drawUI();

        requestAnimationFrame(gameLoop);
    }
}

function initGame() {
    score = 0;
    setLives(3);
    aliens.length = 0;
    player.initPlayerPosition(gameCanvas);
    lastFrameTime = 0;
    isGameRunning = true;
    spawnAliens(gameCanvas);  // Spawn the alien
    requestAnimationFrame(gameLoop);
}

function handleStartButtonClick() {
    if (!isGameRunning) {
        initGame();
    }
}

function endGame() {
    isGameRunning = false;
    alert('Game Over!');
    console.log('Game Over');
}

// Function to draw static background
function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Example: Draw some stars or background pattern
    ctx.fillStyle = "white";
    for (let i = 0; i < 100; i++) {
        let x = Math.random() * gameCanvas.width;
        let y = Math.random() * gameCanvas.height;
        ctx.fillRect(x, y, 2, 2);
    }
}

// Function to draw UI (score, lives, etc.)
function drawUI() {
    ctx.font = "20px Orbitron";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillText(`Lives: ${lives}`, 20, 60);
}
