async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'd3206aba7a2ebb76f1e506d8c2ab5996'; // Replace with your own OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found! Please enter a valid city name.");
      return;
    }

    const location = data.name + ", " + data.sys.country;
    const temperature = data.main.temp;
    const description = data.weather[0].main;

    document.getElementById('location').innerText = location;
    document.getElementById('temperature').innerText = `🌡️ ${temperature} °C`;
    document.getElementById('description').innerText = `🌦️ ${description}`;

    const moodEmoji = getMoodEmoji(description);
    document.getElementById('mood').innerText = `Mood: ${moodEmoji}`;

    document.getElementById('weatherInfo').classList.remove('hidden');

    // Optional: change background color/mood
    changeBackground(description);
  } catch (error) {
    alert("Error fetching data. Please try again.");
    console.error(error);
  }
}

function getMoodEmoji(description) {
  switch (description.toLowerCase()) {
    case 'clear':
      return '😎 Sunny vibes!';
    case 'clouds':
      return '🌥️ Lazy mood!';
    case 'rain':
      return '🌧️ Emotional & cozy!';
    case 'thunderstorm':
      return '⚡ Dramatic feels!';
    case 'snow':
      return '❄️ Chill and dreamy!';
    case 'mist':
    case 'fog':
      return '🌫️ Mysterious mood!';
    default:
      return '🤔 Undefined but still quirky!';
  }
}

function changeBackground(description) {
  const container = document.getElementById('weather-container');
  const lowerDesc = description.toLowerCase();

  let bg;
  switch (lowerDesc) {
    case 'clear':
      bg = 'linear-gradient(to right, #fceabb, #f8b500)';
      break;
    case 'clouds':
      bg = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
      break;
    case 'rain':
      bg = 'linear-gradient(to right, #00c6fb, #005bea)';
      break;
    case 'thunderstorm':
      bg = 'linear-gradient(to right, #373b44, #4286f4)';
      break;
    case 'snow':
      bg = 'linear-gradient(to right, #e6dada, #274046)';
      break;
    case 'mist':
    case 'fog':
      bg = 'linear-gradient(to right, #3e5151, #decba4)';
      break;
    default:
      bg = 'linear-gradient(to right, #a1c4fd, #c2e9fb)';
  }

  container.style.background = bg;
}
