# Weather Widget

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To get weather data, use the [Current Weather Data API](https://openweathermap.org/current) from OpenWeather. 

## The result can be seen [here](https://serhii-m.github.io/weather-widget/)

## Start Up Guide

### Open terminal in initial folder

### For clone repo run command
 `git clone https://github.com/serhii-m/weather-widget.git`
or
`git clone git@github.com:serhii-m/weather-widget.git`

#### go to the project directory
`cd weather-widget`

#### and install packages write command: 
`npm install`

### Fetch weather data

You need to register on the [OpenWeather](https://openweathermap.org/) and use your API key to receive data.

In the root of the project create a .env file following the .env-example and specify your key in REACT_APP_API_KEY variable.

## Running the app in development mode

In the project directory run command:
`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.
npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### To build the application, you can use 
`npm run build`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

## Requirements

1. version npm: 8.3.1
2. node version: v16.14.0

