import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
    const {country} = props
    const [ isLoading, setLoading] = useState(true);
    const [ weather, setWeather] = useState()
    const weather_url = `http://api.weatherstack.com/current?access_key=d740deb644da43b47baf41e2e7b2ecf7&query=${country.capital}`

    useEffect(() => {
        axios
            .get(weather_url)
            .then(response => {
                setWeather(response.data)
                setLoading(false)
        })
    }, [])

    return (
    <div className="Country">
        <h1>{country.name}</h1>
        
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h3>languages</h3>
        <ul>
        {
            country.languages.map((lang, i)=><li key={i}>{lang.name}</li>)
        }
        </ul>
        <img src={country.flag} style={{width:"200px"}} alt="country" />
        <h3>temperature in {country.capital}</h3>
        {
            isLoading? <p>loading</p>:<div>
                <p>temperature {weather.current.temperature}</p>
                <img src={weather.current.weather_icons} alt="icon" style={{width:"50px"}}/>
                <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>
        }
    </div>
    )
}

export default Country