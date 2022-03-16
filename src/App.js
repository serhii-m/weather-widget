import './App.css';
import { useEffect, useMemo, useState } from 'react';

import { setInitDataToLocalStorage } from './helpers/setInitDataToLocalStorage';
import { useGeoLocation, useLocalStorage } from './hooks';
import { getWeatherData } from './services/weather/getWeatherData';


function App () {
  const location = useGeoLocation();
  const [data, setData] = useState([]);
  const [storedValue, setValue] = useLocalStorage('locations', []);


  useMemo(() => {
    setInitDataToLocalStorage(location, storedValue, setValue);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      if (location.loaded) {
        const weatherData = await getWeatherData(storedValue[0].lat, storedValue[0].lon);
        console.log('Weather: ', weatherData);
        /*   if (!storedValue.includes(location.coordinates.lat)) {
             setValue([...storedValue, {
               id: location.coordinates.lat.toFixed(3) + location.coordinates.lon.toFixed(3),
               lat: location.coordinates.lat,
               lon: location.coordinates.lon
             }]);
           }*/
        setData([...data, weatherData]);
      }
    };

    fetchData();
    //console.log(data);
  }, [location]);

  console.log(data);
  return (
    <div className="app">
      {/* {location.loaded
        ?
        <>
          <h2>{`Your latitude: ${location.coordinates.lat}`}</h2>
          <h2>{`Your longtitude: ${location.coordinates.lon}`}</h2>
        </>
        :
        <h1>Your position is calculating!</h1>
      }*/}
      {data.length > 0 &&
      data.map((loc, idx) => {
          return (
            <div key={idx}>
              <h3>{loc['name']}</h3>
              <h5>{loc['sys']['country']}</h5>
              <h2>Description: {loc['weather'][0]['description']}</h2>
              <h5>Current temperature: {loc['main']['temp']} ºC</h5>
              <h5>Feels like: {loc['main']['feels_like']} ºC</h5>
              <h5>The wind speed: {loc['wind']['speed']} (m/sec)</h5>
              <h5>Cloudiness: {loc['clouds']['all']}%</h5>
              <h5>Humidity: {loc['main']['humidity']}%</h5>
            </div>
          );
        }
      )}
      {/* { latitude && longitude
          ?
        <div className="app__container">
          <h1>{cityName}</h1>
          <h2>{temperature}ºC</h2>
          <h2>{weather}</h2>
        </div>
          :
          <h1>Weather data is fetching!</h1>
        }*/}
    </div>
  );
}


export default App;
