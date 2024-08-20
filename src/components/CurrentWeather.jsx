import React, { useEffect } from "react";
import Clock from "react-live-clock";
import dateBuilder from "../dateBuilder";
import ReactAnimatedWeather from "react-animated-weather";
import { RseWind } from "react-skycons-extended";
import { useDispatch, useSelector } from "react-redux";
import { useGetWeatherByCoordinatesQuery, useGetWeatherByNameQuery } from "../app/services/api";
import { setCityItems, setWeather } from "../app/counter/slice";

export default function CurrentWeather() {
  const dispatch = useDispatch();
  const cityItems = useSelector((state) => state.city.items);
  const weather = useSelector((state) => state.weather.items);
  const location = useSelector((state) => state.location.items);

  // Fetch weather by coordinates
  const { data, error, isLoading } = useGetWeatherByCoordinatesQuery({ lat: location.lat, lon: location.lon },
    {
      skip: !location || !location.lat || !location.lon, // Skip fetching if coordinates are not available
    });

  useEffect(() => {
    if (data) {
      dispatch(setWeather({
          city: data.name,
          country: data.sys.country,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
        })); // Store weather data in Redux
    }
  }, [data, dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setCityItems(e.target.value));
    }
  };

  const defaults = {
    icon: "CLEAR_DAY",
    color: "goldenrod",
    size: 64,
    animate: true,
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        id="weather"
        className="py-10 px-7 bg-slate-500 flex flex-col justify-center items-center w-4/5 md:w-1/2 h-auto"
      >
        <div id="search-bar" className="relative flex items-center">
          <input
            className="px-4 py-3 border border-slate-300 rounded-3xl"
            placeholder="Enter City"
            type="text"
            onKeyDown={handleKeyDown}
          />
          <button
            disabled
            className="absolute end-2.5 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-full text-sm py-1.5 px-2.5"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching weather data</p>}
        </div>
        <div className="py-4">
          <ReactAnimatedWeather
            icon={defaults.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        </div>
        <p id="temperature" className="text-white text-7xl font-bold">
          {weather.temp}°C
        </p>
        <p id="location" className="text-white text-3xl">
          {weather.city}, {weather.country}
        </p>
        <div
          id="weather-data"
          className="w-full mt-10 text-white flex justify-between"
        >
          <div id="col" className="flex flex-col items-start text-base">
            <Clock
              className="text-xl"
              format={"HH:mm:ss"}
              interval={1000}
              ticking={true}
            />
            {dateBuilder(new Date())}
          </div>
          <div id="col" className="flex items-start text-base">
            <RseWind
              color={{ leaf: "green", wind: "#ffffff" }}
              className="text-xl mx-2 rounded-full"
            />
            <div className="">
              <p id="location" className="text-white text-xl">
                {weather.humidity}%
              </p>
              <p id="location" className="text-white text-xl">
                humidity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
