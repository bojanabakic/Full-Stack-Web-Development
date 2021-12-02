import React from 'react'

const CountriesFilter = (props) => {
    return (
        <>
            {props.countryFilter.map(country =>
                <p key={country.name.common}>{country.name.common}
                <button onClick={() => props.setCountry(country)}>show</button></p>)}
        </>
    )
}

export default CountriesFilter