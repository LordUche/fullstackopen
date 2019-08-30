import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import env from './config/env';

const WeatherReport = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    Axios.get(
      `http://api.apixu.com/v1/current.json?key=${env.REACT_APP_APIXU_KEY}&q=${city}`
    )
      .then(({ data }) => setWeather(data))
      .catch(error => console.log('Error:', error.message));
  }, [city]);

  return (
    <>
      <h2>Weather in {city}</h2>
      {weather ? (
        <>
          <p>
            <strong>temperature:</strong> {weather.current.temp_c}℃
          </p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p>
            <strong>wind:</strong> {weather.current.wind_kph} kph
            <span> direction {weather.current.wind_dir}</span>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default WeatherReport;
