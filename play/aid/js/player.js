// player.js

export class Player {
    constructor(starFighterLv1Url) {
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.level = 1;
        this.imageLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.imageLoaded = true;  // Set flag when the image has loaded
        };
        this.image.onerror = () => {
            console.error("Failed to load player image from: ", this.image.src);
        };

        // Use the URL passed for the player's image
        this.image.src = starFighterLv1Url;
    }

    initPlayerPosition(canvas) {
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 60;  // Position near bottom of canvas
    }

    movePlayer(deltaTime, canvas, keys) {
        const speed = 7;
        const distance = speed * (deltaTime / 16);

        if (keys.left && this.x > 0) {
            this.x -= distance;
        }
        if (keys.right && this.x + this.width < canvas.width) {
            this.x += distance;
        }
    }

    drawPlayer(ctx) {
        if (this.imageLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            console.warn("Player image is not yet loaded.");
        }
    }
}

// Handle keydown and keyup events
export let keys = { left: false, right: false };

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
});
