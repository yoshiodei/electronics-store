import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [towns, setTowns] = useState([]);
  const [selectedTown, setSelectedTown] = useState('');
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    // Fetch the list of US states from the Google API
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json',
          {
            params: {
              address: 'United States',
              key: 'AIzaSyDaWRTaYJC-3xnE31x5USdKKh1sG518LOs',
            },
          },
        );

        const stateList = response.data.results[0].address_components.filter(
          (component) => component.types.includes('administrative_area_level_1'),
        );

        setStates(stateList);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    // Fetch the towns in the selected state from the Google API
    const fetchTowns = async () => {
      try {
        const response = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json',
          {
            params: {
              address: selectedState,
              key: 'AIzaSyDaWRTaYJC-3xnE31x5USdKKh1sG518LOs',
            },
          },
        );

        const townsList = response.data.results.map(
          (result) => result.formatted_address,
        );

        setTowns(townsList);
      } catch (error) {
        console.error('Error fetching towns:', error);
      }
    };

    if (selectedState) {
      fetchTowns();
    }
  }, [selectedState]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedTown('');
    setCoordinates({});
  };

  const handleTownChange = (event) => {
    setSelectedTown(event.target.value);
    setCoordinates({});
    // You can fetch coordinates using the Google API as well,
    // but let's leave it empty for simplicity in this example
  };

  return (
    <div>
      <label>
        Select a state:
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">-- Select a state --</option>
          {states.map((state) => (
            <option value={state.long_name}>
              {state.long_name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select a town:
        <select value={selectedTown} onChange={handleTownChange}>
          <option value="">-- Select a town --</option>
          {towns.map((town) => (
            <option value={town}>
              {town}
            </option>
          ))}
        </select>
      </label>
      <br />
      <pre>
        Selected State:
        {selectedState}
      </pre>
      <pre>
        Selected Town:
        {selectedTown}
      </pre>
      <pre>
        Coordinates:
        {JSON.stringify(coordinates, null, 2)}
      </pre>
    </div>
  );
}

export default Test;
