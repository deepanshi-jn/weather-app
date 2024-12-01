// Select DOM elements
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

// API Key and Base URL
const API_KEY = 'c7fdebb8dd1f4934b3e114008242611';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        // Update weather details in the UI
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update the UI with fetched weather data
function updateWeatherUI(data) {
    const { temp_c } = data.current;
    const { name } = data.location;
    const { humidity, wind_kph } = data.current;
    const conditionIcon = data.current.condition.icon;

    // Update weather details
    tempElement.textContent = `${temp_c}°c`;
    cityElement.textContent = name;
    humidityElement.textContent = `${humidity}%`;
    windElement.textContent = `${wind_kph} km/h`;
    weatherIcon.src = `https:${conditionIcon}`;
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch default weather for New York on page load
fetchWeather('New York');
