async function getWeatherData(location, units) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7458751a8ea08978c503e82b15abe794&units=${units}`);
  
  if (response.ok) {
    const weatherJSON = await response.json();
    const weatherData = processWeatherJSON(weatherJSON);
    return weatherData;
  } else {
    throw new Error(response.status);
  }
}

function processWeatherJSON(weatherJSON) {
  return {
    city: weatherJSON.name,
    temp: Math.round(weatherJSON.main.temp),
    forecast: weatherJSON.weather[0].main,
    description: weatherJSON.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`
  };
}

function addDataToDOM(data, units) {
  city.textContent = data.city;
  temp.textContent = `${data.temp}°${(units === 'metric') ? 'C' : 'F'}`;
  forecast.textContent = data.forecast;
  description.textContent = data.description;
  icon.src = data.icon;

  switch (data.forecast) {
    case 'Clear':
      document.body.className = 'clear';
      break;
    case 'Rain':
    case 'Drizzle':
      document.body.className = 'rain';
      break;
    case 'Thunderstorm':
      document.body.className = 'storm';
      break;
    case 'Clouds':
    case 'Snow':
      document.body.className = 'cloud';
      break;
    default:
      document.body.className = 'dust';
  }
} 

function updateWeather(location, units) {
  getWeatherData(location, units)
    .then(data => addDataToDOM(data, units))
    .catch(err => alert(`Oh no! An unexpected error occured. (${err})`));
}

const input = document.querySelector('input');
const button = document.querySelector('button');
const container = document.querySelector('.container');

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const icon = document.querySelector('.icon');
const forecast = document.querySelector('.forecast');
const description = document.querySelector('.description');

button.addEventListener('click', () => {
  if (input.value !== '') {
    const selectedUnits = document.querySelector('input[type="radio"]:checked');
    updateWeather(input.value, selectedUnits.value);
  }
});

updateWeather('London', 'metric');
