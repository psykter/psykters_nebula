// enemy.js

import { playShootSound, playExplosionSound } from './audio.js';
export let aliens = [];
export let alienBullets = [];

// Declare flags to check if images are loaded
let alienDarkImageLoaded = false;
let alienInvaderDarkImage = new Image();
alienInvaderDarkImage.src = alienInvaderDarkUrl;
alienInvaderDarkImage.onload = () => {
    alienDarkImageLoaded = true;
    console.log('Dark alien image loaded.');
};
alienInvaderDarkImage.onerror = () => {
    console.error("Failed to load alien-invader-dark.png.");
};

// Alien configuration
const alienConfig = {
    width: 40,
    height: 40,
    startX: 0,  // Initial start position
    startY: 50,
    speed: 2,
};

// Spawn one alien at top-left and move to the center
export function spawnAliens(canvas) {
    const alien = {
        x: alienConfig.startX,
        y: alienConfig.startY,
        width: alienConfig.width,
        height: alienConfig.height,
        targetX: (canvas.width - alienConfig.width) / 2,  // Center horizontally
        targetY: 50,  // Stay at the top
        speed: alienConfig.speed,
        arrived: false,
        shooting: false,
        image: alienInvaderDarkImage,
    };
    aliens.push(alien);
}

// Move the alien to the target position (center)
export function moveAliens(deltaTime, canvas) {
    const ctx = canvas.getContext('2d');

    if (alienDarkImageLoaded) {
        aliens.forEach(alien => {
            const dx = alien.targetX - alien.x;
            const dy = alien.targetY - alien.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 1) {
                alien.x += (dx / distance) * alien.speed;
                alien.y += (dy / distance) * alien.speed;
            } else if (!alien.shooting) {
                alien.arrived = true;
                alien.shooting = true;
                startAlienAttackPattern(alien, canvas);  // Start shooting once arrived
            }

            // Draw the alien at its current position
            ctx.clearRect(alien.x, alien.y, alien.width, alien.height);
            ctx.drawImage(alien.image, alien.x, alien.y, alien.width, alien.height);
        });
    }
}

// Start alien attack pattern (shooting)
function startAlienAttackPattern(alien, canvas) {
    if (!alien.shooting) return;

    // Fire every 2 seconds once alien has reached the target
    setInterval(() => {
        alienShoot(alien, canvas);
    }, 2000);  // Shoot every 2 seconds
}

// Alien shooting logic
function alienShoot(alien, canvas) {
    if (!alien.shooting) return;

    // Create a new bullet for the alien
    const bullet = {
        x: alien.x + alien.width / 2 - 2,  // Start from the center of the alien
        y: alien.y + alien.height,
        width: 5,
        height: 10,
        speed: 3,  // Bullet speed
    };
    alienBullets.push(bullet);
}

// Move and draw alien bullets
export function moveAlienBullets(deltaTime, canvas) {
    const ctx = canvas.getContext('2d');

    alienBullets.forEach((bullet, index) => {
        // Move the bullet downward
        bullet.y += bullet.speed * (deltaTime / 16);

        // Draw the bullet in red
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Remove bullet if it goes off-screen
        if (bullet.y > canvas.height) {
            alienBullets.splice(index, 1);  // Remove bullet from array
        }
    });
}

// Collision detection between alien bullets and player
export function detectPlayerCollisions(alienBullets, player, ctx, lives, setLives, endGame) {
    alienBullets.forEach((bullet, bulletIndex) => {
        if (
            bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y
        ) {
            console.log('Player hit!');
            playExplosionSound();  // Play explosion sound when player is hit

            // Clear bullet and handle player damage
            ctx.clearRect(bullet.x, bullet.y, bullet.width, bullet.height);
            alienBullets.splice(bulletIndex, 1);

            // Decrease player's lives or end game
            setLives(lives - 1);  // Update lives using the setLives function
            if (lives <= 1) {
                endGame();
            }
        }
    });
}

// Collision detection between player's bullets and aliens
export function detectAlienCollisions(bullets, ctx) {
    bullets.forEach((bullet, bulletIndex) => {
        aliens.forEach((alien, alienIndex) => {
            if (
                bullet.x < alien.x + alien.width &&
                bullet.x + bullet.width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y
            ) {
                console.log('Alien hit!');
                playExplosionSound();  // Play explosion sound on hit

                // Remove alien and bullet on collision
                ctx.clearRect(alien.x, alien.y, alien.width, alien.height);  // Clear alien from canvas
                aliens.splice(alienIndex, 1);  // Remove alien
                bullets.splice(bulletIndex, 1);  // Remove bullet
            }
        });
    });
}
