// games/aid/static/js/projectile.js

export let bullets = [];

export function shoot(player) {
    bullets.push({
        x: player.x + player.width / 2 - 2.5,  // Center the bullet
        y: player.y,
        width: 5,
        height: 10,
        speed: 7  // Speed of the bullet
    });
}

export function updateBullets(deltaTime, canvas) {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed * (deltaTime / 16);  // Move bullet upwards

        // Remove bullets that are off the screen
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }

        drawBullet(bullet, canvas);
    });
}

function drawBullet(bullet, canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
}
