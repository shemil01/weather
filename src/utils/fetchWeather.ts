export async function fetchWeather(city:string){
    const apiKey = 'd89717a98767454b92961801242810'
    const apiUrl = `http://api.weatherapi.com/v1/current.json`;
    if (!apiKey) throw new Error("API key is missing");

    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}`);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    return response.json();
}