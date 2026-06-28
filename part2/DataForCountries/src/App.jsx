import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect (() => {
    if (search) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log(response)
          const filtered = response.data.filter(country =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          setCountries(filtered)
        })
    }
  }, [search])

  useEffect(() => {
    if (countries && countries.length === 1) {
      const capital = countries[0].capital[0]
      axios 
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
      .then(response => {
        console.log(response)
        setWeather(response.data)
      })
    }
  }, [countries])

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleShowClick = (name) => {
    setSearch(name)
  }

  return (
    <div>
      <form>
        Find Countries: <input value={search} onChange={handleChange}/>
      </form>
      <div>
        {countries.length > 10 
          ? <p>Too many matches, enter a more specific search key</p>
          : countries.length === 1
          ? countries.map(country => 
            <div key={country.cca3}>
              <h1>{country.name.common}</h1>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area}</p>
              <h2>Languages:</h2>
              <ul>
                {Object.values(country.languages).map(language =>
                  <li key={language}>{language}</li>
                )}
              </ul>
              <img src={country.flags.png} />
              <h2>Weather in {country.capital}</h2>
              {weather && (
                <div>
                  <p>Temperature: {weather.main.temp} °C</p>
                  <p>Wind: {weather.wind.speed} m/s</p>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                </div>
              )}
            </div>
          )
          : countries.map(country => 
            <div key={country.cca3} style={{margin: '0.5rem'}}>
              {country.name.common}
              <button style={{marginLeft: '1vw'}} onClick={() => handleShowClick(country.name.common)}>Show</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App