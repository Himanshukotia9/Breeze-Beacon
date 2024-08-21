import React, { useEffect } from "react";
import Clock from "react-live-clock";
import dateBuilder from "../dateBuilder";
import { useDispatch, useSelector } from "react-redux";
import { useGetWeatherByCoordinatesQuery} from "../app/services/api";
import { setWeather } from "../app/counter/slice";
import getWeatherIcon from "../weatherIcon";
import { getIconColor } from "../weatherIcon";
import { ReactSkycon } from "react-skycons-extended";

export default function LeftSection() {
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather.items);
    const location = useSelector((state) => state.location.items);
  
    // Fetch weather by coordinates
    const { data } = useGetWeatherByCoordinatesQuery({ lat: location.lat, lon: location.lon },
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
            main: data.weather[0].main,
            description: data.weather[0].description
          })); // Store weather data in Redux
      }
    }, [data, dispatch]);

    const defaults = {
      size: 64,
      animate: true,
    };

  const isDaytime = (new Date().getHours() >= 6 && new Date().getHours() < 18);
  const weatherIcon = getWeatherIcon(weather.main, weather.description, isDaytime); 
  const iconColor = getIconColor(weatherIcon);

  return (
    <div className="grid grid-cols-2 gap-y-4 justify-between flex-1 p-4 md:p-8 text-white bg-cover bg-center bg-no-repeat bg-weather h-full">
        <div>
          <ReactSkycon
              icon={weatherIcon}
              color={iconColor}
              size={defaults.size}
              animate={defaults.animate}
            />
        </div>
        <div className="mb-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-right">{weather.city}, {weather.country}</h2>
        </div>
        <div className="text-2xl font-semibold flex items-start md:items-end justify-self-start">
          <div>
            <div>
              <Clock
              className="text-xl"
              format={"HH:mm:ss"}
              interval={1000}
              ticking={true}/>
            </div>
            <div className="text-sm">{dateBuilder(new Date())}</div>
          </div>
        </div>
        <div className="text-2xl md:text-4xl font-bold flex items-start md:items-end justify-self-end">
            <div>
              <div>{weather.temp}°C</div>
              <div className="text-sm md:text-xl">({weather.main})</div>
            </div>
          </div>
    </div>
  )
}
