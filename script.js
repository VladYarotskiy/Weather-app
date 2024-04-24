'use strict';

const container = document.querySelector('.container');
const input = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const highTemp = document.querySelector('.info-high-temp p');
const lowTemp = document.querySelector('.info-low-temp p');
const API_KEY = '880bcfabe5158b30ff077bb412ebe2a2';

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchButton.click();
    const city = document.querySelector('.search-box input').value;
    const CUR_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const getWeatherData = async function () {
      try {
        const response = await fetch(CUR_API_URL);
        const data = await response.json();
        if (data.cod === '404') {
          weatherBox.classList.add('hidden');
          return;
        }
        weatherBox.classList.remove('hidden');
        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
        cityName.innerHTML = data.name;
        description.innerHTML = data.weather[0].description;
        highTemp.innerHTML = `${parseInt(data.main.temp_max)}<span>°</span>`;
        lowTemp.innerHTML = `${parseInt(data.main.temp_min)}<span>°</span>`;
        document.querySelector('.search-box input').value = '';
      } catch (err) {
        console.error(err);
      }
    };
    getWeatherData();
  }
});
