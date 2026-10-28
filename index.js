import { getWeather, processWeather } from "./weather.js";

const weatherForm = document.querySelector("#weatherForm");
const locationInput = document.querySelector("#locationInput");
const status = document.querySelector("#status");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const conditions = document.querySelector("#conditions");
const humidity = document.querySelector("#humidity");
const submitBtn = weatherForm.querySelector('button[type="submit"]');
const unitToggle = document.querySelector("#unitToggle");

let currentUnit = "C";
let currentWeather = null;

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = locationInput.value.trim();

  if (!location) {
    status.textContent = "Please input a valid city.";
    return;
  }

  submitBtn.disabled = true;
  status.textContent = "Loading weather...";

  try {
    const data = await getWeather(location);
    const weather = processWeather(data);

    currentWeather = weather;

    displayWeather(weather);
    updateWeatherTheme(weather);

    status.textContent = "";
  } catch (error) {
    console.error(error);
    status.textContent =
      "Unable to retrieve weather. Please check the city name.";
  } finally {
    submitBtn.disabled = false;
  }
});

function displayWeather(weather) {
  cityName.textContent = weather.city;

  let displayedTemp = weather.temperature;

  if (currentUnit === "F") {
    displayedTemp = (weather.temperature * 9) / 5 + 32;
  }

  temperature.textContent = `${Math.round(displayedTemp)} °${currentUnit}`;

  conditions.textContent = weather.conditions;
  humidity.textContent = `Humidity: ${weather.humidity}%`;
}

unitToggle.addEventListener("click", () => {
  if (!currentWeather) return;

  currentUnit = currentUnit === "C" ? "F" : "C";

  unitToggle.textContent =
    currentUnit === "C" ? "Switch to °F" : "Switch to °C";

  displayWeather(currentWeather);
});

function updateWeatherTheme(weather) {
  const body = document.querySelector("body");

  body.classList.remove("clear-day", "rain", "snow", "cloudy");

  const icon = weather.icon;

  if (icon === "clear-day") {
    body.classList.add("clear-day");
  } else if (icon === "rain") {
    body.classList.add("rain");
  } else if (icon === "snow") {
    body.classList.add("snow");
  } else {
    body.classList.add("cloudy");
  }
}
