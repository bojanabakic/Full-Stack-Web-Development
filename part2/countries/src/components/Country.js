import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = (props) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
        return () => setWeather({})
    }, [props.country.capital])

    return (
        <>
            <h2>{props.country.name.common}</h2>
            <p>capital {props.country.capital}</p>
            <p>population {props.country.population}</p>

            <h3>Spoken languages</h3>
            <ul>
                {Object.values(props.country.languages).map(x => <li key={x}>{x}</li>)}
            </ul>

            <img src={props.country.flags[1]} alt="flag" width="200" />

            <h3>Weather in {props.country.capital}</h3>
            <p><b>temperature:</b> {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt="weather" width="50" />
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </>
    )
}

export default Country