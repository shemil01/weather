"use client";

import { fetchWeather } from "@/utils/fetchWeather";
import Image from "next/image";
import { useState } from "react";
import { CiCloudSun } from "react-icons/ci";
import { FaSearch, FaTemperatureHigh, FaWind } from "react-icons/fa";
import { FaNfcDirectional } from "react-icons/fa6";

interface WeatherData {
  location: {
    name: string;
    region: string;
  };
  current: {
    temp_c: number;
    wind_kph: number;
    wind_dir: string;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      setWeather(null);
    }
  };

  return (
    <div className="moving-bg min-h-screen pt-10">
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
          <div>
            <div className="mb-3 text-lg space-x-1">
              <span>{weather.location.region},</span>
              <span>{weather.location.name}</span>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">Current Condition</p>
              <div className="flex items-center justify-center space-x-2">
                <FaTemperatureHigh className="text-2xl" />
                <p className="text-lg">Temp: {weather.current.temp_c}°C</p>
              </div>

              {/* High and Low Temperatures */}
              <div className="flex items-center justify-center space-x-2">
                <p className="text-lg">
                  High: {weather.forecast.forecastday[0].day.maxtemp_c}°C | Low:{" "}
                  {weather.forecast.forecastday[0].day.mintemp_c}°C
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <FaWind className="text-2xl" />
                <p className="text-lg">Wind: {weather.current.wind_kph} km/h</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <FaNfcDirectional className="text-2xl" />
                <p className="text-lg">
                  Wind Direction: {weather.current.wind_dir}
                </p>
              </div>
            </div>
            <p className="mt-2">Condition: {weather.current.condition.text}</p>
          </div>

          {/* Hourly Forecast */}
          <div className="mt-10 text-white space-x-3">
            <h2 className="text-xl font-bold">Hourly Forecast</h2>
            <div className="space-y-2 flex justify-center">
              {weather.forecast.forecastday[0].hour
                .filter((hour) => new Date(hour.time) >= new Date()) // Filter for current and upcoming hours
                .slice(0, 7) // Display the next 7 hours including the current hour
                .map((hour, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-lg space-x-24"
                  >
                    {/* Extracting only time part from 'hour.time' */}
                    <p>
                      {new Date(hour.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    {/* Displaying weather icon */}
                    <Image  
  src={`https:${hour.condition.icon}`} // Ensure the URL is complete
  alt={hour.condition.text}
  width={48} // Replace with your desired width
  height={48} // Replace with your desired height
/>
                    <p>{hour.temp_c}°C</p>
                    <p>{hour.condition.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
