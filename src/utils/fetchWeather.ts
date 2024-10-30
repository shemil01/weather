export async function fetchWeather(city:string){
    const apiKey = 'd89717a98767454b92961801242810'
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json `;
    if (!apiKey) throw new Error("API key is missing");

    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}`);
    
    if (!response.ok) throw new Error("Failed to fetch weather data");

    return response.json();
}