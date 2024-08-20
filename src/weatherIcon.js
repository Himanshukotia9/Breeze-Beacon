
  const getWeatherIcon = (weatherMain, weatherDescription, isDaytime) => {
    switch (weatherMain) {
      case "Clouds":
      if (weatherDescription === "few clouds", "scattered clouds", "broken clouds") {
        return isDaytime ? "PARTLY_CLOUDY_DAY" : "PARTLY_CLOUDY_NIGHT";
      } else if (weatherDescription === "overcast clouds") {
        return "CLOUDY";
      }
      return "CLOUDY";

      case "Thunderstorm":
      if (weatherDescription === "thunderstorm with rain", "thunderstorm with light rain", "thunderstorm with heavy rain") {
        return isDaytime ? "THUNDER_SHOWERS_DAY" : "THUNDER_SHOWERS_NIGHT";
      } else if (weatherDescription === "thunderstorm with drizzle", "	thunderstorm with light drizzle", "thunderstorm with heavy drizzle") {
        return "THUNDER_RAIN";
      }
      return "THUNDER";

      case "Drizzle":
        return "RAIN";

      case "Rain":
        if (weatherDescription === "light rain", "moderate rain", "heavy intensity rain") {
          return isDaytime ? "SHOWERS_DAY" : "SHOWERS_NIGHT";
        } else if (weatherDescription === "freezing rain") {
          return "HAIL";
        } else if (weatherDescription === "very heavy rain", "extreme rain") {
          return "SLEET";
        }
        return "RAIN";

      case "Clear":
        return isDaytime ? "CLEAR_DAY" : "CLEAR_NIGHT";

      case "Fog":
      case "Mist":
      case "Haze":
        return "FOG";

      case "Snow":
        if (weatherDescription === "light rain and snow", "rain and snow") {
          return isDaytime ? "RAIN_SNOW_SHOWERS_DAY" : "RAIN_SNOW_SHOWERS_NIGHT";
        } else if (weatherDescription === "snow", "	light snow", "heavy snow") {
          return isDaytime ? "SNOW_SHOWERS_DAY" : "SNOW_SHOWERS_NIGHT";
        } else if(weatherDescription === "sleet"){
          return "SLEET"
        }
        return "SNOW";

      default:
        return isDaytime ? "CLEAR_DAY" : "CLEAR_NIGHT"; // Fallback icon // Fallback icon
    }
  };

  export const getIconColor = (weatherIcon) =>{
    switch (weatherIcon) {
      case "CLEAR_DAY":
        return { sun: "#e8be18" };
      case "CLEAR_NIGHT":
        return { moon: "#5d6572" };
      case "PARTLY_CLOUDY_DAY":
        return { light_cloud: "#969aa4", sun: "#e8be18" };
      case "PARTLY_CLOUDY_NIGHT":
        return { light_cloud: "#969aa4", moon: "#5d6572" };
      case "CLOUDY":
        return { light_cloud: "#5d6572" };
      case "RAIN":
        return { cloud: "#5d6572", rain: "#1995c5" };
      case "SHOWERS_DAY":
        return { cloud: "#969aa4", rain: "#1995c5", sun: "#e8be18" };
      case "SHOWERS_NIGHT":
        return { cloud: "#969aa4", rain: "#1995c5", moon: "#5d6572" };
      case "SLEET":
        return { cloud: "#969aa4", sleet: "#1995c5" };
      case "RAIN_SNOW_SHOWERS_DAY":
        return {cloud: "#5d6572", rain: "#1995c5", snow: "#a9dbf5", sun: "#e8be18"};
      case "RAIN_SNOW_SHOWERS_NIGHT":
        return {cloud: "#969aa4", rain: "#1995c5", snow: "#a9dbf5", moon: "#5d6572"};
      case "SNOW":
        return { cloud: "#5d6572", snow: "#a9dbf5" };
      case "SNOW_SHOWERS_DAY":
        return { cloud: "#5d6572", snow: "#a9dbf5", sun: "#e8be18" };
      case "SNOW_SHOWERS_NIGHT":
        return { cloud: "#969aa4", snow: "#a9dbf5", moon: "#5d6572" };
      case "FOG":
        return { light_cloud: "#969aa4", fog: "#5d6572" };
      case "THUNDER":
        return { dark_cloud: "#5d6572", thunder: "#efb032" };
      case "THUNDER_RAIN":
        return {dark_cloud: "#5d6572", thunder: "#efb032", rain: "#1995c5"};
      case "THUNDER_SHOWERS_DAY":
        return {dark_cloud: "#5d6572", thunder: "#efb032", rain: "#1995c5", sun: "#e8be18"};
      case "THUNDER_SHOWERS_NIGHT":
        return {dark_cloud: "#969aa4", thunder: "#efb032", rain: "#1995c5", moon: "#5d6572"};
      case "HAIL":
        return { cloud: "#5d6572", hail: "#a9dbf5" };
      case "CLEAR_DAY":
        return { sun: "#e8be18" };
    }
  }
  
  export default getWeatherIcon;
  