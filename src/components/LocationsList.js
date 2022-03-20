import React, { useEffect, useMemo } from 'react';
import { getWeatherData } from '../services/weather/getWeatherData';
import { DataWrapper } from './index';


const LocationsList = ({ dataSet, onDelete, zeroItem }) => {
  const itemClass = 'primary fw-bolder';
  const btnIsVisible = 'd-none';

  const locationsList = useMemo(() => {
    return dataSet.map((data, idx) => (
      <DataWrapper key={data.id} data={data}
                   onDelete={onDelete}
                   itemClass={data.id === zeroItem.id ? itemClass : ''}
                   btnIsVisible={data.id === zeroItem.id ? btnIsVisible : ''}
                   isUserLocation={data.id === zeroItem.id}
      />
    ));
  }, [dataSet]);

  return (
    <>
      {locationsList}
    </>
  );
};

export default LocationsList;