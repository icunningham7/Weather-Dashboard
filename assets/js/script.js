// Config Variables
var weatherKey = config.OPEN_WEATHER_API_KEY;
let loc = {};

function fetchCityLocation(city) {
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
            fetchWeatherData(loc);
        })


    // .then(fetchWeatherData(loc))

}

function fetchWeatherData(location) {
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${weatherKey}`;
    fetch(weatherAPI)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
}

fetchCityLocation("london");