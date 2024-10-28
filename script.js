document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const bannerImage = document.getElementById('banner-image');
    const body = document.body;

    // Apply saved theme without default preference
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    } else if (localStorage.getItem('theme') === 'light') {
        enableLightMode();
    }

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            enableLightMode();
            localStorage.setItem('theme', 'light');
        } else {
            enableDarkMode();
            localStorage.setItem('theme', 'dark');
        }
    });

    // Functions to enable light and dark modes
    function enableDarkMode() {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        bannerImage.src = 'NOCWHITEBACKGROND.png';
    }

    function enableLightMode() {
        body.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        bannerImage.src = 'NOC2024bg.png';
    }
});