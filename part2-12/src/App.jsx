import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Countries from './Countries';
import Country from './Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [countriesToShow, setCountriesToShow] = useState(countries);
  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value);
    if (searchTerm) setShowAll(false);
    showAll
      ? setCountriesToShow(countries)
      : setCountriesToShow(filterCountries());
  };

  const filterCountries = () =>
    countries.filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    Axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(({ data }) => setCountries(data))
      .catch(error => setCountries([]));
  }, []);

  const selectCountry = country => {
    setCountriesToShow([country]);
  };

  const renderCountries = () => {
    if (countriesToShow.length === 1)
      return <Country country={countriesToShow[0]} />;
    else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
      return (
        <Countries countries={countriesToShow} selectCountry={selectCountry} />
      );
    } else if (searchTerm.length && countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (searchTerm.length && !countriesToShow.length)
      return <p>No matches found</p>;
    return <p>Enter a search term</p>;
  };

  return (
    <>
      <div>
        find countries
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div>{renderCountries()}</div>
    </>
  );
};

export default App;
