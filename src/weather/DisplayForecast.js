import React, { useState } from "react"
import * as moment from 'moment';
import { weatherIcon } from './openweathermap.api'

function DisplayForecast(props) {
    const {data:{
        list
    }} = props

    const buttons = new Set(list.map((day) => moment(day.dt_txt).format('D MMM')))
    const [day, setDay] = useState(buttons.values().next().value)
    
    const tableData = list.filter((forecast) => {
        // only grab the forecast of the selected day
        const forecastDate = moment(forecast.dt_txt).format('D MMM')
        return forecastDate === day
    }).map((forecast) => {
        // format the data to display in table
        return {
            date: moment(forecast.dt_txt).format('D MMM hA'),
            temp: forecast.main.temp.toFixed(0),
            min: forecast.main.temp_min.toFixed(0),
            max: forecast.main.temp_max.toFixed(0),
            wind: forecast.wind.speed,
            icon: weatherIcon(forecast.weather[0].icon),
            description: forecast.weather[0].description
        }
    })

    return (
        <div className="display-forecast">

            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>Date</th><th>Temp</th><th>Min Temp</th><th>Max Temp</th><th>Wind</th><th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((row, key) => {
                            return <tr key={key}>
                                <td className="tableFirst">{row.date}</td>
                                <td>{row.temp} <sup>o</sup>C</td>
                                <td>{row.min} <sup>o</sup>C</td>
                                <td>{row.max} <sup>o</sup>C</td>
                                <td>{row.wind} m/sec</td>
                                <td className="tableEnd">{row.description} <img src={row.icon} alt="" height='40px'/></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className="buttonNavigation">
                {
                    Array.from(buttons).map((selectDate, key) => {
                        return <button key={key} className="btn btn-secondary" onClick={() => setDay(selectDate)}>{selectDate}</button>
                    })
                }
            </div>
        </div>
    )
}

export default DisplayForecast
