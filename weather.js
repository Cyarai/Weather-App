const API_KEY = "9C93GXFJAK9EAFVDZHF7GM5TR";

export async function getWeather(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Cant retreive data from the given location");
    }
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function processWeather(data) {
  const current = data.currentConditions;

  return {
    city: data.resolvedAddress,
    temperature: current.temp,
    conditions: current.conditions,
    humidity: current.humidity,
    icon: current.icon,
  };
}

getWeather("Manila");
