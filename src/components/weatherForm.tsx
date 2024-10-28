"use client";

import { fetchWeather } from "@/utils/fetchWeather";
import { useState } from "react";
import { CiCloudSun } from "react-icons/ci";
import { FaSearch, FaTemperatureHigh, FaWind } from "react-icons/fa";
import { FaNfcDirectional } from "react-icons/fa6";

interface WeatherData{
  location:{
    name: string;
    region: string;
  };
  current:{
    temp_c: number;
    wind_kph: number;
    wind_dir: string;
    condition: {
      text: string;
    };
  }
}

export default function WeatherForm() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleFetchWeather = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError("");
      console.log("data:", data);
    } catch (error: any) {
      setError(error.message);
      setWeather(null);
    }
  };

  return (
    <div className="moving-bg min-h-screen flex flex-col items-center pt-10">
      {/* App Header */}
      <div className="flex items-center space-x-3 mb-5">
        <CiCloudSun className="text-white text-4xl" />
        <h1 className="font-bold text-white text-2xl">AccuWeather</h1>
      </div>

      {/* Input and Search Button */}
      <div className="flex justify-center space-x-2 mb-3">
        <input
          type="text"
          placeholder="Search your location"
          value={city}
          className="border py-2 px-4 rounded"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleFetchWeather}
          className="bg-white border py-2 px-4 rounded flex items-center justify-center"
        >
          <FaSearch />
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Weather Display */}
      {weather && (
        <div className="text-white mt-5 text-center">
          <div className="mb-3 text-lg space-x-1">
            <span>{weather.location.region},</span>
            <span>{weather.location.name}</span>
          </div>
          <div className=" space-y-2">
            <p className="text-2xl font-bold "> current condition</p>
            <div className="flex items-center justify-center space-x-2">
              <FaTemperatureHigh className="text-2xl" />
              <p className="text-lg">temp: {weather.current.temp_c}°C</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <FaWind className="text-2xl" />
              <p className="text-lg">wind: {weather.current.wind_kph} km/h</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <FaNfcDirectional className="text-2xl" />
              <p className="text-lg">wind direction: {weather.current.wind_dir} </p>
            </div>
          </div>
          <p className="mt-2">condition :{weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}
