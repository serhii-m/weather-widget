export const setInitDataToLocalStorage = (location, store, setValue) => {
  if (location.loaded) {
    const hasMatch = item => item.id.includes(
      (location.coordinates.lat.toFixed(2) + location.coordinates.lon.toFixed(2)));

    if (!store.some(hasMatch)) {
      setValue([...store, {
        id: location.coordinates.lat.toFixed(2) + location.coordinates.lon.toFixed(2),
        lat: location.coordinates.lat,
        lon: location.coordinates.lon
      }]);
    }
  }
};