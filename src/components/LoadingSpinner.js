import React from 'react';


const LoadingSpinner = () => {

  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
      <p className="mt-5 text-center">Data loading...</p>
    </div>
  );
};

export default LoadingSpinner;