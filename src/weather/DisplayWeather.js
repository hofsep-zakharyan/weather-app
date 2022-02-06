import React from "react"
import { weatherIcon } from './openweathermap.api'

function DisplayWeather(props) {
    const {
        data: {
            clouds: {
                all // Cloudiness in %
            },
            main: {
                feels_like, // Temperature in celcius
                humidity, // Humidity in %
                temp, // main temperature
                temp_max,
                temp_min,
            },
            weather: [{
                description, // Weather condition within the group.
                main, // Group of weather parameters (Rain, Snow, Extreme etc.)
                icon, // Weather icon id
            }],
            wind: {
                speed, // Wind speed in meter/sec
            }
        }
    } = props

    return (
        <div className="display-weather">
            <div className="left-column">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h4>{description.toUpperCase()}</h4></li>
                    <li className="list-group-item span-align"><span>Cloudiness</span><span>{all}%</span></li>
                    <li className="list-group-item span-align"><span>Feels like</span><span>{feels_like.toFixed(0)}<sup>o</sup>C</span></li>
                    <li className="list-group-item span-align"><span>Humidity</span><span>{humidity}%</span></li>
                    <li className="list-group-item span-align"><span>Wind</span><span>{speed} m/sec</span></li>
                </ul>
            </div>
            <div className="right-column">
                <h1>{temp.toFixed(0)} <sup>o</sup>C</h1>
                <ul className="list-group right-list">
                    <li className="list-group-item list-group-item-light">{temp_min.toFixed(0)} <sup>o</sup>C / {temp_max.toFixed(0)} <sup>o</sup>C</li>
                    <li className="list-group-item list-group-item-light">{main} <img src={weatherIcon(icon)} alt='' height='50px'/></li>
                </ul>
            </div>
        </div>
    )
}

export default DisplayWeather
