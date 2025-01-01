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
        bannerImage.src = 'NOC2024-v2-dark.png';
        body.style.backgroundColor = '#333';
    }

    function enableLightMode() {
        body.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        bannerImage.src = 'NOC2024-v2-white.png';
        body.style.backgroundColor = '#F1EFEF';
    }
});

// English Date-Time
function updateTime() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Check if the 'date-time' element exists before updating
    const dateTimeElement = document.getElementById('date-time');
    if (dateTimeElement) {
        dateTimeElement.innerHTML = `${day}, ${date} | ${time}`;
    }
}

// Tamil Date-Time
function updateTimeTamil() {
    const now = new Date(); // to test - new Date(2025, 0, 10, 15, 45, 30); // Jan 10, 2025, 3:45:30 PM
    // Tamil months with their Gregorian start dates for 2025
    const tamilMonths = [
        { name: "தை", start: new Date(2025, 0, 15) }, // Mid-Jan to Mid-Feb
        { name: "மாசி", start: new Date(2025, 1, 15) }, // Mid-Feb to Mid-Mar
        { name: "பங்குனி", start: new Date(2025, 2, 15) }, // Mid-Mar to Mid-Apr
        { name: "சித்திரை", start: new Date(2025, 3, 14) }, // Mid-Apr to Mid-May
        { name: "வைகாசி", start: new Date(2025, 4, 15) }, // Mid-May to Mid-Jun
        { name: "ஆனி", start: new Date(2025, 5, 15) }, // Mid-Jun to Mid-Jul
        { name: "ஆடி", start: new Date(2025, 6, 15) }, // Mid-Jul to Mid-Aug
        { name: "ஆவணி", start: new Date(2025, 7, 15) }, // Mid-Aug to Mid-Sep
        { name: "புரட்டாசி", start: new Date(2025, 8, 15) }, // Mid-Sep to Mid-Oct
        { name: "ஐப்பசி", start: new Date(2025, 9, 18) }, // Mid-Oct to Mid-Nov
        { name: "கார்த்திகை", start: new Date(2025, 10, 16) }, // Mid-Nov to Mid-Dec
        { name: "மார்கழி", start: new Date(2024, 11, 16) } // Mid-Dec 2024 to Mid-Jan 2025
    ];

    // Find the current Tamil month
    let tamilMonth = tamilMonths[tamilMonths.length - 1]; // Default to Margazhi
    let tamilDay = 1;

    for (let i = 0; i < tamilMonths.length; i++) {
        if (now >= tamilMonths[i].start && (i === tamilMonths.length - 1 || now < tamilMonths[i + 1].start)) {
            tamilMonth = tamilMonths[i];
            tamilDay = Math.floor((now - tamilMonth.start) / (1000 * 60 * 60 * 24)) + 1;
            break;
        }
    }

    // Tamil days of the week
    const tamilDays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
    const day = tamilDays[now.getDay()];

    const year = now.getFullYear();

    // Format time
    const [time, suffix] = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).split(" ");

    // Update the DOM element
    const dateTimeTamilElement = document.getElementById('date-time-tamil');
    if (dateTimeTamilElement) {
        dateTimeTamilElement.innerHTML = `${day}, ${tamilDay} ${tamilMonth.name}, ${year} | ${time} ${suffix}`;
    }
}



// Update both date-times every second
setInterval(updateTime, 1000);
setInterval(updateTimeTamil, 1000);

// Initial call to display the date-times immediately
updateTime();
updateTimeTamil();