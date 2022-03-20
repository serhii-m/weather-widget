import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { useLocalStorage } from './hooks';
import { getWeatherData } from './services/weather/getWeatherData';
import { DataWrapper, LoadingSpinner, LocationsList, Pages, SearchLocationForm } from './components/index';


function App () {
  const [storedValue, setValue] = useLocalStorage('locations', []);
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isValid, setValid] = useState(true);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = weatherData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const savePosition = (position) => {
    let crd = position.coords;

    setValue([...storedValue, {
      id: crd.latitude.toFixed(1) + crd.longitude.toFixed(1),
      name: 'userLocation',
      lat: crd.latitude,
      lon: crd.longitude
    }]);
  };

  const fetchLocalWeather = async () => {
    try {
      if (storedValue.length === 0) {
        await window.navigator.geolocation.getCurrentPosition(savePosition);
        const res = await getWeatherData(storedValue[0].lat, storedValue[0].lon);
        setWeatherData([...weatherData, res.data]);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchLocalWeather();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const prepareData = [];

      for (let i = 0; i < storedValue.length; i++) {
        const response = await getWeatherData(storedValue[i].lat, storedValue[i].lon);
        prepareData.push(response.data);
      }
      setWeatherData([...prepareData]);
    };

    fetchData();
  }, [storedValue]);

  const searchLocation = async (event) => {
    event.preventDefault();
    const response = await getWeatherData(location);

    if (response instanceof Error) {
      setValid(!isValid);
      return null;
    }

    if (!storedValue.some(item => (
      (response.data.coord.lat.toFixed(1) + response.data.coord.lon.toFixed(1))
      === storedValue[0].id) || item.id === response.data.id)) {
      setValue([...storedValue, {
        id: response.data.id,
        name: response.data.name,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      }]);

      setWeatherData([...weatherData, response.data]);
    }

    setLocation('');
    isValid ? null : setValid(!isValid);
  };

  const handleItemDelete = (id) => {
    setWeatherData(weatherData.filter(el => el.id !== id));
    setValue(storedValue.filter(el => el.id !== id));
  };


  return (
    <div className="app">
      <SearchLocationForm
        valid={isValid}
        location={location}
        onSubmit={searchLocation}
        setLocation={setLocation}
      />
      {weatherData.length === 0 && <LoadingSpinner/>}
      <LocationsList
        dataSet={currentItems}
        onDelete={handleItemDelete}
        zeroItem={weatherData[0]}
      />
      {weatherData.length > 5 &&
      <Pages
        itemsPerPage={itemsPerPage}
        totalItems={weatherData.length}
        currentPage={currentPage}
        paginate={paginate}
      />}
    </div>
  );
}

export default App;
