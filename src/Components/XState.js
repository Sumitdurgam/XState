import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch countries on initial render
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states when a country is selected
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    } else {
      setStates([]);
      setSelectedState('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities when a state is selected
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState, selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div style={{ alignItems: 'center'}}>
      <h2>Select Location</h2>

      {/* Dropdowns in a Single Row */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', paddingLeft: 400 }}>
        {/* Country Dropdown */}
        <div> 
          <br />
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select a Country</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        {selectedCountry && (
          <div>
            <br />
            <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
              <option value="">Select a State</option>
              {states.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* City Dropdown */}
        {selectedState && (
          <div>
            <br />
            <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
              <option value="">Select a City</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Display Selected Location */}
      {selectedCity && selectedState && selectedCountry && (
        <p>
          You Selected <strong>{selectedCity}s</strong>, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;