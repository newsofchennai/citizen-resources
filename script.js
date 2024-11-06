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
    const now = new Date();

    // Tamil months' approximate Gregorian start dates (for current year)
    const tamilMonths = [
        { name: "தை", start: new Date(now.getFullYear(), 0, 15) }, // Mid-Jan to Mid-Feb
        { name: "மாசி", start: new Date(now.getFullYear(), 1, 15) }, // Mid-Feb to Mid-Mar
        { name: "பங்குனி", start: new Date(now.getFullYear(), 2, 15) }, // Mid-Mar to Mid-Apr
        { name: "சித்திரை", start: new Date(now.getFullYear(), 3, 14) }, // Mid-Apr to Mid-May
        { name: "வைகாசி", start: new Date(now.getFullYear(), 4, 15) }, // Mid-May to Mid-Jun
        { name: "ஆனி", start: new Date(now.getFullYear(), 5, 15) }, // Mid-Jun to Mid-Jul
        { name: "ஆடி", start: new Date(now.getFullYear(), 6, 15) }, // Mid-Jul to Mid-Aug
        { name: "ஆவணி", start: new Date(now.getFullYear(), 7, 15) }, // Mid-Aug to Mid-Sep
        { name: "புரட்டாசி", start: new Date(now.getFullYear(), 8, 15) }, // Mid-Sep to Mid-Oct
        { name: "ஐப்பசி", start: new Date(now.getFullYear(), 9, 18) }, // Mid-Oct to Mid-Nov
        { name: "கார்த்திகை", start: new Date(now.getFullYear(), 10, 16) }, // Mid-Nov to Mid-Dec
        { name: "மார்கழி", start: new Date(now.getFullYear(), 11, 15) } // Mid-Dec to Mid-Jan
    ];

    // Find the current Tamil month and calculate the day within that month
    let tamilMonth = tamilMonths[tamilMonths.length - 1]; // Start with the last month
    let tamilDay = 1;

    // Loop through the months and find the correct month and calculate the day of the month
    for (let i = 0; i < tamilMonths.length; i++) {
        if (now >= tamilMonths[i].start) {
            tamilMonth = tamilMonths[i];
            tamilDay = Math.floor((now - tamilMonth.start) / (1000 * 60 * 60 * 24)) + 1; // Days since the start of the month
        } else {
            break;
        }
    }

    // Tamil days (for the week)
    const tamilDays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
    const day = tamilDays[now.getDay()];

    const year = now.getFullYear();

    // Split time and suffix (AM/PM)
    const [time, suffix] = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).split(" ");

    // Check if the 'date-time-tamil' element exists before updating
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
