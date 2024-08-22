import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useGetWeatherByNameQuery } from '../app/services/api';
import { setCityItems, setSearchWeather } from '../app/counter/slice';
import getWeatherIcon from "../weatherIcon";
import { getIconColor } from "../weatherIcon";
import { ReactSkycon } from "react-skycons-extended";

export default function RightSection() {
    const dispatch = useDispatch();
    const cityItems = useSelector((state) => state.city.items);
    const searchWeather = useSelector((state) => state.searchWeather.items);

    const { data } = useGetWeatherByNameQuery(cityItems, {
       // Skip fetching if fetchWeather is false
    });
  
      useEffect(() => {
        if (data) {
            // Calculate local time for the city using timezone offset
          const localTime = new Date().getTime() + data.timezone * 1000;
          const localHour = new Date(localTime).getUTCHours();
          const isDaytime = localHour >= 6 && localHour < 20;

          dispatch(setSearchWeather({
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            main: data.weather[0].main,
            description: data.weather[0].description,
            visibility: Math.round((data.visibility) / 1000),
            windSpeed: Math.round(data.wind.speed),
            isDaytime,
          }));
        }
      }, [data, dispatch]);


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          dispatch(setCityItems(e.target.value)); // Trigger the data fetch
          setCityItems("");
          e.target.value = '';
        }
    };

    const defaults = {size: 85, animate: true,};
  
    
    const weatherIcon = getWeatherIcon(searchWeather.main, searchWeather.description, searchWeather.isDaytime); 
    const iconColor = getIconColor(weatherIcon);

    return (
        <div className="flex-1 text-white bg-black bg-opacity-80 p-4">
            <div className="flex flex-col px-4">
                <div className='flex flex-col items-center'>
                    <div id='weatherIcon' className="text-5xl my-4">
                        <ReactSkycon
                            icon={weatherIcon}
                            color={iconColor}
                            size={defaults.size}
                            animate={defaults.animate}
                        />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{searchWeather.description}</h3>
                </div>
                <div className=" flex justify-center mb-4 w-full items-center">
                    <input className="px-4 py-3 w-3/4 border bg-transparent border-slate-600 rounded-3xl" placeholder="Enter City Name" type="text" onKeyDown={handleKeyDown}/>
                </div>
                <div className="text-lg font-semibold">
                    <ul className=''>
                        <li className='flex justify-center py-2 items-center'><p>{searchWeather.city}, {searchWeather.country}</p></li>
                        <li className='flex justify-between p-2 items-center border-t border-slate-300'>
                            <p>Temperature:</p>
                            <p>{searchWeather.temp}°C ({searchWeather.main})</p>
                        </li>
                        <li className='flex justify-between p-2 items-center border-t border-slate-300'>
                            <p>Humidity:</p>
                            <p>{searchWeather.humidity}%</p>
                        </li>
                        <li className='flex justify-between p-2 items-center border-t border-slate-300'>
                            <p>Visibility:</p>
                            <p>{searchWeather.visibility} Km</p>
                        </li>
                        <li className='flex justify-between p-2 items-center border-t border-slate-300'>
                            <p>Wind Speed:</p>
                            <p>{searchWeather.windSpeed} Km/h</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
