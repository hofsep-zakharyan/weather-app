// Openweather api
const OPEN_WEATHER_MAP_API = 'http://api.openweathermap.org/data/2.5'
const APP_ID = '538882fc8387290c6cee83f313a6acf5'

/**
 * added the param for units. Possible values are.
 *      - default = Kelvin
 *      - metric = Celcius
 *      - imperial = Fahrenheit
 * 
 * more info on the openweathermap endpoint can be found at https://openweathermap.org/current
 */

export async function getCurrentWeather(cityId) {
    const data = await fetch(
        `${OPEN_WEATHER_MAP_API}/weather?id=${cityId}&appid=${APP_ID}&units=metric`
    ).then(response => response.json())

    if (!data) {
        throw Error(`No response from OpenWeatherMap API for endpoint /weather`)
    }

    return data;
}

export async function getForecast(cityId) {
    const data = await fetch(
        `${OPEN_WEATHER_MAP_API}/forecast?id=${cityId}&appid=${APP_ID}&units=metric`
    ).then(response => response.json())

    if (!data) {
        throw Error(`No response from OpenWeatherMap API for endpoint /forecast`)
    }

    return data;
}

/**
 * Found the url to grab the weather icons from the openweathermap documentation.
 */
export const weatherIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`
