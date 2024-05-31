document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const cityBtn = document.getElementById('city-btn');
    const weatherDetails = document.getElementById('weather-details');
    const favoriteSection = document.getElementById('favorite-cities');
    const quotesContainer = document.getElementById('quotes');

    fetchMotivationalQuote();
    getFavouriteCities();
    setInterval(fetchMotivationalQuote, 50000);

    cityBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    
    async function getWeather(city) {
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + city;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1b9f1e8983mshb26c5e09274ce51p1654ffjsn28e196e93bc9',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            const current = result.current;
            const location = result.location;
            const currentCondition = result.current.condition;
            
            weatherDetails.innerHTML = `
            <article>
                    <header>
                        <div>
                        <img src='${currentCondition.icon}' /></br>
                            <p>${location.name}, ${location.country} </p>
                        </div>
                        <div id='second_div'>
                            <button id="thumbButton">&#128077;</button> </br>
                            Celcius: ${current.temp_c}°C </br>
                            Fahrenheit: ${current.temp_f}f  </br
                            ${currentCondition.text}>
                            </div>
                            </header>
                            <hr/>
                            <footer class"region">
                            Region: ${location.region} </br>
                            Time: ${location.localtime}
                            </footer>
                            </article>
                            `
                            const thumbButton = document.getElementById('thumbButton');
                            thumbButton.addEventListener('click', () => addToFavourite(location.name));
                            
                        } catch (error) {
            console.error(error);
        }

        
    }
    
    async function fetchMotivationalQuote() {
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
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            quotesContainer.innerHTML = `
            <p>${result.quote.quote}</p>
            <p>${result.quote.category} ~ ${result.quote.author}</p>
            `;
        } catch (error) {
            console.error(error);
        }
    }
    
    async function addToFavourite(city) {
        const url = 'http://localhost:8000/api/favorites';
        const data = { city };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            displayFavourite(result.favorites)
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    }
    
    
    async function getFavouriteCities() {
        const url = 'http://localhost:8000/api/favorites';
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        };
        
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            displayFavourite(result.favorites)
        } catch (error) {
            console.error('Error fetching favorite cities:', error);
        }
    }
    
    function displayFavourite(favoriteCities){
        if(favoriteCities === undefined || favoriteCities.length === 0){
            favoriteSection.innerHTML = `<p>No favourite city</p>`;
            return;
        }
        
        favoriteCities.map((item, index)=>{
            const node = document.createElement("li");
            const cityName = document.createElement("span");
            const deleteButton = document.createElement("button");
            
            cityName.textContent = item.city;
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            
            deleteButton.onclick = () => {
                deleteFavourite(item.id)
            };

            node.appendChild(cityName);
            node.appendChild(deleteButton);
            favoriteSection.appendChild(node);
        })
    }

    async function deleteFavourite(id){
        const url = `http://localhost:8000/api/favorites/${id}`;
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        };
        
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            displayFavourite(result.favorites)
        } catch (error) {
            console.error('Error fetching favorite cities:', error);
        }
    }
});
