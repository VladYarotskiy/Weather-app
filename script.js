'use strict';
const ref = {
  input: document.querySelector('.js-search-box-input'),
  searchButton: document.querySelector('.js-search-box-submit'),
  weatherBox: document.querySelector('.weather-box'),
  cityName: document.querySelector('.city-name'),
  temperature: document.querySelector('.temperature'),
  description: document.querySelector('.description'),
  highTemp: document.querySelector('.info-high-temp p'),
  lowTemp: document.querySelector('.info-low-temp p'),
  form: document.querySelector('.js-search-box-form'),
  weatherPicture: document.querySelector('.js-weather-picture'),
  notFound: document.querySelector('.not-found'),
  API_KEY: '880bcfabe5158b30ff077bb412ebe2a2',
};

ref.form.addEventListener('submit', async function (e) {
  e.preventDefault();
  // Geting data from API
  const weatherData = await getWeatherData(e.target[0].value);

  // Checking if city is existing
  if (weatherData.cod === '404') {
    ref.weatherBox.classList.add('hidden');
    ref.notFound.classList.remove('hidden');
    return;
  }
  //Rendering data
  renderView(weatherData);
});

const getWeatherData = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ref.API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const renderView = function (weatherData) {
  switch (weatherData.weather[0].main) {
    case 'Clear':
      ref.weatherPicture.src = 'img/clear.png';
      break;
    case 'Rain':
      ref.weatherPicture.src = 'img/rain.png';
      break;
    case 'Drizzle':
      ref.weatherPicture.src = 'img/rain.png';
      break;
    case 'Snow':
      ref.weatherPicture.src = 'img/snow.png';
      break;
    case 'Clouds':
      ref.weatherPicture.src = 'img/cloud.png';
      break;
    case 'Mist':
      ref.weatherPicture.src = 'img/mist.png';
      break;
    case 'Haze':
      ref.weatherPicture.src = 'img/mist.png';
      break;

    default:
      break;
  }
  ref.notFound.classList.add('hidden');
  ref.weatherBox.classList.remove('hidden');
  ref.temperature.innerHTML = `${parseInt(
    weatherData.main.temp
  )}<span>°C</span>`;
  ref.cityName.innerHTML = weatherData.name;
  ref.description.innerHTML = weatherData.weather[0].description;
  ref.highTemp.innerHTML = `${parseInt(
    weatherData.main.temp_max
  )}<span>°</span>`;
  ref.lowTemp.innerHTML = `${parseInt(
    weatherData.main.temp_min
  )}<span>°</span>`;
  ref.input.value = '';
};
