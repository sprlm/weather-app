async function getWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7458751a8ea08978c503e82b15abe794`);
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (err) {
    console.error(err);
  }
}
