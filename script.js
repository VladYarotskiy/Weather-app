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
  futureWeatherBox: document.querySelector('.future-weather'),
  futureWeatherDay: document.querySelector('.future-weather__day'),
  API_KEY: '880bcfabe5158b30ff077bb412ebe2a2',
};

ref.form.addEventListener('submit', async function (e) {
  e.preventDefault();
  // Geting data from API
  const weatherData = await getWeatherData(e.target[0].value);
  // Checking if city is existing
  if (weatherData.cod !== 200) {
    ref.weatherBox.classList.add('hidden');
    ref.notFound.classList.remove('hidden');
    ref.futureWeatherBox.innerHTML = '';
    return;
  }
  // geting future weather data from API
  const futureWeatherData = await getFutureWeatherData(e.target[0].value);

  //Rendering current weather
  renderCurrentWeather(weatherData);

  //Rendering future weather
  renderFutureWeather(futureWeatherData);
});

const genereteFutureWeatherMurkup = function (data) {
  return `
  <div class="future-weather__item">
    <p class="future-weather__day">${new Date(data.dt * 1000)
      .toDateString()
      .slice(0, -12)
      .toUpperCase()}</p>
    <img
      class="future-weather__picture js-weather-picture"
      src=${renderWeatherPicture(data)}
      alt="weather picture"
    />
    <p class="future-weather__temperature">${parseInt(
      data.main.temp
    )}<span>°</span></p>
  </div>`;
};

const renderFutureWeather = function (futureWeatherData) {
  ref.futureWeatherBox.innerHTML = '';

  //creating an empty array for future weather to be render.
  const futureWeatherArr = [];

  // Data from API cumming as an array of objects, that contain data about weather every 3 hours for the next 5 days.
  // using map method choosing data about weather at 15:00 every day and pusing object in futureWeatherArr.
  futureWeatherData.list.map(el => {
    if (el.dt_txt.includes('15:00:00')) {
      futureWeatherArr.push(el);
    }
  });
  console.log(futureWeatherArr);

  futureWeatherArr.map(el => {
    ref.futureWeatherBox.insertAdjacentHTML(
      'beforeend',
      genereteFutureWeatherMurkup(el)
    );
  });
  futureWeatherArr.splice(0, futureWeatherArr.length);
  console.log(futureWeatherArr);
};

const getWeatherData = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ref.API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const renderWeatherPicture = function (weatherData) {
  switch (weatherData.weather[0].main) {
    case 'Clear':
      return 'img/clear.png';
    case 'Rain':
      return 'img/rain.png';
    case 'Drizzle':
      return 'img/rain.png';
    case 'Snow':
      return 'img/snow.png';
    case 'Clouds':
      return 'img/cloud.png';
    case 'Mist':
      return 'img/mist.png';
    case 'Haze':
      return 'img/mist.png';

    default:
      break;
  }
};

const renderCurrentWeather = function (weatherData) {
  ref.weatherPicture.src = renderWeatherPicture(weatherData);
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

// fetching API for gatting wheather data for next 5 days
const getFutureWeatherData = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${ref.API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
