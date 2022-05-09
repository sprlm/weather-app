async function getWeatherData(location, units) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7458751a8ea08978c503e82b15abe794&units=${units}`);
  
  if (response.ok) {
    const weatherJSON = await response.json();
    const weatherData = processWeatherJSON(weatherJSON);
    return weatherData;
  } else {
    throw new Error(`Error ${response.status}`);
  }
}

function processWeatherJSON(weatherJSON) {
  return {
    name: weatherJSON.name,
    temp: weatherJSON.main.temp,
    weather: weatherJSON.weather[0].main,
    description: weatherJSON.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${weatherJSON.weather[0].icon}@2x.png`
  };
}

const input = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  const selectedUnits = document.querySelector('input[type="radio"]:checked');
  getWeatherData(input.value, selectedUnits.value).then(data => console.log(data));
});
