import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch countries on initial render
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states when a country is selected
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error("Error fetching states:", error));
    } else {
      setStates([]);
      setSelectedState("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities when a state is selected
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
      setSelectedCity("");
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
    <div>
      <h2>selected location</h2>

      {/* Dropdowns */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          marginBottom: "16px",
          paddingLeft: 400,
        }}
      >
        {/* Country Dropdown */}
        <div>
          <br />
          <select
            // data-testid="country-dropdown"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select a Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div>
          <br />
          <select
            // data-testid="state-dropdown"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry} // Disabled until a country is selected
          >
            <option value="">Select a State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        <div>
          <br />
          <select
            // data-testid="city-dropdown"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState} // Disabled until a state is selected
          >
            <option value="">Select a City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Selected Location */}
      <div>
        {selectedCity && selectedState && selectedCountry && (
          <p>
            <span>
              You selected {selectedCity}, {selectedState}, {selectedCountry}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
