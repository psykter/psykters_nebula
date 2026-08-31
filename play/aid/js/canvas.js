// canvas.js

// Adjust the size of multiple canvases while maintaining the aspect ratio (4:3)
export function resizeCanvases(canvases) {
    if (!canvases || canvases.length === 0) {
        console.error("Canvas elements are undefined or empty.");
        return;
    }

    const containerHeight = window.innerHeight * 0.80;  // 80% of the screen height for canvases
    const availableWidth = window.innerWidth;
    const aspectRatio = 4 / 3;  // Standard aspect ratio
    let newWidth = availableWidth;
    let newHeight = newWidth / aspectRatio;

    // Scale down the width and height to fit within the container
    if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = newHeight * aspectRatio;
    }

    // Resize each canvas
    canvases.forEach((canvas) => {
        canvas.width = newWidth;
        canvas.height = newHeight;
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
    });

    console.log(`Canvases resized to ${newWidth}x${newHeight}`);
}

// Initialize resize listener and ensure all canvases are resized on window size changes
export function initResizeListener(canvases) {
    if (!canvases || canvases.length === 0) {
        console.error("No canvas elements found for resize listener.");
        return;
    }

    // Use requestAnimationFrame to debounce the resize event for smoother performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            cancelAnimationFrame(resizeTimeout);
        }
        resizeTimeout = requestAnimationFrame(() => resizeCanvases(canvases));
    });

    // Set initial canvas sizes on load
    resizeCanvases(canvases);
}
