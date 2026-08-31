// games/aid/static/js/graphics.js

import { player } from './player.js';
import { aliens } from './enemy.js';
import { bullets } from './projectile.js';

export function drawPlayer(ctx) {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

export function drawEnemies(ctx) {
    ctx.fillStyle = 'red';
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
    });
}

export function drawBullets(ctx) {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}
