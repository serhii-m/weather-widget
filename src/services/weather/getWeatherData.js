import axios from 'axios';
import { REACT_APP_API_KEY, REACT_APP_API_URL } from '../../config/config';


export const getWeatherData = async (...args) => {
  const baseUrl = `${REACT_APP_API_URL}?&appid=${REACT_APP_API_KEY}&units=metric`;
  const fullUrl = args.length === 1 ? baseUrl + `&q=${args[0]}` : baseUrl + `&lat=${args[0]}&lon=${args[1]}`;

  return await axios.get(fullUrl).catch(function (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }

    return error;
  });
};
