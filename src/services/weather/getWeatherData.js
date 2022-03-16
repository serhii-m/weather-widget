import axios from 'axios';
import { REACT_APP_API_URL, REACT_APP_API_KEY } from '../../config/config';


export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}&units=metric`);
    return response.data;
  } catch (e) {
    throw new Error('An error occurred while loading data!');
  }
};
