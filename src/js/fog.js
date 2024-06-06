// src/js/fog.js
document.addEventListener('DOMContentLoaded', function () {
    const fogContent = document.querySelector('.fog-content');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const revealPosition = fogContent.offsetTop - window.innerHeight + 100;
        if (scrollPosition > revealPosition) {
            fogContent.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        } else {
            fogContent.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
    });
});
