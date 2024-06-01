// src/js/javascript.js
document.addEventListener('DOMContentLoaded', function () {
    const soundEffect = new Audio('../media/sounds/your-sound-file.mp3');

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseover', () => {
            soundEffect.play();
        });
    });
});
