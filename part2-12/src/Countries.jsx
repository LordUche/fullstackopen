import React from 'react';

const Countries = ({ countries, selectCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <p key={country.alpha2Code}>
          {country.name}
          <button onClick={() => selectCountry(country)}>show</button>
        </p>
      ))}
    </div>
  );
};

export default Countries;
