import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import CountriesFilter from './components/CountriesFilter'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilterValue, setCountryFilterValue] = useState('')
  const [countryFilter, setCountryFilter] = useState(countries)
  const [country, setCountry] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3/all')
      .then(response => {
        setCountries(response.data)
      })
    return () => setCountries([])
  }, [])

  useEffect(() => {
    setCountry(
      countryFilter.length === 1 ? { ...countryFilter[0] } : {})
  }, [countryFilter])

  const handleChange = (event) => {
    setCountryFilterValue(event.target.value)
    setCountryFilter(countries.filter((country) =>
      (country.name.common.toUpperCase().includes(countryFilterValue.toUpperCase()))))
  }

  return (
    <>
      <p>find countries <input
        value={countryFilterValue}
        onChange={handleChange} /></p>

      {(countryFilterValue !== "" && countryFilter.length > 10) ?
        'Too many matches, specify another filter'
        :
        <CountriesFilter countryFilter={countryFilter} setCountry={setCountry} />}

      {(Object.keys(country).length !== 0) ? <Country country={country} /> : ""}
    </>
  )
}

export default App
