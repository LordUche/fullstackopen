import React from 'react';
import WeatherReport from './WeatherReport';

const Country = ({ country }) => {
  const { name, capital, population, languages } = country;

  return (
    <>
      <h1>{name}</h1>

      <p>capital {capital}</p>
      <p>population {population}</p>

      <h2>languages</h2>
      <ul>
        {languages.map(language => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${name}`} width="200" />

      <WeatherReport city={capital} />
    </>
  );
};

export default Country;
