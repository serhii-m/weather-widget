import {getWeatherData} from '../weather/getWeatherData';

export const getUserPosition = async () => {
  if ('geolocation' in navigator) {
    await navigator.geolocation.getCurrentPosition(position => {
      return position.coords;
    })
  } else {
    alert('geolocation not available')
  }
  /*await navigator.geolocation.getCurrentPosition(position => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);

  });*/
};


