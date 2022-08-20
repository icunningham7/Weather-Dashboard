// Config Variables
var weatherKey = config.OPEN_WEATHER_API_KEY;


// Dom Variables
let citySearchFormEl = document.getElementById('city-search-form');
let cityInputEl = document.getElementById('city-input');
let citySearchBtnEl = document.getElementById('city-search');
let currentWeatherEl = document.getElementById('current-weather');
let forecastEl = document.getElementById('forecast');


let days = 5;
let loc = {};
const DateTime = luxon.DateTime;

// --- Open Weather API Calls: Start --- //
function fetchCityLocation(event) {
    event.preventDefault();
    city = cityInputEl.value;
    let geoAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherKey}`;
    fetch(geoAPI)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            loc = {
                lat: data[0].lat,
                lon: data[0].lon
            }
            return loc;
        })
        .then((loc) => {
            fetchCurrentWeatherData(loc);
            fetchFutureWeatherData(loc, days);
            
        })// TO DO: add call to setSearchHistory
        // .then(setSearchHistory());
}

function fetchCurrentWeatherData(location) {
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${weatherKey}`;
    fetch(weatherAPI)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // let date = DateTime.now() 
            let currentWeather = {
                name: data.name,
                date: DateTime.now().toLocaleString(),
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                temp: data.main.temp,
                wind: data.wind.speed,
                windGust: data.wind.gust,
                humidity: data.main.humidity,
            }
            console.log(data);
            console.log(currentWeather);
            return currentWeather;
        })
    .then((currentWeather) => displayCurrentWeather(currentWeather))
}

function fetchFutureWeatherData(location, days) {
    let weatherAPI = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${location.lat}&lon=${location.lon}&cnt=${days}&units=imperial&appid=${weatherKey}`;
    fetch(weatherAPI)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
        })
}
// --- Open Weather API Calls: End --- //

// Flow:
// Load -  displaySearchHistory
// Event (search for city) - fetchCityLocation > fetchWeatherData > Display Weather > setSearchHistory
// Event (click previous search) - call setSearchHistory > pull the lat and lon values to use in featchWeatherData

function displayCurrentWeather(weatherNow) {

    let currentCard = document.createElement('div');
    currentCard.setAttribute('id', 'current-weather');
    currentCard.classList.add('m-3', 'p-3', 'shadow-md', 'hover:shadow-lg', 'rounded', 'border-2', 'border-blue-800/50', 'bg-blue-200');

    let iconSpan = document.createElement('span');
   
    let currentIcon = document.createElement('img');
    currentIcon.setAttribute('src', weatherNow.icon);
    currentIcon.classList.add('inline-block');



    let currentName = document.createElement('h3');
    currentName.classList.add('text-4xl', 'px-2', 'h-100', 'text-neutral-900');
    currentName.textContent = weatherNow.name;
    currentName.textContent += ' ' + weatherNow.date + ' ';


    let currentTemp = document.createElement('p');
    currentTemp.classList.add('text-4xl', 'px-2', 'text-neutral-900');
    currentTemp.textContent = weatherNow.temp + " °F";

    let currentWind = document.createElement('p');
    currentWind.classList.add('text-4xl', 'px-2', 'text-neutral-900');
    currentWind.textContent = weatherNow.wind + " MPH";

    let currentHumidity = document.createElement('p');
    currentHumidity.classList.add('text-4xl', 'px-2', 'text-neutral-900');
    currentHumidity.textContent = weatherNow.wind + " %";

    iconSpan.appendChild(currentIcon);
    currentName.appendChild(iconSpan);
    currentCard.appendChild(currentName);
    currentCard.appendChild(currentTemp);
    currentCard.appendChild(currentWind);
    currentCard.appendChild(currentHumidity);
    currentWeatherEl.appendChild(currentCard);
}

// displayCurrentWeather
    // Create current weather card
        // City name
        // Date (w/ Weather Icon)
        // temperature
        // wind
        // humidity
        // uv index (color-coded favorable, moderate, or severe)
// displayFutureWeather
    // Create future weather section
        // Title
        // x5 cards
            // date
            // weather icon
            // temperature
            // wind
            // humidity


// displaySearchHistory
    // clear buttons list
    // check localStorage for history
    // if search history exists
        // then create buttons for each city
        // set attributes lat & lon for the buttons

// setSearchHistory functions
    // default:
        // check if city is already in storage
        // if it is, remove it from the list
            // then unshift it to the front of the list
        // save search history obj to localstorage
        // call displaySearchHistory


citySearchFormEl.addEventListener('submit', fetchCityLocation);
citySearchBtnEl.addEventListener('button', fetchCityLocation);