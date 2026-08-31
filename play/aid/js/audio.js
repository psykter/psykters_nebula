// audio.js

export let shootSound = new Audio(shootSoundUrl);  // Dynamically generated URL
export let explosionSound = new Audio(explosionSoundUrl);  // Dynamically generated URL

shootSound.addEventListener('canplaythrough', () => {
    console.log('Shoot sound loaded successfully');
});
shootSound.onerror = (err) => {
    console.error('Error loading shoot sound:', err);
};

explosionSound.addEventListener('canplaythrough', () => {
    console.log('Explosion sound loaded successfully');
});
explosionSound.onerror = (err) => {
    console.error('Error loading explosion sound:', err);
};


export function playShootSound() {
    shootSound.currentTime = 0;  // Reset the sound to start from the beginning
    shootSound.play().catch((err) => {
        console.log('Error playing shoot sound:', err);
    });
}

export function playExplosionSound() {
    explosionSound.currentTime = 0;  // Reset the sound to start from the beginning
    explosionSound.play().catch((err) => {
        console.log('Error playing explosion sound:', err);
    });
}
