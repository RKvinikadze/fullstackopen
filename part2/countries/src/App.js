import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [filteredNumber, setFilteredNumber] = useState(0);
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const filterData = event => {
    if (event.target.value === '') {
      setFiltered('');
    } else {
      const arr = countries.filter(x =>
        x.name.toLowerCase().includes(event.target.value)
      );
      setFiltered(arr);
      setFilteredNumber(arr.length);
    }
  };

  return (
    <div>
      <div>
        filter shown with <input onChange={filterData} />
      </div>
      <Filter filteredNumber={filteredNumber} filtered={filtered} />
    </div>
  );
};

export default App;
