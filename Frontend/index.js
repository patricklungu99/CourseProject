document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const cityInput = document.getElementById('city-input');
    const cityBtn = document.getElementById('city-btn');
    const weatherDetails = document.getElementById('weather-details');
    // const forecastDetails = document.getElementById('forecast-details');
    const favoriteCities = document.getElementById('favorite-cities');
    const quotesContainer = document.getElementById('quotes');

    // Fetch and display weather data
    cityBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    // Fetch and display motivational quotes
    fetchMotivationalQuotes();

    async function getWeather(city) {
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=paris';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b9f1e8983mshb26c5e09274ce51p1654ffjsn28e196e93bc9',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchMotivationalQuotes() {
        const url = 'https://get-quotes-api.p.rapidapi.com/random';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b9f1e8983mshb26c5e09274ce51p1654ffjsn28e196e93bc9',
                'X-RapidAPI-Host': 'get-quotes-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }

        // quotes.forEach(quote => {
        //     const quoteElement = document.createElement('p');
        //     quoteElement.textContent = quote;
        //     quotesContainer.appendChild(quoteElement);
        // });
    }
});
