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

  const savePosition = (position) => {
    let crd = position.coords;

    if (!storedValue.some(el => el.name === 'userLocation')) {
      setValue([...storedValue, {
        id: crd.latitude.toFixed(2) + crd.longitude.toFixed(2),
        name: 'userLocation',
        lat: crd.latitude,
        lon: crd.longitude
      }]);
    }
  };

  const fetchLocalWeather = async () => {
    try {
      if (storedValue.length === 0) {
        await window.navigator.geolocation.getCurrentPosition(savePosition);
      }

      if (!storedValue[0]) {
        const res = await getWeatherData(storedValue[0].lat, storedValue[0].lon);
        setWeatherData([...weatherData, res.data]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocalWeather();
  }, []);

  const prepareData = [];

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < storedValue.length; i++) {
        const response = await getWeatherData(storedValue[i].lat, storedValue[i].lon);

        if (!prepareData.some(el => el.id === response.data.id)) {
          prepareData.push(response.data);
        }
      }
      setWeatherData([...weatherData, ...prepareData]);
    };

    fetchData();
  }, []);

  const searchLocation = async (event) => {
    event.preventDefault();
    const response = await getWeatherData(location);

    if (!storedValue.some(el => el.id === response.data.id)) {
      setValue([...storedValue, {
        id: response.data.id,
        name: response.data.name,
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      }]);
    }

    if (!weatherData.some(el => el.id === response.data.id)) {
      setWeatherData([...weatherData, response.data]);
    }
    console.log(response.status);
    setLocation('');
    response.statusText !== 'OK' ? setValid(!isValid) : null;
    console.log(isValid);
  };

  const handleItemDelete = (id) => {
    setWeatherData(weatherData.filter(el => el.id !== id));
    setValue(storedValue.filter(el => el.id !== id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = weatherData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div className="app">
      <SearchLocationForm valid={isValid} location={location} onSubmit={searchLocation} setLocation={setLocation}/>
      {weatherData.length === 0 && <LoadingSpinner/>}
      <LocationsList dataSet={currentItems} onDelete={handleItemDelete} zeroItem={weatherData[0]}/>
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
