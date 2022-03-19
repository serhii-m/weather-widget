import axios from 'axios';
import { REACT_APP_API_KEY, REACT_APP_API_URL } from '../../config/config';


export const getWeatherData = async (...args) => {
  const baseUrl = `${REACT_APP_API_URL}?&appid=${REACT_APP_API_KEY}&units=metric`;
  const fullUrl = args.length === 1 ? baseUrl + `&q=${args[0]}` : baseUrl + `&lat=${args[0]}&lon=${args[1]}`;

  try {
    return await axios.get(fullUrl);
  } catch (e) {
    throw new Error('An error occurred while loading data!');
  }
};
