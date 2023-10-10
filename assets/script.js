/* Global Variables */
let location;
let currentTemperature;

/* OpenWeather */
const key = 'e398da5248ec44f334fb31e5e0ed1abb';

/* DOM */
const output = document.getElementById('output');
const input = document.getElementById('input');
const checkButton = document.getElementById('check-button');

/* Check current weather for a location */
async function checkWeather () {
    try {
        /* Set location variable */
        location = input.value;
            /* Fix capitalize */
            const transformString = location.split(" ");
            for (let i = 0; i < transformString.length; i++) {
                transformString[i] = transformString[i].charAt(0).toUpperCase() + transformString[i].slice(1).toLowerCase();
            }
            location = transformString.join(" ");

        /* Define coordinates endpoint */
        const coordinatesEndpoint = 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&limit=1&appid=' + key;

        /* Get coordinates for the location */
        const getCoordinatesData = await axios.get(coordinatesEndpoint);
        let latitude = getCoordinatesData.data[0].lat;
        let longitude = getCoordinatesData.data[0].lon;
        
        /* Define weather endpoint */
        const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + key + '&units=metric';

        /* Get current weather */
        const getCurrentWeather = await axios.get(weatherEndpoint);
        currentTemperature = getCurrentWeather.data.main.temp;

        /* Output the result */
        document.body.style.setProperty('background', currentTemperature > 25 ? 'linear-gradient(90deg, rgb(255 248 235) 0%, rgb(255 224 118) 35%, rgb(255 253 253) 100%)' : 'linear-gradient(90deg, rgb(255 255 255) 0%, rgb(178 233 255) 35%, rgb(223 244 255) 100%)');
        output.innerText = `It's currently ${currentTemperature} degrees in ${location}`;
    } catch (error) {
        console.log(error);
    }
}

checkButton.addEventListener('click', checkWeather);

