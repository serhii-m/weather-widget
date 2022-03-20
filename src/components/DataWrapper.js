import React from 'react';

const getWeatherIcon = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};


const DataWrapper = ({ data, onDelete, itemClass, btnIsVisible }) => {
  const handleDelete = () => {
    onDelete(data.id);
  };

  return (
    <div className="container">
      <div className="top">
        <div className="location">
          {data.name && <p className={`location-name ${itemClass}`}>{data.name},</p>}
          {data.sys && <p className={`location-name ${itemClass} ps-3`}>{data.sys.country}</p>}
          <button type="button" className={`trashButton ${btnIsVisible}`} onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-trash"
                 viewBox="0 0 16 16">
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
      </div>
      {data.main && data.wind &&
      <div className="bottom">
        <div className="d-flex align-items-center">
          {data.main && <p className="temp pe-3">{data.main.temp.toFixed()}°C</p>}
          <div className="description d-flex align-items-center">
            {data.weather &&
            <>
              <p className="weather-description">{data.weather[0].main}</p>
              <img src={getWeatherIcon(data.weather[0].icon)} className="weatherIcon" alt="weatherIcon"
                   title="weather icon"/>
            </>
            }
          </div>
        </div>
        <div className="feels">
          <p className="bold">{data.main.feels_like.toFixed()}°C</p>
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          <p className="bold">{data.main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className="wind">
          <p className="bold">{data.wind.speed.toFixed()} m/sec</p>
          <p>Wind Speed</p>
        </div>
      </div>
      }
    </div>
  );
};

export default DataWrapper;