document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .about p, .consultation-content').forEach(el => {
        observer.observe(el);
    });
});
function openForm() {
    document.getElementById("form-dialog").classList.remove("hidden");
}

function closeForm() {
    document.getElementById("form-dialog").classList.add("hidden");
}
// Local data for daily horoscopes
const dailyHoroscopeData = {
    Aries: "Today, your leadership skills shine bright. Take charge and lead by example.",
    Taurus: "A day to focus on self-care and financial planning. Balance is key.",
    Gemini: "Expect exciting conversations that could lead to new opportunities.",
    Cancer: "Home and family matters are in focus. Spend quality time with loved ones.",
    Leo: "Your creativity knows no bounds today. Express yourself boldly.",
    Virgo: "Attention to detail will help you solve a lingering issue. Stay focused.",
    Libra: "Partnerships are highlighted. Collaborate for success.",
    Scorpio: "Your passion drives you forward. Channel it wisely for the best results.",
    Sagittarius: "Adventure awaits! Be open to exploring new ideas and places.",
    Capricorn: "Hard work pays off. Today, your efforts bring tangible results.",
    Aquarius: "Your innovative ideas inspire those around you. Share your vision.",
    Pisces: "Intuition is your guide. Trust it to navigate emotional situations.",
};

// Recommendations data
const recommendations = [
    "Focus on personal growth this month.",
    "Embrace challenges as opportunities for transformation.",
    "Balance work and life for better emotional stability.",
    "Take time to connect with your inner self.",
    "Trust your instincts in making important decisions.",
];

// Function to display recommendations
function showRecommendations() {
    // Create the recommendation content
    const recommendationItems = recommendations
        .map(item => `<li>${item}</li>`)
        .join("");

    const recommendationContent = `
        <ul>${recommendationItems}</ul>
    `;

    // Insert the content into the display div
    const recommendationDisplay = document.getElementById("recommendation-list");
    recommendationDisplay.innerHTML = recommendationContent;
    recommendationDisplay.style.display = 'block'; // Ensure it is visible
}

// Function to show service sections
function showService(serviceId) {
    // Hide all service sections
    document.querySelectorAll('.sample-service').forEach(service => {
        service.style.display = 'none';
    });

    // Show the selected service section
    const selectedService = document.getElementById(serviceId);
    if (selectedService) {
        selectedService.style.display = 'block';

        // If the service is 'daily-horoscope', display the horoscope
        if (serviceId === 'daily-horoscope') {
            showHoroscope();
        }

        if (serviceId === 'birthchart') {
            showBirthChart();
        }
        // If the service is 'recommendations', display the recommendations
        if (serviceId === 'recommendations') {
            showRecommendations();
        }
    }
}

function showBirthChart() {
    // Show the birth chart image container
    document.getElementById('birthchart-image-container').style.display = 'block';
}

// Function to display the daily horoscope
function showHoroscope() {
    // Generate a random zodiac sign for the example
    const zodiacSigns = Object.keys(dailyHoroscopeData);
    const randomSign = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];

    // Create the horoscope content
    const horoscopeContent = `
        <h4>${randomSign} Horoscope</h4>
        <p>${dailyHoroscopeData[randomSign]}</p>
    `;

    // Insert the content into the display div
    const horoscopeDisplay = document.getElementById("horoscope-display");
    horoscopeDisplay.innerHTML = horoscopeContent;
    horoscopeDisplay.style.display = 'block'; // Ensure it is visible
}
// Suggestions Data
const suggestionsData = {
    meditation: [
        "Practice mindful breathing to align your energy.",
        "Try a body scan meditation to relax your muscles.",
        "Use guided visualizations tailored to your zodiac element.",
    ],
    workout: [
        "Aries: High-intensity interval training (HIIT) for energy bursts.",
        "Taurus: Yoga for grounding and strength.",
        "Gemini: Dance workouts to channel dual energy.",
    ],
    sleep: [
        "Use calming music to wind down.",
        "Establish a consistent sleep schedule.",
        "Meditate before bed to quiet the mind.",
    ],
};

// Function to display suggestions
function showSuggestions(category) {
    const suggestions = suggestionsData[category] || [];
    const suggestionDisplay = document.getElementById("suggestion-display");

    const content = `
        <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Suggestions</h3>
        <ul>
            ${suggestions.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    `;

    suggestionDisplay.innerHTML = content;
    suggestionDisplay.style.display = "block";
}

