import React, { useState } from 'react'
import { CITIES } from './constant'
import DisplayForecast from './DisplayForecast'
import DisplayWeather from './DisplayWeather'
import { getCurrentWeather, getForecast } from './openweathermap.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

function Weather() {

    const [weather, setWeather] = useState(undefined)
    const [forecast, setForecast] = useState(undefined)

    const onDropdownSelected = async (e) => {
        const cityId = e.target.value
        const cw = await getCurrentWeather(cityId)
        setWeather(cw)
        setForecast(undefined)
    }

    const showForecast = async () => {
        if (weather.id) {
            const fc = await getForecast(weather.id)
            setForecast(fc)
        }
    }

    const hideForecast = () => {
        setForecast(undefined)
    }

    return (
        <div className='card border-light'>
            <h1 className='card-title'>WEATHER FORECAST</h1>
            <div className='select-div'>
                <select className='form-select' onChange={onDropdownSelected} defaultValue={""}>
                    <option value="" disabled hidden> City </option>
                    {CITIES.map(({id, name, country}, key) => {
                        return <option key={key} value={id}> {name}, {country} </option>;
                    })}
                </select>
                <span className='hint'>Please select the city to see the current weather</span>
            </div>

            <div className='card-body'>
                {
                    weather === undefined ? null : 
                    <div className='current-weather'>
                        <DisplayWeather data={weather} /> <br/>
                        {
                            forecast === undefined ? 
                                <button className='btn btn-info' onClick={showForecast}> Show Forecast <FontAwesomeIcon icon={faArrowDown} /> </button>
                                : <button className='btn btn-info' onClick={hideForecast}> Hide Forecast <FontAwesomeIcon icon={faArrowUp} /> </button>
                        }
                    </div>
                }
                {
                    forecast === undefined ? null : 
                    <div className='display-forecast'>
                        <DisplayForecast data={forecast} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Weather
